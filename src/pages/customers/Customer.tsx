import React, { useState, useEffect } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { getCustomerRequest, removeCustomerRequest } from 'src/infrastructure/api/customerRequests'
import {CustomerPayload} from 'src/core/domains/customer/entity/types/CustomerPayload'
import { SmallButton } from 'src/components/Buttons'
import { MdDelete } from 'react-icons/md'
import {
  Link
} from "react-router-dom";
const {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
} = require('@windmill/react-ui')


// make a copy of the data, for the second table

function ListCustomerPage() {

  // setup data for every table
  const [customerTable, setCustomerTable] = useState<CustomerPayload[]>([])

  // pagination setup

  useEffect(() => {
    
    getCustomerRequest()
    .then(customers => {
      setCustomerTable(customers)
    })

  }, [])

  const handleDeleteCustomer = (id: number) => {
    removeCustomerRequest(id)
    .then(()=> alert('customer has been deleted'))
  }

  return (
    <>
      <PageTitle>All Customers</PageTitle>

      <SectionTitle>Shows the list of customers added</SectionTitle>

      <div className="w-80">
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Business Name</TableCell>
                <TableCell>Contact Name</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Status</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {customerTable.map((customer, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">
                          <Link to={`/app/update-customer/${customer.id}`}>
                          {customer.businessName}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{customer.contactName}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{customer.country}</span>

                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      <SmallButton onClick={() => handleDeleteCustomer(customer.id)}>
                        <MdDelete className="inline" />
                          &nbsp;
                          Delete
                        </SmallButton>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            {/* <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
            /> */}
          </TableFooter>
        </TableContainer>
      </div>
    </>
  )
}

export default ListCustomerPage
