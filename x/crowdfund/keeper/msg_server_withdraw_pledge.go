package keeper

import (
	"context"
	"strconv"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tendermint/tendermint/crypto"
)

func (k msgServer) WithdrawPledge(goCtx context.Context, msg *types.MsgWithdrawPledge) (*types.MsgWithdrawPledgeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// TODO: Handling the message
	_ = ctx
	// get access to launch campaing module
	crowdfund, found := k.GetCrowdfund(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "key %d doesn't exist", msg.Id)
	}
	// check that campaing is in progress
	if crowdfund.State != "in-progress" {
		return nil, sdkerrors.Wrapf(types.ErrWrongCrowdfundState, "%v", crowdfund.State)
	}
	// check if module date is completed
	deadline, err := strconv.ParseInt(crowdfund.Deadline, 10, 64)
	if err != nil {
		panic(err)
	}
	if ctx.BlockHeight() < deadline {
		return nil, sdkerrors.Wrap(types.ErrDeadline, "Cannot claim funds before deadline")
	}
	// check if goal was met
	if crowdfund.Amount != crowdfund.Total {
		//get the module account address
		moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
		// get amount of coin user pledged
		amount, err := sdk.ParseCoinsNormalized(crowdfund.Pledger[msg.Creator])
		// amount, err := sdk.ParseCoinNormalized(msg.Amount)
		if err != nil {
			panic(err)
		}
		// get address of pledger
		pledger, _ := sdk.AccAddressFromBech32(msg.Creator)
		// send fund if goal was reached
		sdkError := k.bankKeeper.SendCoins(ctx, moduleAcc, pledger, amount)
		if sdkError != nil {
			return nil, sdkError
		}
		// update amount
		newModuleBalance := k.bankKeeper.GetBalance(ctx, moduleAcc, "token")
		crowdfund.Amount = newModuleBalance.String()
		// delete pledger
		delete(crowdfund.Pledger, msg.Creator)
		// update state of campaing to completed
		crowdfund.State = "refund"

	} else {
		// Inform owner that goal was not reached
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "Cannot claim funds: campaing goal was met")
	}
	// appen to the crowdfund module
	k.SetCrowdfund(ctx, crowdfund)
	return &types.MsgWithdrawPledgeResponse{}, nil
}
