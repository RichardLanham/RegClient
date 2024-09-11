import React from "react";
import { useTheme, styled } from "@mui/material/styles";

import { Link } from "react-router-dom";

const StyledLink = ({ text, url }) => {
  const theme = useTheme();
  const StyledLink = styled(url.substring(0, 1) === "/" ? Link : "a")(
    ({ theme }) => ({
      width: "fit-content",
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      margin: 5,
      textDecoration: "none", // Optionally remove underline for all states
      "&:hover": {
        color: theme.palette.primary.main, // Change color on hover
      },
      "&:active": {
        color: theme.palette.error.main, // Color when the link is active (clicked)
      },
      "&:visited": {
        color: theme.palette.success.main, // Color for visited links
      },
    })
  );
  return <StyledLink href={url}>{text}</StyledLink>;
};

export default StyledLink;
