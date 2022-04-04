package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/cosmonaut/crowdfund/testutil/keeper"
	"github.com/cosmonaut/crowdfund/x/crowdfund/keeper"
	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.CrowdfundKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
