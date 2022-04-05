package keeper

import (
	"context"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tendermint/tendermint/crypto"
)

func (k msgServer) CancelCampaign(goCtx context.Context, msg *types.MsgCancelCampaign) (*types.MsgCancelCampaignResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// get access to launch campaing module
	crowdfund, found := k.GetCrowdfund(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrKeyNotFound, "key %d doesn't exist", msg.Id)
	}

	//check that the request is coming from the campaing owner
	requester, _ := sdk.AccAddressFromBech32(msg.Creator)
	if requester.String() != crowdfund.Owner {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "Cannot claim funds: not the campaing creator")
	}

	pledger := crowdfund.Pledger
	if pledger == nil {
		// return creator amount
		//get the module account address
		moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
		amount, err := sdk.ParseCoinsNormalized(crowdfund.Amount)
		if err != nil {
			panic(err)
		}

		// initial deposit back to creator
		sdkError := k.bankKeeper.SendCoins(ctx, moduleAcc, requester, amount)
		if sdkError != nil {
			return nil, sdkError
		}

		//delete campaing
		k.RemoveCrowdfund(ctx, msg.Id)

	} else {
		//set state of campaing to cancelled
		crowdfund.State = "cancelled"

	}

	return &types.MsgCancelCampaignResponse{}, nil
}
