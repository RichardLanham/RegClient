import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const Progress = ({ spinner }) => {
  const theme = useTheme();
  return (
    <Box
      style={{
        position: "",
        display: spinner ? "flex" : "none",
        right: 0,
        bottom: 0,
        zIndex: theme.zIndex.tooltip,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Progress;
