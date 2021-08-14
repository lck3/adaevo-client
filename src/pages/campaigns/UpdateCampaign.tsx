import React, { useEffect, useState } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  getOneCampaignRequest,
  updateCampaignRequest,
} from "src/infrastructure/api/campaignRequests";
import { AddLandingPagePayload } from "src/core/domains/landingpage/entity/types/AddLandingPagePayload";
import { useParams } from "react-router-dom";
import { EditCampaignsPayload } from "src/core/domains/campaign/entity/types/EditCampaignPayload";
import { addNewLandingPageRequest, removeLandingPageRequest, updateLandingPageStatusRequest } from "src/infrastructure/api/landingPageRequests";
import { SmallButton } from "src/components/Buttons";
import { EditLandingPagePayload } from "src/core/domains/landingpage/entity/types/EditLandingPagePayload";
const { Input, Label, Button } = require("@windmill/react-ui");
const {
  Table,
  TableHeader,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
  Select
} = require("@windmill/react-ui");
function UpdateCampaignPage() {
  const [campaignData, setCampaignData] = useState<EditCampaignsPayload>({} as EditCampaignsPayload);
  const campaignId = useParams<{ id: string }>().id;

  const {
    register: registerCampaignFields,
    handleSubmit: handleCampaignSubmit,
    setValue,
  } = useForm<EditCampaignsPayload>();

  const {
    register: registerLandingPageFields,
    handleSubmit: handleLandingPageSubmit,
  } = useForm<AddLandingPagePayload>();

  useEffect(() => {
    if (!campaignId) return;
    getOneCampaignRequest(parseInt(campaignId)).then((campaign) => {
      Object.keys(campaign).forEach((key) => {
        // @ts-ignore
        setValue(key, campaign[key]);
        // @ts-ignore
        setCampaignData(campaign);
      });
    });
  }, [campaignId, setValue]);

  /**
   * adds a new landing page to the
   * current campaign
   */
  const onAddLandingPageSubmit: SubmitHandler<AddLandingPagePayload> = (
    data
  ) => {
    const send = addNewLandingPageRequest({
      url: data.url,
      campaignId: parseInt(campaignId),
    });
    console.log(send);
  };

  /**
   * change the title and the tags for a campaign
   */
  const onUpdateCampaignFormSubmit: SubmitHandler<EditCampaignsPayload> = (
    data
  ) => {
    const send = updateCampaignRequest(parseInt(campaignId), data);
    console.log(send);
  };

  function handleRemoveLandingPage(id: number) {
    removeLandingPageRequest(parseInt(campaignId), id)
  }

  function handleStatusUpdate(page: EditLandingPagePayload, status: string) {
    updateLandingPageStatusRequest(page.id, { ...page , status})
  }

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
            <p>
              <strong>    
                {campaignData?.customer?.businessName}
              </strong>
            </p>
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
      {
        // @ts-ignore
        campaignData.landingPages && campaignData.landingPages.length > 0 && (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell className="w-9/12">Landing Page Urls</TableCell>
                  <TableCell>status</TableCell>
                  <TableCell></TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                { 
                  // @ts-ignore
                  campaignData.landingPages.map(page => (
                  <TableRow>
                    <TableCell>{page.url}</TableCell>
                    <TableCell>
                      <Label className="mt-0">
                      <Select onChange={(e: any) => handleStatusUpdate(page, e.target.value)} value={page.status} className="mt-0 p-1">
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                        <option value="STAND-BY">STAND-BY</option>
                      </Select>
                    </Label>
                    </TableCell>
                    <TableCell>
                      <SmallButton onClick={() => handleRemoveLandingPage(page.id)}>remove</SmallButton>
                    </TableCell>
                  </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </>
  );
}

export default UpdateCampaignPage;


