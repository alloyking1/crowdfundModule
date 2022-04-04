package crowdfund

import (
	"github.com/cosmonaut/crowdfund/x/crowdfund/keeper"
	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the crowdfund
	for _, elem := range genState.CrowdfundList {
		k.SetCrowdfund(ctx, elem)
	}

	// Set crowdfund count
	k.SetCrowdfundCount(ctx, genState.CrowdfundCount)
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.CrowdfundList = k.GetAllCrowdfund(ctx)
	genesis.CrowdfundCount = k.GetCrowdfundCount(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
