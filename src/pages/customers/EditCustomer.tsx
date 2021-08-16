import React, { useState } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { MdArrowBack } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { editCustomerRequest, getOneCustomerRequest } from "src/infrastructure/api/customerRequests";
import {
  useParams
} from "react-router-dom";
import { useEffect } from "react";
import { CustomerPayload } from "src/core/domains/customer/entity/types/CustomerPayload";
import { EditCustomerPayload } from "src/core/domains/customer/entity/types/EditCustomerPayload";
const {
  Input,
  Label,
  Textarea,
  Button,
} = require("@windmill/react-ui");

function EditCustomerPage() {

  const customerId = useParams<{id: string }>().id
  const {
    register,
    handleSubmit,
    setValue
  } = useForm<EditCustomerPayload>();

  useEffect(() => {
    if (!customerId) return
    getOneCustomerRequest(parseInt(customerId))
    .then(customer => {
      Object.keys(customer)
      .forEach((key) => {
        // @ts-ignore
        setValue(key, customer[key])
      })
    })
  }, [customerId, setValue])



  const onSubmit: SubmitHandler<EditCustomerPayload> = (data) => {
    if (!customerId) return
    const send = editCustomerRequest(parseInt(customerId), data)
    console.log(send)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle>Add a new Customer</PageTitle>
        <SectionTitle>Business Information</SectionTitle>
        <div className="flex flex-row">
          <div className="w-10/12">
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
          <div className="w-10/12">
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
          <div className="w-10/12">
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
          <Button type="submit">Update customer</Button>
          <button
            type="reset"
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
