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

import Header from "../components/Header";

const NODEURL = appConfig.NODEURL;

export default function BoilerPlate(props) {
  const theme = useTheme();

  const StyledLink = styled("a")(({ theme }) => ({
    width: "fit-content",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    margin: 5,
    textDecoration: "none", // Optionally remove underline for all states

    // Pseudo-classes
    "&:hover": {
      color: theme.palette.primary.main, // Change color on hover
    },
    "&:active": {
      color: theme.palette.error.main, // Color when the link is active (clicked)
    },
    "&:visited": {
      color: theme.palette.success.main, // Color for visited links
    },
  }));
  return (
    <Header>
      <div>
        <div
          style={{ border: "3px solid black", width: "fit-content" }}
          className="dropdown"
          // onMouseEnter={() => menuOpen("myDropdown")}
        ></div>
      </div>
    </Header>
  );
}
