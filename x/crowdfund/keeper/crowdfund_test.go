package keeper_test

import (
	"testing"

	keepertest "github.com/cosmonaut/crowdfund/testutil/keeper"
	"github.com/cosmonaut/crowdfund/testutil/nullify"
	"github.com/cosmonaut/crowdfund/x/crowdfund/keeper"
	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func createNCrowdfund(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Crowdfund {
	items := make([]types.Crowdfund, n)
	for i := range items {
		items[i].Id = keeper.AppendCrowdfund(ctx, items[i])
	}
	return items
}

func TestCrowdfundGet(t *testing.T) {
	keeper, ctx := keepertest.CrowdfundKeeper(t)
	items := createNCrowdfund(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetCrowdfund(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestCrowdfundRemove(t *testing.T) {
	keeper, ctx := keepertest.CrowdfundKeeper(t)
	items := createNCrowdfund(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveCrowdfund(ctx, item.Id)
		_, found := keeper.GetCrowdfund(ctx, item.Id)
		require.False(t, found)
	}
}

func TestCrowdfundGetAll(t *testing.T) {
	keeper, ctx := keepertest.CrowdfundKeeper(t)
	items := createNCrowdfund(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllCrowdfund(ctx)),
	)
}

func TestCrowdfundCount(t *testing.T) {
	keeper, ctx := keepertest.CrowdfundKeeper(t)
	items := createNCrowdfund(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetCrowdfundCount(ctx))
}
