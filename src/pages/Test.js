import React, { useState, useEffect, useRef } from "react";

import Header from "../components/Header";
import MuiSize from "../components/MuiSize";
import "../App.css";
import Box from "@mui/material/Box";
import {
  // createTheme,
  useTheme,
  styled,
  // ThemeProvider,
} from "@mui/material/styles";

import "./test.css";

export default function Test() {
  const theme = useTheme();

  <MuiSize />;
  const pail = ["primary", "secondary", "warning", "info", "error", "success"];
  return (
    <div>
      <Header>
        <MuiSize />
        {/* <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            Opaque Text
          </div>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            This is opaque
          </div>
        </div> */}
        <div
          style={{
            display: "flex",
            gap: 5,
            width: "100%",
            border: "1px solid black",
          }}
        >
          {pail.map((p, index) => {
            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                {p} {theme.palette[p].main}
                {["light", "main", "dark"].map((shade, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        padding: 10,
                        backgroundColor: theme.palette[p][shade],
                        color: theme.palette[p].contrastText,
                      }}
                    >
                      {shade} {theme.palette[p][shade]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <pre style={{ display: "block" }}>{JSON.stringify(theme, null, 3)}</pre>

        <a href="https://www.giveforgoodlouisville.org/organization/louisville-country-dancers">
          Give For Good
        </a>
      </Header>
    </div>
  );
}
