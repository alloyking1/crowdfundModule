package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgWithdrawPledge = "withdraw_pledge"

var _ sdk.Msg = &MsgWithdrawPledge{}

func NewMsgWithdrawPledge(creator string, id uint64) *MsgWithdrawPledge {
	return &MsgWithdrawPledge{
		Creator: creator,
		Id:      id,
	}
}

func (msg *MsgWithdrawPledge) Route() string {
	return RouterKey
}

func (msg *MsgWithdrawPledge) Type() string {
	return TypeMsgWithdrawPledge
}

func (msg *MsgWithdrawPledge) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgWithdrawPledge) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgWithdrawPledge) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
