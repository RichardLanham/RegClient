import React from "react";
import Header from "../components/Header";
import CollapsedNote from "../components/CollapsedNote";
import // Checkbox,
// FormControlLabel,
// FormGroup,
// Select,
// MenuItem,
//   Button,
"@mui/material";
import { useTheme, styled } from "@mui/material/styles";

const About = () => {
  const theme = useTheme();

  const StyledInfo = styled("div")(({ theme }) => ({
    flex: 1,
    border: "2px solid black",
    borderRadius: 5,
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.down("xl")]: {
      flex: 1,
    },
    [theme.breakpoints.down("lg")]: { width: "45vw" },
    [theme.breakpoints.down("md")]: {
      width: "90vw",
    },
  }));

  const StyledBullet = styled("li")(({ theme }) => ({
    width: "fit-content",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    margin: 5,
  }));

  const StyledLink = styled("a")(({ theme }) => ({
    width: "fit-content",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    margin: 5,
    textDecoration: "none", // Optionally remove underline for all states

    // Pseudo-classes
    "&:hover": {
      color: theme.palette.primary.dark, // Change color on hover
      backgroundColor: theme.palette.primary.contrastText,
    },
    // "&:active": {
    //   color: theme.palette.error.main, // Color when the link is active (clicked)
    // },
    // "&:visited": {
    //   color: theme.palette.primary.contrastText, // Color for visited links
    // },
  }));

  return (
    <Header title="About">
      <h1 style={{ width: 200, margin: "auto" }}>About</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          // backgroundColor: theme.palette.grey[50],
        }}
      >
        <StyledInfo>
          <h2>Stack</h2>
          <ol style={{ display: "flex", flexWrap: "wrap", gap: 50 }}>
            <li>
              React 18.3.1
              <ul sx={{ display: "flex", flexWrap: "wrap", width: 300 }}>
                <StyledBullet>@paypal/react-paypal-js 8.5.0</StyledBullet>
                <StyledBullet>react-router-dom</StyledBullet>
                <StyledBullet>@mui* 5.16.7</StyledBullet>
                <StyledBullet>react-csv 2.2.2</StyledBullet>
                <StyledBullet>react-player 2.16.0</StyledBullet>
                <StyledBullet>axios</StyledBullet>
                <StyledBullet>react-helmet-async 2.0.5</StyledBullet>
              </ul>
            </li>
            <li>
              Node 18.13/Express
              <ul style={{ display: "flex", flexWrap: "wrap", width: 300 }}>
                <StyledBullet>@sendgrid/mail: ^8.1.3</StyledBullet>
                <StyledBullet>axios: ^1.7.5</StyledBullet>
                <StyledBullet>braintree: ^3.24.0</StyledBullet>
                <StyledBullet>express: ^4.19.2</StyledBullet>
                <StyledBullet>node-fetch: ^3.3.2</StyledBullet>
                <StyledBullet>paypal-rest-sdk: ^1.8.1</StyledBullet>
                <StyledBullet>pg: ^8.12.0</StyledBullet>
              </ul>
            </li>
            <li>PostgreSql 14.3</li>
            <li>PayPay v2 sdk (primary [sandbox])</li>
            <li>PayPay v1 sdk (fallback [sandbox])</li>
            <li>Braintree v3 sdk (in progress [sandbox])</li>
          </ol>
        </StyledInfo>
        <StyledInfo>
          <h2>Outline</h2>
          <h3>Pages (routes)</h3>
          <ol>
            <li>
              <a href="/">/&nbsp;(register)</a> registration, site root
              <ul>
                <StyledBullet>
                  /components/registerForm (registration, what user sees at site
                  root)
                </StyledBullet>
                <ul>
                  <StyledBullet>
                    /components/DancerFormField (fields)
                  </StyledBullet>
                </ul>
              </ul>
            </li>
            <li>
              <a href="/checkout">/checkout</a> payment
              <CollapsedNote
                prompt="..."
                note="registration and checkout interact useNavigation and useLocation"
              />
              <ul>
                <StyledBullet>PayPalScriptProvider</StyledBullet>
                <ul>
                  <StyledBullet>PayPalButtons</StyledBullet>
                </ul>

                <StyledBullet>PayPal v1 fallback</StyledBullet>
              </ul>
            </li>
            <li>
              <a href="/dancers">/dancers</a> list of dancers (access-code wall)
              <ul>
                <StyledBullet>
                  /components/DancerFormField (add a dancer)
                </StyledBullet>
                <StyledBullet>/components/DancerRow (each dancer)</StyledBullet>
                <ul>
                  <StyledBullet>
                    /components/DancerForm (inline form to update and delete)
                  </StyledBullet>
                  <ul>
                    <StyledBullet>
                      /components/DancerFormField (fields)
                      <CollapsedNote prompt="..." note="some more info" />
                    </StyledBullet>
                  </ul>
                </ul>
              </ul>
            </li>
          </ol>
        </StyledInfo>
        <StyledInfo>
          <h3>Github (private)</h3>
          <ul>
            <StyledBullet>
              <div style={{ display: "block" }}>
                <b>Frontend (React)</b>
              </div>
            </StyledBullet>
            <StyledBullet>
              <StyledLink
                target="_new"
                href="https://github.com/RichardLanham/CTDSRegClient.git"
              >
                RichardLanham/CTDSRegClient.git
              </StyledLink>
            </StyledBullet>
            <StyledBullet>
              <div style={{ display: "block" }}>
                <b>Server (node/postgres)</b>
              </div>
            </StyledBullet>
            <StyledBullet>
              <StyledLink
                target="_new"
                href="https://github.com/RichardLanham/CTDSRegServer.git"
              >
                RichardLanham/CTDSRegServer.git
              </StyledLink>
            </StyledBullet>
          </ul>
        </StyledInfo>
      </div>
    </Header>
  );
};

export default About;
