import React from "react";
import { useTheme } from "@mui/material/styles";

export default function RegisterHere(props) {
  const theme = useTheme();
  return (
    <div>
      <a
        style={{
          // ...theme.typography.menuitem,
          ...theme.typography.h3,
          padding: 10,
          borderRadius: 10,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          textDecoration: "none",
          // backgroundColor: "none",
          // color: "#fff",
          // padding: 20,

          fontWeight: 400,
          // fontSize: 13,
          lineHeight: 1.75,
          textTransform: "uppercase",
        }}
        onClick={() => {
          window.top.location = "https://register.louisvillecountrydancers.org";
        }}
        href="#"
        //   href="https://register.louisvillecountrydancers.org"
      >
        Register Here
      </a>
    </div>
  );
}
