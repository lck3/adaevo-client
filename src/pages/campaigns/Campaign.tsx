import React, {  } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";

import { getCampaignRequest } from "src/infrastructure/api/campaignRequests";
import { SmallButton } from "../../components/Buttons";
import { Link } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { useQuery } from "react-query";
import { handleRemoteOperationError } from "src/utils/ErrorHandler";
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


  const { data: campaignTable } = useQuery(
    'campaignTable',
    getCampaignRequest,
    {
      onError: (error: any) => handleRemoteOperationError(error)
    }
  )

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
              <TableCell></TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {campaignTable && campaignTable.map((campaign, i) => (
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

                <TableCell>
                  <CopyToClipboard
                    text={
                      // @todo use env
                      `${process.env.REACT_APP_API_SERVER}/api/v1/campaigns/${campaign.id}/leads`
                    }
                  >
                    <SmallButton>copy api url</SmallButton>
                  </CopyToClipboard>
                </TableCell>

                <TableCell></TableCell>
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
