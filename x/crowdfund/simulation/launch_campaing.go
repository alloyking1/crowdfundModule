package simulation

import (
	"math/rand"

	"github.com/cosmonaut/crowdfund/x/crowdfund/keeper"
	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgLaunchCampaing(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgLaunchCampaing{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the LaunchCampaing simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "LaunchCampaing simulation not implemented"), nil, nil
	}
}
