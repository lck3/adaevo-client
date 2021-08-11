import React from "react";

import CTA from "../components/CTA";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {MdArrowBack} from 'react-icons/md'
const {
  Input,
  HelperText,
  Label,
  Select,
  Textarea,
  Button,
} = require("@windmill/react-ui");

function Forms() {
  return (
    <>
      <PageTitle>Add a new Customer</PageTitle>
      <SectionTitle>Business Information</SectionTitle>
      <div className="flex flex-row">
        <div className="w-10/12">
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Label>
              <span>Business Name</span>
              <Input className="mt-1 w-10/12" placeholder="eg ABC Company" />
            </Label>
            <Label>
              <span>VAT Number</span>
              <Input className="mt-1 w-10/12" placeholder="XXX-XXX-XXX" />
            </Label>
            <Label>
              <span>Legal Address</span>
              <Textarea
                className="mt-1 w-10/12"
                placeholder="House Number, Street Name"
              />
            </Label>
            <Label>
              <span>Country</span>
              <Input className="mt-1 w-10/12" placeholder="" />
            </Label>
            <Label>
              <span>City</span>
              <Input className="mt-1 w-10/12" placeholder="" />
            </Label>
            <Label>
              <span>Province</span>
              <Input className="mt-1 w-10/12" placeholder="" />
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
              <Input className="mt-1" placeholder="eg ABC Company" />
            </Label>
            <Label>
              <span>Email</span>
              <Input className="mt-1" placeholder="email@email.com" />
            </Label>
            <Label>
              <span>Mobile</span>
              <Input className="mt-1" placeholder="XXX-XXX-XDXX" />
            </Label>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 mb-8">
        <Button>Save new customer</Button>
        <button className="ml-5 bg-transparent text-red-700 hover:text-black py-2 px-4 hover:border-red-500 rounded">
          <MdArrowBack className="inline text-xl align-middle leading-none" />
          &nbsp;
          go back
        </button>
      </div>
    </>
  );
}

export default Forms;
