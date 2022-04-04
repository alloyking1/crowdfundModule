package crowdfund_test

import (
	"testing"

	keepertest "github.com/cosmonaut/crowdfund/testutil/keeper"
	"github.com/cosmonaut/crowdfund/testutil/nullify"
	"github.com/cosmonaut/crowdfund/x/crowdfund"
	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		CrowdfundList: []types.Crowdfund{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		CrowdfundCount: 2,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.CrowdfundKeeper(t)
	crowdfund.InitGenesis(ctx, *k, genesisState)
	got := crowdfund.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.CrowdfundList, got.CrowdfundList)
	require.Equal(t, genesisState.CrowdfundCount, got.CrowdfundCount)
	// this line is used by starport scaffolding # genesis/test/assert
}
