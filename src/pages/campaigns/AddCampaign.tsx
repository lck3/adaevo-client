import React, { useEffect, useState } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCampaignPayload } from "src/core/domains/campaign/entity/types/CreateCampaignPayload";
import { addNewCampaignRequest } from "src/infrastructure/api/campaignRequests";
import { getCustomerRequest } from "src/infrastructure/api/customerRequests";
import { CustomerPayload } from "src/core/domains/customer/entity/types/CustomerPayload";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
const {
  Input,
  Label,
  Select,
  Button,
} = require("@windmill/react-ui");

function AddCampaignForm() {

  // const [customerDropDownData, setCustomerDropDownData] = useState<CustomerPayload[]>([])
  const {
    register: registerCampaignFields,
    handleSubmit: handleCampaignSubmit,
  } = useForm<CreateCampaignPayload>();

  const { data: customerDropDownData, isFetching } = useQuery(
    'customerDropDownData',
    getCustomerRequest
  )

  const {push} = useHistory()

  const mutation = useMutation((newCampaign: CreateCampaignPayload) => addNewCampaignRequest(newCampaign))


  const onAddCampaignFormSubmit: SubmitHandler<CreateCampaignPayload> = (
    data
  ) => {
    mutation.mutateAsync(data)
    .then(()  => {
      push('/app/campaign')
    })
  };


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
            <Select disabled={isFetching} className="mt-1" {...registerCampaignFields("customerId")}>
              <option></option>
              {
                customerDropDownData && customerDropDownData.length > 0 && customerDropDownData.map((data, key) => (
                  <option key={key} value={data.id}>{data.businessName}, {data.country}</option>
                ))
              }
            </Select>
          </Label>

          <Label className="mt-4">
            <Button disabled={mutation.isLoading} type="submit">Save</Button>
          </Label>
        </div>
      </form>
    </>
  );
}

export default AddCampaignForm;
