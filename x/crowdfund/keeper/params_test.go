package keeper_test

import (
	"testing"

	testkeeper "github.com/cosmonaut/crowdfund/testutil/keeper"
	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.CrowdfundKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
