import React, {  } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCampaignPayload } from "src/core/domains/campaign/entity/types/CreateCampaignPayload";
import { addNewCampaignRequest } from "src/infrastructure/api/campaignRequests";
import { getCustomerRequest } from "src/infrastructure/api/customerRequests";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { handleRemoteOperationError } from "src/utils/ErrorHandler";
import { handleRemoteOperationSuccess } from "src/utils/SuccessHandler";
import { useTranslation } from "react-i18next";
const {
  Input,
  Label,
  Select,
  Button,
} = require("@windmill/react-ui");

function AddCampaignForm() {
  const { t } = useTranslation();

  // const [customerDropDownData, setCustomerDropDownData] = useState<CustomerPayload[]>([])
  const {
    register: registerCampaignFields,
    handleSubmit: handleCampaignSubmit,
  } = useForm<CreateCampaignPayload>();

  const { data: customerDropDownData, isFetching } = useQuery(
    'customerDropDownData',
    getCustomerRequest,
    {
      onError: (error: Error) => handleRemoteOperationError(error)
    }
  )

  const {push} = useHistory()

  const mutation = useMutation((newCampaign: CreateCampaignPayload) => addNewCampaignRequest(newCampaign))


  const onAddCampaignFormSubmit: SubmitHandler<CreateCampaignPayload> = (
    data
  ) => {
    mutation.mutateAsync(data)
    .then(async () => handleRemoteOperationSuccess(t('campaigns.addCampaign.response.success')))
    .then(()  => {
      push('/app/campaign')
    })
    .catch(error => handleRemoteOperationError(error, t('campaigns.addCampaign.response.failed')))
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
