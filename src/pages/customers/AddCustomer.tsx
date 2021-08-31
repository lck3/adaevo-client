import React from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCustomerPayload } from "src/core/domains/customer/entity/types/CreateCustomerPayload";
import { addNewCustomerRequest } from "src/infrastructure/api/customerRequests";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleRemoteOperationError } from "../../utils/ErrorHandler";
import { handleRemoteOperationSuccess } from "../../utils/SuccessHandler";

const {
  Input,
  Label,
  Textarea,
  Button,
} = require("@windmill/react-ui");

function AddCustomer() {
  const { t } = useTranslation();

  const {push} = useHistory()
  const mutation = useMutation((data: CreateCustomerPayload) => addNewCustomerRequest(data), {
    onSuccess: () => {
      push('/app/customer')
    }
  })

  const customerFormFields = {
    businessName: {
      placeholder: t('customers.addCustomer.fields.businessName.placeholder'),
      label: t('customers.addCustomer.fields.businessName.label'),
      validation: Yup.string().required(t('customers.addCustomer.fields.businessName.required'))
    }
  } 

  const validationObject = {}
  Object.keys(customerFormFields).forEach(field => {
    // @ts-ignore
      validationObject[field] = customerFormFields[field].validation
  })
  const validationSchema =  Yup.object().shape(validationObject);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState
  } = useForm<CreateCustomerPayload>(formOptions);
  const { errors } = formState;



  const onSubmit: SubmitHandler<CreateCustomerPayload> = (data) => {
    mutation.mutateAsync(data)
    .then(() => handleRemoteOperationSuccess(t(`customers.addCustomer.response.success`)))
    .catch(() => handleRemoteOperationError(t(`customers.addCustomer.response.failed`)))
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
                  type="url"
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
                  type="tel"
                  {...register("mobile")}
                
                className="mt-1" placeholder="XXX-XXX-XXXX" />
              </Label>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 mb-8">
          <Button type="submit" disabled={mutation.isLoading}>Save new customer</Button>
        </div>
      </form>
    </>
  );
}

export default AddCustomer;
