package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/crowdfund module sentinel errors
var (
	ErrSample              = sdkerrors.Register(ModuleName, 1100, "sample error")
	ErrWrongCrowdfundState = sdkerrors.Register(ModuleName, 1, "wrong campaing state")
	ErrDeadline            = sdkerrors.Register(ModuleName, 2, "deadline")
)
