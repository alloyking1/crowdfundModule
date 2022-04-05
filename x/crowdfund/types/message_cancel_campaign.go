package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCancelCampaign = "cancel_campaign"

var _ sdk.Msg = &MsgCancelCampaign{}

func NewMsgCancelCampaign(creator string, id uint64) *MsgCancelCampaign {
	return &MsgCancelCampaign{
		Creator: creator,
		Id:      id,
	}
}

func (msg *MsgCancelCampaign) Route() string {
	return RouterKey
}

func (msg *MsgCancelCampaign) Type() string {
	return TypeMsgCancelCampaign
}

func (msg *MsgCancelCampaign) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCancelCampaign) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCancelCampaign) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
