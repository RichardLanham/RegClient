import React, { useState, useEffect, useRef } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
// import { ChartContainer } from "@mui/x-charts/ChartContainer";
// import { BarPlot } from "@mui/x-charts/BarChart";
import Header from "../components/Header.js";
import { appConfig } from "../config.js";

export default function SurveyResults() {
  const [survey, setSurvey] = useState([]);
  const [grouped, setGrouped] = useState([]);

  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const NODEURL = appConfig.NODEURL;

  const getGrouped = async () => {
    try {
      const response = await fetch(`${NODEURL}api/survey/grouped`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });

      const _group = await response.json();

      const gr = _group.map((row) => row.count);
      console.log(gr);
      setChartData(gr);

      const lbls = _group.map((row) => row.likert_text);

      setLabels(lbls);
      console.log(lbls);

      setGrouped(_group);

      // const data = [dancers];

      console.log(_group);
      //      return orderData.id;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  };

  const getSurvey = async () => {
    try {
      const response = await fetch(`${NODEURL}api/survey`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });

      const _survey = await response.json();

      setSurvey(
        _survey
          .sort((a, b) => {
            //a.likert_text > b.likert_text;
            if (a.likert < b.likert) {
              return -1;
            }
            if (a.likert > b.likert) {
              return 1;
            }
            return 0;
          })
          .reverse()
      );

      // const data = [dancers];

      console.log(_survey);
      //      return orderData.id;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getSurvey();
    getGrouped();

    return () => {};
  }, []);

  const props = {
    width: 900,
    height: 300,
    xAxis: [{ data: labels, scaleType: "band" }],
  };

  return (
    <Header>
      <div style={{ position: "relative" }}>
        <BarChart
          {...props}
          series={[
            {
              data: chartData,
            },
          ]}
        />
        <div
          style={{
            marginLeft: 10,
            display: "flex",
            fontWeight: 600,
            padding: 5,
            //   textDecoration: "underline",
          }}
        >
          <div style={{ border: "1px solid black", width: 250 }}>order_id</div>
          <div style={{ border: "1px solid black", width: 200 }}>
            likert text
          </div>
          <div style={{ border: "1px solid black", width: 300 }}>email</div>
          <div style={{ border: "1px solid black", flex: 1 }}>thoughts</div>
        </div>
        {survey.map((row, index) => {
          // if (row.thoughts) {
          return (
            <div
              key={index}
              style={{
                marginLeft: 20,
                height: "2em",
                lineHeight: "2em",
                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffff",
                display: "flex",
              }}
            >
              <div style={{ width: 250 }}>{row.order_id}</div>

              <div style={{ width: 200 }}>{row.likert_text}</div>
              <div style={{ width: 300 }}>{row.email}</div>
              <div style={{ flex: 1 }}>{row.thoughts}</div>
            </div>
          );
          // }
        })}
      </div>
    </Header>
  );
}
