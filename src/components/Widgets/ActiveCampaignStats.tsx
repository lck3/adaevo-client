import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { handleRemoteOperationError } from 'src/utils/ErrorHandler';
import { ListCampaignsPayload } from "../../core/domains/campaign/entity/types/ListCampaignPayload";
import { getCampaignRequest } from "../../infrastructure/api/campaignRequests";
const {
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
} = require("@windmill/react-ui");
// make a copy of the data, for the second table



export function ActiveCampaignStats ({term}: any) {
  const [campaignTable, setCampaignTable] = useState<ListCampaignsPayload[]>(
    []
  );

  useEffect(() => {
    // @todo clean up this widget later 
    getCampaignRequest({limit: 5, offset:0}).then((campaigns) => {
      setCampaignTable(campaigns);
    }).catch(err => handleRemoteOperationError(err))
  }, []);
  return (
    <table className="h-50" > 
      <TableHeader>
            <tr>
              <TableCell className="w-3/12">Link</TableCell>
              <TableCell className="w-1/12">{term}</TableCell>
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
  </table>
  )
}