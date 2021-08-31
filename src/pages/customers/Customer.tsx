import React from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { getCustomerRequest, removeCustomerRequest } from 'src/infrastructure/api/customerRequests'
import { SmallButton } from 'src/components/Buttons'
import { MdDelete } from 'react-icons/md'
import {
  Link
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { handleRemoteOperationError } from 'src/utils/ErrorHandler'
import { handleRemoteOperationSuccess } from 'src/utils/SuccessHandler'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation();

  const { data: customerTable } = useQuery(
    'setCustomerTable',
    getCustomerRequest
  )

  const queryClient = useQueryClient()


  const mutation = useMutation((id: number) => removeCustomerRequest(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('setCustomerTable')
    }
  })


  const handleDeleteCustomer = (id: number) => {
    mutation.mutateAsync(id)
    .then(() => handleRemoteOperationSuccess(t(`customers.removeCustomer.response.success`)))
    .catch(() => handleRemoteOperationError(t(`customers.removeCustomer.response.failed`)))
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
              {customerTable && customerTable.map((customer, i) => (
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
