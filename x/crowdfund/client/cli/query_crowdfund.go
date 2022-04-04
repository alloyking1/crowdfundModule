package cli

import (
	"context"
	"strconv"

	"github.com/cosmonaut/crowdfund/x/crowdfund/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdListCrowdfund() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-crowdfund",
		Short: "list all crowdfund",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllCrowdfundRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.CrowdfundAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddPaginationFlagsToCmd(cmd, cmd.Use)
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowCrowdfund() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-crowdfund [id]",
		Short: "shows a crowdfund",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryGetCrowdfundRequest{
				Id: id,
			}

			res, err := queryClient.Crowdfund(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
