import React from "react";
import { useTheme } from "@mui/material";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
require("./header.css");

export default function DropDown(props) {
  const closeMenus = props.closeMenus;
  const menu = props.menu;
  const side = props.side;
  const theme = useTheme();

  //   const links = props.links;
  function menuOpen(which) {
    console.log(which);
    // console.log("show " + JSON.stringify(menu, null, 3));
    document.getElementById(which).classList.toggle("show");
  }
  // console.log(menu);
  return (
    <Box sx={{ zIndex: "tooltip" }}>
      {/* <pre>{JSON.stringify(menu, null, 3)}</pre> */}
      <div
        style={{
          border: "3px none black",
          width: "fit-content",
          ...theme.typography.h5,
          //   backgroundColor: theme.palette.primary.main,
        }}
        className="dropdown"
        // onMousEnter={() => closeMenus()}
      >
        {menu.link.substring(0, 4) === "http" && (
          <Button
            variant="outline"
            style={{
              backgroundColor: theme.palette.primary.main,

              textTransform: "uppercase",
              letterSpacing: 2,
              fontSize: 12,
            }}
            href={menu.link}
            //   onClick={() => menuOpen("myDropdown")}
            onMouseEnter={() => menuOpen(menu.text)}
            //   className="dropbtn"
          >
            {menu.text}
          </Button>
        )}
        {menu.link.substring(0, 1) === "/" && (
          <Link to={menu.link}>
            <Button
              onMouseEnter={() => menuOpen(menu.text)}
              variant="outline"
              style={{
                ...theme.typography.h6,
                backgroundColor: theme.palette.primary.main,

                textTransform: "uppercase",
                letterSpacing: 2,
                // fontSize: 12,
              }}
            >
              {menu.text}
            </Button>
          </Link>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {side &&
            menu.children &&
            menu.children.map((child, index) => {
              return (
                <div key={index}>
                  <a
                    style={{
                      ...theme.typography.h6,
                      whiteSpace: "nowrap",
                      backgroundColor: theme.palette.primary.main,
                      textTransform: "uppercase",
                      textDecoration: "none",
                      // fontSize: ".8em",
                      color: theme.palette.primary.contrastText,
                    }}
                    className="dropbtn"
                    key={index}
                    href={child.link}
                  >
                    {child.text}
                  </a>
                </div>
              );
            })}
        </div>
        {!side && (
          <div
            style={{
              // display: "none",
              border: "1px none yellow",
              // position: "absolute",
              backgroundColor: theme.palette.primary.main,
              top: 0,
              borderRadius: 5,
              boxShadow: theme.shadows[22],
            }}
            id={menu.text}
            className="dropdown-content"
            onMouseLeave={() => closeMenus()}
            onClick={() => closeMenus()}
          >
            {menu.children &&
              menu.children.map((child, index) => {
                return (
                  <a
                    style={{
                      // backgroundColor: theme.palette.primary.main,\
                      ...theme.typography.h6,
                      textTransform: "uppercase",
                      // fontSize: ".8em",
                      lineHeight: "1em",
                      letterSpacing: 2,
                      // color: theme.palette.primary.contrastText,
                    }}
                    className="dropbtn"
                    key={index}
                    href={child.link}
                  >
                    {child.text}
                  </a>
                );
              })}
          </div>
        )}
      </div>
    </Box>
  );
}
