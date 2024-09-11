import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import "./muisize.css";
const MuiSize = () => {
  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const qLoc = searchParams.has("loc");

  const [local, setLocal] = useState(false);
  const [info, setInfo] = useState([]);
  const [showTheme, setShowTheme] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const updateInfo = () => {
    const _info = [];
    _info.push({ value: window.screen.availHeight, label: "height" });
    _info.push({ value: window.screen.availWidth, label: "width" });
    setInfo(_info);
  };
  useEffect(() => {
    const _info = [];
    _info.push({ value: window.screen.availHeight, label: "height" });
    _info.push({ value: window.screen.availWidth, label: "width" });
    setInfo(_info);
    window.onscroll = () => {
      const _info = [];
      _info.push({ value: window.screen.availHeight, label: "height" });
      _info.push({ value: window.screen.availWidth, label: "width" });
      setInfo(_info);
    };
    window.onresize = (event) => {
      const _info = [];
      _info.push({ value: window.screen.availHeight, label: "height" });
      _info.push({ value: window.screen.availWidth, label: "width" });
      setInfo(_info);
    };
    if (
      window.location.host.substring(0, 3) === "192" ||
      window.location.host.substring(0, 3) === "loc" ||
      window.location.search === "?info" ||
      qLoc
    ) {
      setLocal(true);
    }
  }, []);

  if (!local) {
    return null;
  }
  const boxes = [
    { size: "xs", label: "extra small" },
    { size: "sm", label: "small" },
    { size: "md", label: "medium" },
    { size: "lg", label: "large" },
    { size: "xl", label: "extra large" },
  ];

  const Palette = () => {
    const pail = [
      "primary",
      "secondary",
      "warning",
      "info",
      "error",
      "success",
    ];
    return (
      <div
        style={{
          display: "flex",
          gap: 5,
          width: "90vw",
          border: "1px solid black",
          marginTop: 320,
          marginLeft: 30,
          marginRight: 30,
          display: showPalette ? "block" : "none",
        }}
      >
        {pail.map((p, index) => {
          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                // flexDirection: "column",
                gap: 5,
              }}
            >
              {p} {theme.palette[p].main}
              {["light", "main", "dark"].map((shade, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      padding: 10,
                      backgroundColor: theme.palette[p][shade],
                      color: theme.palette[p].contrastText,
                      width: 200,
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
    );
  };

  return (
    <div>
      <Palette />
      <div
        style={{
          overflow: "auto",
          marginTop: 300,
          display: showTheme ? "flex" : "none",
          width: "fit-content",
          margin: "auto",
          // border: "1px solid black",
          // zIndex: theme.zIndex.tooltip,
          // backroundColor: "#fff",
          // position: "absolute",
          // bottom: 0,
          // right: 0,
          // display: "flex",
        }}
      >
        <pre style={{ display: "flex" }}>{JSON.stringify(theme, null, 3)}</pre>
      </div>
      <Box
        sx={(theme) => ({
          width: "fit-content",
          position: "fixed",
          margin: 0,
          padding: 0,
          // top: "100%",
          bottom: 0,
          right: 0,
          zIndex: theme.zIndex.tooltip,
          display: "flex",
          flexDirection: "column",
        })}
      >
        <Button
          style={{ ...theme.typography.button2 }}
          onClick={() => setShowPalette(!showPalette)}
        >
          {showPalette ? "Close Palette" : "Show Palette"}
        </Button>

        <Button
          style={{ ...theme.typography.button2 }}
          onClick={() => setShowTheme(!showTheme)}
        >
          {showTheme ? "Close Theme" : "Show Theme"}
        </Button>
        {boxes.map((box, index) => {
          return (
            <Box
              key={index}
              className="box"
              sx={(theme) => ({
                display: {
                  xs: box.size === "xs" ? "block" : "none",
                  sm: box.size === "sm" ? "block" : "none",
                  md: box.size === "md" ? "block" : "none",
                  lg: box.size === "lg" ? "block" : "none",
                  xl: box.size === "xl" ? "block" : "none",
                },
              })}
            >
              {box.label}
              {info.map((item, index) => {
                return (
                  <div key={index}>
                    {item.label} {item.value}
                  </div>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default MuiSize;
