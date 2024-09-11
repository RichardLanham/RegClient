import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
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

import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";

import Header from "../components/Header";
import { appConfig } from "../config.js";
const NODEURL = appConfig.NODEURL;

export default function PayPalReturn(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const PayerId = searchParams.get("PayerID");

  //  https://staging.contranooga.us/return?PayerID=37V6DW3W7VAM6

  useEffect(async () => {
    try {
      //ret.push(field);
      const response = fetch(`${NODEURL}api/return`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: { payerId: PayerId, searchParams: searchParams.toString() },
        }),
      });

      const orderData = await response.json();
      console.log(orderData);
    } catch (err) {}
  }, [PayerId]);

  const theme = useTheme();

  console.log("happening");
  console.log(PayerId);
  return (
    <Header>
      <div>
        <div
          style={{ width: "fit-content" }}
          className="dropdown"
          // onMouseEnter={() => menuOpen("myDropdown")}
        >
          {PayerId}
        </div>
      </div>
    </Header>
  );
}
