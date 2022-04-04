package keeper

import (
	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
)

var _ types.QueryServer = Keeper{}
