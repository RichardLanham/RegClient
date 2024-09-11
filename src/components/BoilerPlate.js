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

import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import "./dancers.css";

import Header from "./Header";

const NODEURL = appConfig.NODEURL;

export default function BoilerPlate(props) {
  const theme = useTheme();
  return (
    <Header>
      <div>
        <div
          style={{ border: "3px solid black", width: "fit-content" }}
          className="dropdown"
          // onMouseEnter={() => menuOpen("myDropdown")}
        >
          <button
            onMouseEnter={() => menuOpen("myDropdown")}
            className="dropbtn"
          >
            Dropdown One
          </button>
          <div
            id="myDropdown"
            className="dropdown-content"
            onMouseLeave={() => closeMenus()}
            // onClick={() => menuClose(this.id)}
          >
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </Header>
  );
}
