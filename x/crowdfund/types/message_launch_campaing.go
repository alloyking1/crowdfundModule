package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgLaunchCampaing = "launch_campaing"

var _ sdk.Msg = &MsgLaunchCampaing{}

func NewMsgLaunchCampaing(creator string, total string, amount string, deadline string, fee string, owner string, state string) *MsgLaunchCampaing {
	return &MsgLaunchCampaing{
		Creator:  creator,
		Total:    total,
		Amount:   amount,
		Deadline: deadline,
		Fee:      fee,
		Owner:    owner,
		State:    state,
	}
}

func (msg *MsgLaunchCampaing) Route() string {
	return RouterKey
}

func (msg *MsgLaunchCampaing) Type() string {
	return TypeMsgLaunchCampaing
}

func (msg *MsgLaunchCampaing) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgLaunchCampaing) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgLaunchCampaing) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
