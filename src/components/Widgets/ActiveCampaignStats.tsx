import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ListCampaignsPayload } from "../../core/domains/campaign/entity/types/ListCampaignPayload";
import { getCampaignRequest } from "../../infrastructure/api/campaignRequests";
import styled from "styled-components"

const {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
} = require("@windmill/react-ui");
// make a copy of the data, for the second table


const Box = styled.table`
  height: 300px;
`

export function ActiveCampaignStats () {
  const [campaignTable, setCampaignTable] = useState<ListCampaignsPayload[]>(
    []
  );

  useEffect(() => {
    getCampaignRequest().then((campaigns) => {
      setCampaignTable(campaigns);
    });
  }, []);
  return (
    <Box className="h-50" > 
      <TableHeader>
            <tr>
              <TableCell className="w-3/12">Link</TableCell>
              <TableCell className="w-1/12">Stats</TableCell>
            </tr>
          </TableHeader>
    <TableBody>
    {campaignTable.map((campaign, i) => (
      <TableRow key={i}>
        <TableCell>
          <div className="flex items-center text-sm">
            <Link to={`/app/update-campaign/${campaign.id}`}>
              <p className="font-semibold">{campaign.title}</p>
              
            </Link>
          </div>
        </TableCell>
        <TableCell>
        </TableCell>
        

      </TableRow>
    ))}
    
  </TableBody>
  </Box>
  )
}