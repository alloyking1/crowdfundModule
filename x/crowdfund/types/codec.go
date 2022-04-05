package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgLaunchCampaing{}, "crowdfund/LaunchCampaing", nil)
	cdc.RegisterConcrete(&MsgPledgeToken{}, "crowdfund/PledgeToken", nil)
	cdc.RegisterConcrete(&MsgClaimToken{}, "crowdfund/ClaimToken", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgLaunchCampaing{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgPledgeToken{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgClaimToken{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
