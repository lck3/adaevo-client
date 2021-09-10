import React from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";

import {
  getCampaignRequest,
  removeCampaignRequest,
} from "src/infrastructure/api/campaignRequests";
import { RemoveButton, SmallButton } from "../../components/Buttons";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { handleRemoteOperationError } from "src/utils/ErrorHandler";
import { handleRemoteOperationSuccess } from "src/utils/SuccessHandler";
import { useTranslation } from "react-i18next";
const {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
} = require("@windmill/react-ui");
// make a copy of the data, for the second table

function ShowCampaigns() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: campaignTable } = useQuery(
    "campaignTable",
    () => getCampaignRequest(),
    {
      onError: (error: any) => handleRemoteOperationError(error),
    }
  );

  const mutation = useMutation((id: number) => removeCampaignRequest(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("campaignTable");
    },
  });

  const handleDeleteCampaign = (id: number) => {
    mutation
      .mutateAsync(id)
      .then(() =>{

        handleRemoteOperationSuccess(
          t(`campaigns.deleteCampaign.response.success`)
        )
      })
      .catch(() =>
        handleRemoteOperationError(
          t(`campaigns.deleteCampaign.response.failed`)
        )
      );
  };

  return (
    <>
      <PageTitle>Campaigns</PageTitle>

      <SectionTitle>All Campaigns</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell className="w-4/12">Page</TableCell>
              <TableCell className="w-1/12">Leads</TableCell>
              <TableCell className="w-2/12"></TableCell>
              <TableCell className="w-2/12"></TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {campaignTable &&
              campaignTable.map((campaign, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Link to={`/app/update-campaign/${campaign.id}`}>
                        <p className="font-semibold">{campaign.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {campaign.tags}
                        </p>
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{campaign._count.leads}</TableCell>

                  <TableCell></TableCell>

                  <TableCell>
                    <CopyToClipboard
                        onCopy={() => handleRemoteOperationSuccess('copied')}
                        text={
                        // @todo use env
                        `${process.env.REACT_APP_API_SERVER}/api/v1/campaigns/${campaign.id}/leads`
                      }
                    >
                      <SmallButton>copy api url</SmallButton>
                    </CopyToClipboard>
                    <RemoveButton
                      onClick={() => handleDeleteCampaign(campaign.id)}
                    >
                      Remove
                    </RemoveButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TableFooter></TableFooter>
      </TableContainer>
    </>
  );
}

export default ShowCampaigns;
