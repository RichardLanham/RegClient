import React, { createContext, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
// import Slide from "@mui/material/Slide";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
import { useTheme, useMediaQuery } from "@mui/material";
// import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Helmet, HelmetProvider } from "react-helmet-async";
// import { red } from "@mui/material/colors";
import DropDown from "./DropDown";

import Policies from "./Policies";
import Footer from "./Footer";

import HideOnScroll from "./HideOnScroll";

import { Link } from "react-router-dom";

require("./header.css");

export default function Header(props) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleLeave = () => {
    console.log("leaving");
    setAnchorEl(false);
  };

  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("closign");
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const menus = ["myDropdown", "myDropdown2"];

  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const bigger = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }, []);

  const menuItems = [
    // {
    //   text: "Home",
    //   link: "https://www.louisvillecountrydancers.org/",
    // },
    // {
    //   text: "Dancing With Us",
    //   link: "https://www.louisvillecountrydancers.org/first-time-1",
    //   children: [
    //     {
    //       text: "First Time?",
    //       link: "https://www.louisvillecountrydancers.org/first-time-1",
    //       external: false,
    //     },
    //     {
    //       text: "Schedule & Location",
    //       link: "https://www.louisvillecountrydancers.org/dance-with-us-1",
    //       extrnal: false,
    //     },
    //     {
    //       text: "Calendar",
    //       link: "https://www.louisvillecountrydancers.org/calendar",
    //     },
    //   ],
    // },
    // {
    //   text: "Follow Us",
    //   link: "https://louisvillecountrydancers.us17.list-manage.com/subscribe?u=00926c5355e581ebf49150412&id=f470676b67",
    //   children: [
    //     {
    //       text: "NewsLetter",
    //       link: "https://louisvillecountrydancers.us17.list-manage.com/subscribe?u=00926c5355e581ebf49150412&id=f470676b67",
    //       external: true,
    //     },
    //     {
    //       text: "FaceBook",
    //       link: "https://www.facebook.com/louisvillecountrydancers/",
    //       extrnal: true,
    //     },
    //     {
    //       text: "Instagra",
    //       link: "https://www.instagram.com/louisvillecountrydancers/",
    //       external: true,
    //     },
    //   ],
    // },
    // {
    //   text: "Our Organization",
    //   link: "https://www.louisvillecountrydancers.org/board",
    //   children: [
    //     {
    //       text: "Board of Directors",
    //       link: "https://www.louisvillecountrydancers.org/board",
    //       external: false,
    //     },
    //     {
    //       text: "ByLaws",
    //       link: "https://www.louisvillecountrydancers.org/bylaws",
    //       extrnal: false,
    //     },
    //     {
    //       text: "Board Meeting Minutes",
    //       link: "https://www.louisvillecountrydancers.org/minutes",
    //       external: false,
    //     },
    //     {
    //       text: "Code of Conduct",
    //       link: "https://www.louisvillecountrydancers.org/code-of-conduct",
    //     },
    //     {
    //       text: "Contact Us",
    //       link: "https://www.louisvillecountrydancers.org/contact",
    //     },
    //   ],
    // },
    {
      text: "Chattaboogie Registration",
      link: "/",
      children: [
        {
          text: "Chattaboogie Registration",
          link: "/",
        },
        {
          text: "Chattaboogie Schedule",
          link: "/schedule2024",
        },
        {
          text: "Dancers",
          link: "/dancers",
        },
      ],
    },
    // {
    //   text: "Chattaboogie Weekend",
    //   link: "/",
    //   children: [
    //     {
    //       text: "Fling Registration",
    //       link: "/",
    //     },
    //     {
    //       text: "Fling Schedule",
    //       link: "/schedule2024",
    //     },
    //   ],
    // },
  ];

  const menuItemsMulti = [
    { text: "Home", link: "#home" },
    {
      text: "Dancing With Us",
      menuItems: [
        { text: "First Time", link: "linkhere" },
        { text: "Schedule and Location", link: "anotherlink" },
      ],
    },
    { text: "Playing Music", link: "#schedule" },
    { text: "Contact", link: "#contact" },
  ];

  const closeMenus = () => {
    // console.log("Close MENUS");
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  };

  return (
    <HelmetProvider>
      <div style={{ border: "2px none yellow", margin: 6 }}>
        <Helmet>
          <title>{"CTDS " + props.title}</title>
          <link rel="canonical" href="https://register.contranooga.us/" />
          <link rel="icon" href="/" />
        </Helmet>
        <HideOnScroll scroll={props.scroll} {...props}>
          <AppBar
            className="noprint"
            id="AppBar"
            position="fixed"
            // color="primary"
            sx={{
              backgroundImage: "url(/banner.webp)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: 311, // Set height to match the image's height if needed
              width: "100%",
              padding: 0,
              height: {
                xs: 80,
                // theme.spacing(1) for extra small screens
                // sm: "none", // theme.spacing(2) for small screens
                // md: "none", // theme.spacing(3) for medium screens
                lg: 250,
                // marginTop: 4,
                // marginLeft: 14, // theme.spacing(4) for large screens
                // xl: "none", // theme.spacing(5) for extra-large screens
              },
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <div
              id="Container"
              sx={{
                // margin: "auto",
                // marginLeft: 200,
                // marginRight: 0,
                margin: 0,
                padding: 0,
                display: "flex",
                border: "1px solid black",
                width: "fit-content",
              }}
            >
              <Toolbar
                style={{
                  border: "4px none yellow",
                  margin: 0,
                  padding: 0,
                  //   width: "fit-content",
                  //   position: "relative",
                  // paddingTop: 0,
                  position: "relative",
                }}
              >
                <a
                  href="https://contranooga.us/"
                  style={{
                    // color: "#fff",

                    fontSize: "1em",
                    position: "absolute",
                    margin: 0,
                    padding: 0,
                    left: 0,
                    top: 0,

                    textDecoration: "none",
                  }}
                >
                  <Box
                    // className="box"
                    sx={{
                      ...theme.typography.h6,
                      // backgroundImage: "url('/banner2.png')",
                      // opacity: 0.2,
                      // backgroundColor: "rgba(255,0,0,0.6)",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      // backgroundColor: theme.palette.primary.contrastText,
                      color: theme.palette.info.dark,
                      margin: 0.1,
                      padding: {
                        xs: 0,
                        sm: 0.5,
                      },

                      borderRadius: 1,
                      margin: 1,
                      marginTop: {
                        xs: 3,
                        // marginTop: 34, // theme.spacing(1) for extra small screens
                        // sm: "none", // theme.spacing(2) for small screens
                        // md: "none", // theme.spacing(3) for medium screens
                        lg: 1,
                        // marginTop: 4,
                        // marginLeft: 14, // theme.spacing(4) for large screens
                        // xl: "none", // theme.spacing(5) for extra-large screens
                      },
                      width: {
                        xs: 500,
                        sm: 500,
                        md: 500,
                        lg: 200,
                        xl: 200,
                        // xl: 300,
                        // marginTop: 4,
                        // marginLeft: 14, // theme.spacing(4) for large screens
                        // xl: "none", // theme.spacing(5) for extra-large screens
                      },
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        position: "relative",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Box
                        sx={(theme) => ({
                          width: 300,
                          fontWeight: "bold",
                          position: "absolute",

                          letterSpacing: 4,
                          fontSize: "1.8em",
                          lineHeight: "1.5em",
                          left: 0,
                          top: 0,
                          opacity: 1,
                          color: theme.palette.primary.contrastText,
                          // width: 350,
                          // backgroundColor: "yellow",
                          [theme.breakpoints.down("lg")]: {
                            width: "100vw",
                            letterSpacing: 2,
                            fontSize: "1.2em",
                            lineHeight: ".9em",

                            // width: 250,
                            // backgroundColor: "green",
                            // ...theme.typography.h2,
                          },
                        })}
                      >
                        Chattanooga Traditional Dance Society
                      </Box>
                    </div>
                  </Box>
                </a>
                {/* Desktop Menu */}
                <Box
                  sx={{
                    position: "relative",
                    marginLeft: 50,
                    marginTop: 9,
                    display: {
                      xs: "none",
                      lg: "flex",
                      flexWrap: "wrap",

                      paddingTop: 3,
                    },
                    border: "2px none blue",
                  }}
                >
                  {menuItems.map((menu, index) => {
                    return (
                      <DropDown
                        side={false}
                        key={index}
                        menu={menu}
                        closeMenus={closeMenus}
                      />
                    );
                  })}

                  <a
                    href="/event?header=true"
                    style={{
                      display: "none",

                      fontWeight: 400,
                      fontSize: 13,
                      fontStyle: "normal",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      textDecoration: "none",
                      marginLeft: "1em",
                      //   padding: "1em 1.5em 1em 1.5em !important",
                      // display: "block",
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                      borderRadius: 300,
                      //   position: "absolute",
                      //   right: 0,
                      padding: "10px 20px 10px 20px",
                    }}
                  >
                    Chattaboogie Weekend
                  </a>
                  <pre style={{ display: "none" }}>
                    {JSON.stringify(theme.typography.menuitem, null, 3)}
                  </pre>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 5000,
                      top: {
                        xs: -30, // theme.spacing(1) for extra small screens
                        // sm: -45, // theme.spacing(2) for small screens
                        // md: -35, // theme.spacing(3) for medium screens
                        // lg: 0, // theme.spacing(4) for large screens
                        // xl: 0, // theme.spacing(5) for extra-large screens
                      },
                    }}
                  >
                    <Policies />
                  </Box>
                </Box>
                {/* Mobile Menu Button */}
                <Box
                  sx={{
                    display: {
                      position: "absolute",
                      left: 0,
                      top: 0,
                      xs: "flex",
                      lg: "none",
                    },
                  }}
                >
                  <Policies />
                </Box>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{
                    display: {
                      position: "fixed",
                      right: 0,
                      xs: "flex",
                      lg: "none",
                    },
                  }}
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </div>
          </AppBar>
        </HideOnScroll>
        <Box
          sx={{
            width: "100%",
            padding: 0,
            height: {
              xs: 85,
              // theme.spacing(1) for extra small screens
              // sm: "none", // theme.spacing(2) for small screens
              // md: "none", // theme.spacing(3) for medium screens
              lg: 255,
              // marginTop: 4,
              // marginLeft: 14, // theme.spacing(4) for large screens
              // xl: "none", // theme.spacing(5) for extra-large screens
            },
          }}
        ></Box>
        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: "flex", lg: "none" } }}
        >
          <Box
            sx={{
              width: 300,
              backgroundColor: theme.palette.primary.dark,
              height: "100vh",
            }}
            role="presentation"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
          >
            <div style={{ position: "absolute", left: -20 }}>X</div>
            <List>
              {menuItems.map((menu, index) => {
                // console.log(menu);
                return (
                  <DropDown
                    side={true}
                    key={index}
                    menu={menu}
                    closeMenus={closeMenus}
                  />
                );
              })}
            </List>
            <Divider />
          </Box>
          <Box>
            <Policies />
          </Box>
        </Drawer>
        {props.children}
      </div>
      <Footer />
    </HelmetProvider>
  );
}
