package keeper

import (
	"context"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tendermint/tendermint/crypto"
)

func (k msgServer) LaunchCampaing(goCtx context.Context, msg *types.MsgLaunchCampaing) (*types.MsgLaunchCampaingResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	//create a new campaing with the user inputs below
	var crowdfund = types.Crowdfund{
		Total:    msg.Total,
		Amount:   msg.Amount,
		Deadline: msg.Deadline,
		Fee:      msg.Fee,
		Owner:    msg.Creator,
		State:    "in-progress",
	}
	//get the campaing owner address
	owner, _ := sdk.AccAddressFromBech32(msg.Creator)

	//get the module account address
	moduleAcc := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))

	//get owner initial deposit to start the campaing
	amount, err := sdk.ParseCoinsNormalized(crowdfund.Amount)
	if err != nil {
		panic(err)
	}

	//send coin from campaing creator to module account
	sdkError := k.bankKeeper.SendCoins(ctx, owner, moduleAcc, amount)
	if sdkError != nil {
		return nil, sdkError
	}

	//fskdfskldfljkdf
	k.AppendCrowdfund(
		ctx,
		crowdfund,
	)
	return &types.MsgLaunchCampaingResponse{}, nil
}
