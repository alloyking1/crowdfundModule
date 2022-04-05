package keeper

import (
	"context"
	"strconv"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tendermint/tendermint/crypto"
)

func (k msgServer) ClaimToken(goCtx context.Context, msg *types.MsgClaimToken) (*types.MsgClaimTokenResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	//connect to the launch crowdfund module
	crowdfund, found := k.GetCrowdfund(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "key %d doesn't exist", msg.Id)
	}

	// check that the crowdfund is in-progress
	if crowdfund.State != "in-progress" {
		return nil, sdkerrors.Wrapf(types.ErrWrongCrowdfundState, "%v", crowdfund.State)
	}

	//check that the request is coming from the campaing owner
	requester, _ := sdk.AccAddressFromBech32(msg.Creator)
	if requester.String() != crowdfund.Owner {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "Cannot claim funds: not the campaing creator")
	}

	// check that the campaing deadline is reached
	deadline, err := strconv.ParseInt(crowdfund.Deadline, 10, 64)
	if err != nil {
		panic(err)
	}
	if ctx.BlockHeight() < deadline {
		return nil, sdkerrors.Wrap(types.ErrDeadline, "Cannot claim funds before deadline")
	}

	// check that campaing goal was reached
	if crowdfund.Amount == crowdfund.Total {
		//get the module account address
		moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
		amount, err := sdk.ParseCoinsNormalized(crowdfund.Amount)
		if err != nil {
			panic(err)
		}
		// send fund if goal was reached
		sdkError := k.bankKeeper.SendCoins(ctx, moduleAcc, requester, amount)
		if sdkError != nil {
			return nil, sdkError
		}
		// update state of campaing to completed
		crowdfund.State = "completed"
	} else {
		// Inform owner that goal was not reached
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "Cannot claim funds: campaing goal not reached")
	}

	// append to the crowdfund module
	k.SetCrowdfund(ctx, crowdfund)
	return &types.MsgClaimTokenResponse{}, nil
}
