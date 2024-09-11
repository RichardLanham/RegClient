import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeoverrides } from "./themeOverrides";

const Theme = (props) => {
  const theme = createTheme(themeoverrides);
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
