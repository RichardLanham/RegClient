import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import { contact } from "../config.js";

import { Box, Button } from "@mui/material";

const ContactInfo = () => {
  const theme = useTheme();

  const StyledBox = styled(Box)(({ theme }) => ({
    ...theme.typography.body1,
    width: 320,
    margin: "auto",
    // backgroundColor: theme.palette.grey[100],
    // padding: 5,
    // borderRadius: 5,
    // width: 200,
    // margin: "auto",
    // marginTop: 50,
    // border: "3px solid black",
    [theme.breakpoints.down("xl")]: {},
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {
      // padding: 2,
    },
  }));
  return (
    <StyledBox>
      {contact.email && (
        <>
          If you need help, if anything is not working, email us at&nbsp;
          {contact?.email}
          {contact.message && <>, or message to {contact?.message}</>}
        </>
      )}
    </StyledBox>
  );
};

export default ContactInfo;
