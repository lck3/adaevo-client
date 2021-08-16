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
import {
  addNewLandingPageRequest,
  removeLandingPageRequest,
  updateLandingPageStatusRequest,
} from "src/infrastructure/api/landingPageRequests";
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
} = require("@windmill/react-ui");
function UpdateCampaignPage() {
  const [campaignData, setCampaignData] = useState<EditCampaignsPayload>(
    {} as EditCampaignsPayload
  );
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
    removeLandingPageRequest(parseInt(campaignId), id);
  }

  function handleStatusUpdate(page: EditLandingPagePayload, status: string) {
    updateLandingPageStatusRequest(page.id, { ...page, status });
  }

  function parseMetricNumber(metricValue = 0) {
    try {
      // @ts-ignore
      return parseFloat(metricValue).toFixed(2);
    } catch (e) {
      return "";
    }
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
              <strong>{campaignData?.customer?.businessName}</strong>
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
            <div className="relative">
              <p
                className="absolute inset-x-0 top-2 px-4 text-sm font-medium leading-5"
                style={{ top: "9px" }}
              >
                http(s)://
              </p>
              <Input
                {...registerLandingPageFields("url")}
                className="mt-1 form-input block w-full pl-20"
                placeholder="eg https://linktolandingpage.com/landingpage.html"
              />
            </div>
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
                  <TableCell className="w-6/12">Landing Page Urls</TableCell>
                  <TableCell className="w-1/12">Views</TableCell>
                  <TableCell className="w-1/12">Engagement</TableCell>
                  <TableCell className="w-1/12">Sessions</TableCell>
                  <TableCell className="w-1/12">Engaged Sessions</TableCell>
                  <TableCell className="w-2/12">Status</TableCell>
                  <TableCell className="w-1/12"></TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {
                  // @ts-ignore
                  campaignData.landingPages.map(
                    ({ stats, url, id, status, ...page }, key) => {
                      return (
                        <TableRow key={key}>
                          <TableCell>{url}</TableCell>
                          <TableCell>
                            {stats?.stats?.screenPageViews ?? 0}
                          </TableCell>
                          <TableCell>
                            {parseMetricNumber(stats?.stats?.engagementRate)}
                          </TableCell>
                          <TableCell>{stats?.stats?.sessions ?? 0}</TableCell>
                          <TableCell>
                            {parseMetricNumber(stats?.stats?.engagedSessions)}
                          </TableCell>
                          <TableCell>
                            <Label className="mt-0">
                              <select
                                onChange={(e: any) =>
                                  handleStatusUpdate(
                                    { ...page, stats, id, status },
                                    e.target.value
                                  )
                                }
                                value={status}
                                className="block w-full dark:text-gray-300 focus:outline-none focus:border-purple-400 dark:border-gray-600 dark:bg-gray-700 focus:shadow-outline-purple dark:focus:shadow-outline-gray dark:focus:border-gray-600 form-select leading-5 mt-0 p-1 text-xs"
                              >
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                                <option value="STAND-BY">STAND-BY</option>
                              </select>
                            </Label>
                          </TableCell>
                          <TableCell>
                            <SmallButton
                              onClick={() => handleRemoveLandingPage(id)}
                            >
                              remove
                            </SmallButton>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )
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
