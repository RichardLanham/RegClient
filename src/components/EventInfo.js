import React, { useState } from "react";

import { useTheme, styled } from "@mui/material/styles";
import { Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import Zoom from "@mui/material/Zoom";

import { prices, appConfig } from "../config.js";

export default function EventInfo() {
  const theme = useTheme();

  const earlyBirdDate = new Date(appConfig.EARLYBIRDDATE);
  const isEarlyBird = earlyBirdDate > new Date();

  const [price, setPrice] = useState(isEarlyBird ? prices[0][0] : prices[0][2]);
  const [studentPrice, setStudentPrice] = useState(
    isEarlyBird ? prices[0][1] : prices[0][3]
  );

  const lateBird = [90, 135];

  const [showHeader, setShowHeader] = useState(true);

  const StyledHeader = styled("div")(({ theme }) => ({
    ...theme.typography.h4,
    width: "fit-content",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 20,
    padding: 4,
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    [theme.breakpoints.down("xl")]: {},
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      padding: 2,
    },
  }));

  const StyledInfo = styled("div")(({ theme }) => ({
    ...theme.typography.h6,
    width: "fit-content",
    // margin: "auto",
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

  const Details = () => {
    const [show, setShow] = useState(false);
    if (!show) {
      return (
        <Button
          style={{
            ...theme.typography.button,
            ...theme.typography.h5,
            width: "fit-content",
            margin: 10,
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
          }}
          onClick={() => setShow(true)}
        >
          details...
        </Button>
      );
    }
    return (
      <Zoom in={true}>
        <StyledInfo
          style={{
            position: "relative",
            left: 0,
            top: 0,
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <div>
            <Button
              style={{
                ...theme.typography.button2,
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                position: "absolute",
                top: -30,
                left: 0,
              }}
              onClick={() => setShow(false)}
            >
              <CloseIcon />
            </Button>
          </div>
          <div>
            <span style={{ fontWeight: 800 }}>bands </span>Turnip the Beet and
            Kingfisher
          </div>
          <div>
            <span style={{ fontWeight: 800 }}>callers </span>Tim Klein and Vicki
            Herndon
          </div>

          <div>
            <span style={{ fontWeight: 800 }}>location </span>East Ridge
            Presbyterian Church, 4919 Court Dr, Chattanooga, TN 37412
          </div>
        </StyledInfo>
      </Zoom>
    );
  };

  return (
    <div
      style={{
        border: "1px none black",
        display: showHeader ? "flex" : "none",

        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <StyledHeader
          style={{
            backgroundColor: theme.palette.secondary.main,
            width: 280,
            // maxWidth: 600,
            // minWidth: 280,
          }}
        >
          <i>Chattaboogie</i> 2025 will be January 17th-19th
          <Details />
        </StyledHeader>

        <StyledHeader style={{ width: 280 }}>
          Registration Opens November 1st
        </StyledHeader>

        <StyledInfo style={{ width: 280 }}>
          <div>
            {isEarlyBird
              ? "Early bird pricing through " +
                new Date(earlyBirdDate - 1).toDateString("en-US", {
                  timeZone: "UTC",
                })
              : ""}
          </div>
          <div>
            price: ${price}.00, student: ${studentPrice}{" "}
          </div>
          <div>
            {isEarlyBird
              ? `After  ${new Date(earlyBirdDate - 1).toDateString("en-US", {
                  timeZone: "UTC",
                })} the prices are $${lateBird[1]} / $${lateBird[0]}`
              : ""}
          </div>
        </StyledInfo>
      </div>
    </div>
  );
}
