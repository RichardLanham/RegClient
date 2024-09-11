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

import Header from "./Header";

import { appConfig } from "../config.js";

const NODEURL = appConfig.NODEURL;

export default function Policies(props) {
  const theme = useTheme();
  return (
    <div>
      <div>
        <Link
          style={{
            ...theme.typography.littleLink,
          }}
          to="/privacy-policy"
        >
          Privacy Policy
        </Link>
        <Link
          style={{
            ...theme.typography.littleLink,
          }}
          to="/user-agreement"
        >
          User Agreement
        </Link>
      </div>
    </div>
  );
}
