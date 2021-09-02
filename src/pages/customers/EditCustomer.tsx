import React from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { MdArrowBack } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { editCustomerRequest, getOneCustomerRequest } from "src/infrastructure/api/customerRequests";
import {
  useHistory,
  useParams
} from "react-router-dom";
import { useEffect } from "react";
import { EditCustomerPayload } from "src/core/domains/customer/entity/types/EditCustomerPayload";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { handleRemoteOperationError } from "src/utils/ErrorHandler";
import { handleRemoteOperationSuccess } from "src/utils/SuccessHandler";
const {
  Input,
  Label,
  Textarea,
  Button,
} = require("@windmill/react-ui");

function EditCustomerPage() {
  const { t } = useTranslation();

  const customerId = useParams<{id: string }>().id

  const { data: customerData } = useQuery(
    ['updateCustomerData', customerId],
    () => getOneCustomerRequest(Number(customerId)),
    {
      onError: (error: Error) => handleRemoteOperationError(error)
    }
  )


  const {
    register,
    handleSubmit,
    setValue
  } = useForm<EditCustomerPayload>();

  const queryClient = useQueryClient()
  const {push} = useHistory()

  const mutation = useMutation((fnArgs: any) => {
    return editCustomerRequest(fnArgs.id, fnArgs.data)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('updateCustomerData')
    }
  })

  useEffect(() => {
    if (!customerId) return
    if (!customerData) return

    Object.keys(customerData)
    .forEach((key) => {
      // @ts-ignore
      setValue(key, customerData[key])
    })
  }, [customerData, customerId, setValue])



  const onSubmit: SubmitHandler<EditCustomerPayload> = (data) => {
    if (!customerId) return
    
    // @ts-ignore
     mutation.mutateAsync({
       id : parseInt(customerId), 
       data
     })
     .then(() => handleRemoteOperationSuccess(t(`customers.updateCustomer.response.success`)))
     .catch(() => handleRemoteOperationError(t(`customers.updateCustomer.response.failed`)))
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle>Add a new Customer</PageTitle>
        <SectionTitle>Business Information</SectionTitle>
        <div className="flex flex-row">
          <div className="w-full">
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <Label>
                <span>Business Name</span>
                <Input
                  className="mt-1 w-10/12"
                  placeholder="eg ABC.com"
                  {...register("businessName")}
                />
              </Label>
              <Label>
                <span>Legal Name</span>
                <div className="flex flex-col">

                  <Input
                    className="mt-1 w-10/12"
                    placeholder="eg ABC Company"
                    {...register("legalName")}
                  />
                </div>
              </Label>
              <Label>
                <span>VAT Number</span>
                <Input
                  className="mt-1 w-10/12"
                  placeholder="XXX-XXX-XXX"
                  {...register("vatNumber")}
                />
              </Label>
              <Label>
                <span>Legal Address</span>
                <Textarea
                  {...register("address")}
                  className="mt-1 w-10/12"
                  placeholder="House Number, Street Name"
                />
              </Label>
              <Label>
                <span>Country</span>
                <Input
                  {...register("country")}
                  className="mt-1 w-10/12"
                  placeholder=""
                />
              </Label>
              <Label>
                <span>City</span>
                <Input
                  {...register("city")}
                  className="mt-1 w-10/12"
                  placeholder=""
                />
              </Label>
              <Label>
                <span>Province</span>
                <Input
                  {...register("province")}
                  className="mt-1 w-10/12"
                  placeholder=""
                  />
              </Label>
            </div>
          </div>
        </div>
        
        <SectionTitle>Data Collection</SectionTitle>
        <div className="flex flex-row">
          <div className="w-full">
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <Label>
                <span>API Url</span>
                <Input 
                  {...register("apiUrl")}
                  className="mt-1" placeholder="eg https://abc.com" />
              </Label>
           
            </div>
          </div>
        </div>


        <SectionTitle>Contact Information</SectionTitle>
        <div className="flex flex-row">
          <div className="w-full">
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <Label>
                <span>Contact Name</span>
                <Input 
                  {...register("contactName")}
                  className="mt-1" placeholder="eg ABC Company" />
              </Label>
              <Label>
                <span>Email</span>
                <Input 
                  {...register("email")}
                  className="mt-1" placeholder="email@email.com" />
              </Label>
              <Label>
                <span>Mobile</span>
                <Input 
                  {...register("mobile")}
                className="mt-1" placeholder="XXX-XXX-XDXX" />
              </Label>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 mb-8">
          <Button type="submit" disabled={mutation.isLoading}>Update customer</Button>
          <button
            type="reset"
            onClick={() => push('/app/customer')}
            className="ml-5 bg-transparent text-red-700 hover:text-black py-2 px-4 hover:border-red-500 rounded"
          >
            <MdArrowBack className="inline text-xl align-middle leading-none" />
            &nbsp; go back
          </button>
        </div>
      </form>
    </>
  );
}

export default EditCustomerPage;
