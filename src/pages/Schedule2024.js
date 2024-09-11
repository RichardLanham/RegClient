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
// import { CSVLink } from "react-csv";
import {
  createTheme,
  useTheme,
  styled,
  alpha,
  ThemeProvider,
} from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import "./schedule.css";

import Header from "../components/Header";

import Schedule from "./Schedule";

const Schedule2024 = () => {
  const theme = useTheme();
  return (
    <Header title="Schedule">
      <Schedule />
    </Header>
  );
};

export default Schedule2024;
