import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CSVLink } from "react-csv";
import {
  createTheme,
  useTheme,
  styled,
  alpha,
  ThemeProvider,
} from "@mui/material/styles";

import { Link } from "react-router-dom";

import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import "./dancers.css";

import { appConfig } from "../config.js";

import Header from "./Header";
import { ThemeContext } from "styled-components";
// import MuiSize from "./MuiSize";

const NODEURL = appConfig.NODEURL;

export default function Footer(props) {
  const theme = useTheme();

  return (
    <Box
      className="noprint"
      sx={{
        width: {
          xs: "80%",
          md: 400,
          lg: 800,
        },
        margin: "auto",
        marginTop: 5,
      }}
    >
      <Box
        sx={(theme) => ({
          ...theme.typography.body1,
          position: "relative",
          // backgroundColor: theme.palette.primary.dark,
          // color: theme.palette.primary.contrastText,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: 5,
          border: "2px solid black",
          padding: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        })}
        // sx={{
        //   ...theme.typography.body1,
        //   backgroundColor: theme.palette.info.dark,
        //   color: "#ffe",
        //   borderRadius: 5,
        //   padding: 1,
        //   display: "flex",
        //   flexDirection: "column",
        //   gap: 1,
        //   fontSize: "1.4em",
        // }}
      >
        <div>We greatly appreciate any donations you may wish to make.</div>
        <div>
          Physical checks are made out to “Chattanooga Traditional Dance
          Society” and mailed to 1228 E Breckinridge St Box #5, Louisville, KY
          40204.
        </div>
        <div>
          Digital donations can be submitted to “Chattanooga Traditional Dance
          Society” through PayPal.
        </div>
      </Box>

      <Box
        sx={{
          borderRadius: 5,
          padding: 1,
          marginTop: 10,

          width: 200,
          margin: "auto",
        }}
      >
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
        >
          <input type="hidden" name="hosted_button_id" value="9D7379T2HRKC2" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </Box>
    </Box>
  );
}
