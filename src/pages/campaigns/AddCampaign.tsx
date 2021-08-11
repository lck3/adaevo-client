import React, { useEffect, useState } from "react";

import CTA from "../../components/CTA";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { MailIcon } from "../../icons";
import { CreateCampaignPayload } from "src/core/domains/campaign/entity/types/CreateCampaignPayload";
import { addNewCampaignRequest } from "src/infrastructure/api/campaignRequests";
import { AddLandingPagePayload } from "src/core/domains/landingpage/entity/types/AddLandingPagePayload";
import { getCustomerRequest } from "src/infrastructure/api/customerRequests";
import { CustomerPayload } from "src/core/domains/customer/entity/types/CustomerPayload";
const {
  Input,
  HelperText,
  Label,
  Select,
  Textarea,
  Button,
} = require("@windmill/react-ui");

function AddCampaignForm() {
  const [customerDropDownData, setCustomerDropDownData] = useState<CustomerPayload[]>([])
  const {
    register: registerCampaignFields,
    handleSubmit: handleCampaignSubmit,
  } = useForm<CreateCampaignPayload>();
  const {
    register: registerLandingPageFields,
    handleSubmit: handleLandingPageSubmit,
  } = useForm<AddLandingPagePayload>();

  useEffect(() => {
    getCustomerRequest()
    .then(customerData => {
      return setCustomerDropDownData(customerData);
    })
  }, [])

  const onAddCampaignFormSubmit: SubmitHandler<CreateCampaignPayload> = (
    data
  ) => {
    const send = addNewCampaignRequest(data);
    console.log(send);
  };

  const onAddLandingPageSubmit: SubmitHandler<CreateCampaignPayload> = (
    data
  ) => {
    const send = addNewCampaignRequest(data);
    console.log(send);
  };

  // const onUpdateCampaignFormSubmit: SubmitHandler<CreateCampaignPayload> = (data) => {
  //   const send = addNewCampaignRequest(data);
  //   console.log(send);
  // };

  return (
    <>
      <PageTitle>Create a new Campaign</PageTitle>
      <SectionTitle>Campaigns require a title to be identified.</SectionTitle>
      <form onSubmit={handleCampaignSubmit(onAddCampaignFormSubmit)}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>Title</span>
            <Input
              className="mt-1"
              placeholder="Get a new car Ads"
              {...registerCampaignFields("title")}
            />
          </Label>
          <Label>
            <span>Tags</span>
            <Input
              className="mt-1"
              placeholder="eg benz, company, businesses"
              {...registerCampaignFields("tags")}
            />
          </Label>

          <Label className="mt-4">
            <span>Select a customer for this campaign</span>
            <Select className="mt-1" {...registerCampaignFields("customerId")}>
              {
                customerDropDownData.length > 0 && customerDropDownData.map(data => (
                  <option value={data.id}>{data.businessName}, {data.country}</option>
                ))
              }
            </Select>
          </Label>

          <Label className="mt-4">
            <Button type="submit">Save</Button>
          </Label>
        </div>
      </form>
      <SectionTitle>Add Landing Pages.</SectionTitle>
      <form onSubmit={handleLandingPageSubmit(onAddLandingPageSubmit)}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>URL</span>
            <Input
              {...registerLandingPageFields("url")}
              className="mt-1"
              placeholder="eg https://linktolandingpage.com/landingpage.html"
            />
          </Label>

          <Label className="mt-4">
            <Button type="submit">Add</Button>
          </Label>
        </div>
      </form>
    </>
  );
}

export default AddCampaignForm;
