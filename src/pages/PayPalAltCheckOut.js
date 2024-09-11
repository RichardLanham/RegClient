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

export default function PayPalAltCheckOut(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const ppTx = searchParams.get("tx");

  if (ppTx) {
    console.log(ppTx);
  }
  const theme = useTheme();

  useEffect(() => {
    if (ppTx) {
      console.log(`PayPal Transaction ID: ${ppTx}`);

      // You might want to verify the transaction on your server here
      // fetch(`/verify-payment?tx=${ppTx}`)
      //   .then(response => response.json())
      //   .then(data => console.log(data));
    }
  }, [ppTx]);
  return (
    <Header>
      <div>
        <div
          style={{ width: "fit-content" }}
          className="dropdown"
          // onMouseEnter={() => menuOpen("myDropdown")}
        >
          {ppTx}
        </div>
      </div>
    </Header>
  );
}
