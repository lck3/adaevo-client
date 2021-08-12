import React, { useEffect, useState } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCampaignPayload } from "src/core/domains/campaign/entity/types/CreateCampaignPayload";
import { addNewCampaignRequest, getOneCampaignRequest, updateCampaignRequest } from "src/infrastructure/api/campaignRequests";
import { AddLandingPagePayload } from "src/core/domains/landingpage/entity/types/AddLandingPagePayload";
import { getCustomerRequest } from "src/infrastructure/api/customerRequests";
import { CustomerPayload } from "src/core/domains/customer/entity/types/CustomerPayload";
import { useParams } from "react-router-dom";
import { EditCampaignsPayload } from "src/core/domains/campaign/entity/types/EditCampaignPayload";
const {
  Input,
  Label,
  Select,
  Button,
} = require("@windmill/react-ui");

function UpdateCampaignPage () {
  const [campaignData, setCampaignData] = useState<EditCampaignsPayload>()
  const campaignId = useParams<{id: string }>().id


  const {
    register: registerCampaignFields,
    handleSubmit: handleCampaignSubmit,
    setValue
  } = useForm<EditCampaignsPayload>();

  const {
    register: registerLandingPageFields,
    handleSubmit: handleLandingPageSubmit,
  } = useForm<AddLandingPagePayload>();

  useEffect(() => {
    if (!campaignId) return
    getOneCampaignRequest(parseInt(campaignId))
    .then(campaign => {
      Object.keys(campaign)
      .forEach((key) => {
        // @ts-ignore
        setValue(key, campaign[key])
        // @ts-ignore
        setCampaignData(campaign)
      })
    })
  }, [campaignId, setValue])

  const onAddLandingPageSubmit: SubmitHandler<CreateCampaignPayload> = (
    data
  ) => {
    const send = addNewCampaignRequest(data);
    console.log(send);
  };
  const onUpdateCampaignFormSubmit: SubmitHandler<EditCampaignsPayload> = (
    data
  ) => {
    const send = updateCampaignRequest(parseInt(campaignId), data);
    console.log(send);
  };


  return (
    <>
    <PageTitle>Create a new Campaign</PageTitle>
    <SectionTitle>Campaigns require a title to be identified.</SectionTitle>
    <form onSubmit={handleCampaignSubmit(onUpdateCampaignFormSubmit)}>
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
          <span>Customer</span>
          <p>{campaignData?.company}</p>
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
  )
}


export default UpdateCampaignPage