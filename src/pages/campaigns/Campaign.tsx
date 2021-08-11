import React, { useState, useEffect } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'

import response from '../../utils/demo/tableData'
import { ListCampaignsPayload } from 'src/core/domains/campaign/entity/types/ListCampaignPayload'
import { getCampaignRequest } from 'src/infrastructure/api/campaignRequests'
const {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Pagination,
} = require('@windmill/react-ui')
// make a copy of the data, for the second table

function ShowCampaigns() {
  const [campaignTable, setCampaignTable] = useState<ListCampaignsPayload[]>([])

  useEffect(() => {
    
    getCampaignRequest()
    .then(campaigns => {
      setCampaignTable(campaigns)
    })

  }, [])

  return (
    <>
      <PageTitle>Campaigns</PageTitle>


      <SectionTitle>All Campaigns</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Page</TableCell>
              <TableCell>Click</TableCell>
              <TableCell>Leads</TableCell>
              <TableCell>Reject</TableCell>
              <TableCell>Validat</TableCell>
              <TableCell>CPL</TableCell>
              <TableCell>Rev</TableCell>
              <TableCell>Margin</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {campaignTable.map((campaign, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Badge type="primary">
                      ●
                    </Badge>
                    <div>
                      <p className="font-semibold">{campaign.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{campaign.customer}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ 500</span>
                </TableCell>
                <TableCell>
                  <span  className="text-sm">-</span>
                </TableCell>
                <TableCell>
                  <span  className="text-sm">-%</span>
                </TableCell>
                <TableCell>
                  <span  className="text-sm">-</span>
                </TableCell>
                <TableCell>
                  <span  className="text-sm">-</span>
                </TableCell>
                <TableCell>
                  <span  className="text-sm">-</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">-</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          
        </TableFooter>
      </TableContainer>


    </>
  )
}

export default ShowCampaigns
