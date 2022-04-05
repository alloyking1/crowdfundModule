package keeper

import (
	"context"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tendermint/tendermint/crypto"
)

func (k msgServer) PledgeToken(goCtx context.Context, msg *types.MsgPledgeToken) (*types.MsgPledgeTokenResponse, error) {

	ctx := sdk.UnwrapSDKContext(goCtx)

	//connect to the launch crowdfund module using the ID
	crowdfund, found := k.GetCrowdfund(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "key %d doesn't exist", msg.Id)
	}

	// check that the crowdfund is in-progress
	if crowdfund.State != "in-progress" {
		return nil, sdkerrors.Wrapf(types.ErrWrongCrowdfundState, "%v", crowdfund.State)
	}

	// get address of pledger
	pledger, _ := sdk.AccAddressFromBech32(msg.Creator)

	//get amount and convert from string to sdk token
	amount, err := sdk.ParseCoinsNormalized(msg.Amount)
	if err != nil {
		panic(err)
	}

	// get module address
	moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))

	// send token to module escrow account
	sdkError := k.bankKeeper.SendCoins(ctx, pledger, moduleAcc, amount)
	if sdkError != nil {
		return nil, sdkError
	}

	// get balance of module escrow account
	newModuleBalance := k.bankKeeper.GetBalance(ctx, moduleAcc, "token")

	//update pledger details
	// make a pair of the pledger and amount
	pledgerPair := make(map[string]string)
	pledgerPair[msg.Creator] = amount.String()

	// update the campaing amount and pledger fields
	crowdfund.Pledger = pledgerPair
	crowdfund.Amount = newModuleBalance.String()

	//update the store
	k.SetCrowdfund(ctx, crowdfund)

	return &types.MsgPledgeTokenResponse{}, nil
}
