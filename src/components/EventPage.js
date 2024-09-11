import React, { useState, useEffect, useRef } from "react";

import { useTheme, styled } from "@mui/material/styles";
import EventInfo from "./EventInfo";
import Header from "./Header";

import RegisterHere from "./RegisterHere";

// const NODEURL = appConfig.NODEURL;;
function Schedule2023() {
  window.location.href = "/schedule_2023.html";
  return null;
}
export default function EventPage() {
  const theme = useTheme();

  const earlyBirdDate = new Date(appConfig.EARLYBIRDDATE);
  const isEarlyBird = earlyBirdDate > new Date();

  const [price, setPrice] = useState(isEarlyBird ? prices[0][0] : prices[0][2]);
  const [studentPrice, setStudentPrice] = useState(
    isEarlyBird ? prices[0][1] : prices[0][3]
  );

  const lateBird = [90, 135];

  const [showHeader, setShowHeader] = useState(true);

  const [headerOn, setHeaderOn] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const header = urlParams.get("header");
    setHeaderOn(header === "true");
  }, []);

  const StyledHeader = styled("div")(({ theme }) => ({
    ...theme.typography.h4,
    width: "fit-content",

    margin: "auto",
    // marginTop: 5,
    // marginBottom: 5,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 20,
    padding: 15,
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    [theme.breakpoints.down("xl")]: {},
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      padding: 2,
    },
  }));

  const StyledInfo = styled("div")(({ theme }) => ({
    ...theme.typography.h5,
    width: "fit-content",
    margin: "auto",
    // marginTop: 20,
    padding: 10,
    borderRadius: 10,
    border: `2px solid ${theme.palette.primary.dark}`,
    boxShadow: "rgba(0, 0, 0, 0.15) 3.95px 3.95px 2.6px",
    [theme.breakpoints.down("xl")]: {},
    [theme.breakpoints.down("lg")]: {
      padding: 3,
      // margin: 4,
    },
    [theme.breakpoints.down("md")]: {
      // padding: 3,
      // margin: 2,
      // fontSize: "1em",
    },
  }));

  // headerOn ? <div>one</div> : <div>Twp</div>;
  if (headerOn) {
    return (
      <Header>
        <EventInfo />
        <div
          style={{
            margin: "auto",
            marginTop: 15,
            width: "fit-content",
            border: "1px none black",
          }}
        >
          <RegisterHere />
        </div>
      </Header>
    );
  }

  return (
    <div>
      <EventInfo />{" "}
      <div
        style={{
          margin: "auto",
          marginTop: 15,
          width: "fit-content",
          border: "1px none black",
        }}
      >
        <RegisterHere />
      </div>
    </div>
  );
}
