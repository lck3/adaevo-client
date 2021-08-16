import React, { useEffect } from "react";

import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ActiveCampaignStats } from "../components/Widgets/ActiveCampaignStats";
import styled from "styled-components";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";

const Box = styled.table`
  height: 300px;
  background: #ddd;
`;

function Dashboard() {
  function initMap() {
    // eslint-disable-next-line no-undef
    new google.maps.Map(document.getElementById("google-map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
  useEffect(() => {
    initMap();
  }, []);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Box id="google-map" className="relative"></Box>

        <Box className="relative">
          <ActiveCampaignStats term="Stats"/>
        </Box>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Box className="relative">
          <ActiveCampaignStats term="Rates" />
        </Box>

        <Box className="relative">
          <ActiveCampaignStats term="Revenue" />
        </Box>
      </div>
    </>
  );
}

export default Dashboard;
