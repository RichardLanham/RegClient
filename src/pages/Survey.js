import React, { useState, useEffect } from "react";

import {
  createTheme,
  // useTheme,
  // styled,
  // ThemeProvider,
} from "@mui/material/styles";

import {
  TextField,
  Button,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Box,
} from "@mui/material";

import { red } from "@mui/material/colors";

import Header from "../components/Header.js";
import { appConfig } from "../config.js";
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Survey(props) {
  // console.log(props);
  const [survey, setSurvey] = useState({
    random: "",
    likert: null,
    email: props.email,
  });
  const [surveyMsg, setSurveyMsg] = useState([]);
  const [surveyStatus, setSurveyStatus] = useState("active");

  const submitSurvey = async () => {
    const _survey = { ...survey };
    _survey.email = _survey.email ? _survey.email : "form";
    _survey.orderid = new Date().toISOString(); //ppDetails.id;

    const msg = [];

    document.getElementById("emailaddress").style.border = "none";
    document.getElementById("likert").style.border = "none";

    if (!_survey.likert) {
      document.getElementById("likert").style.border = "2px solid Red";
      msg.push("select an answer from the scale");
    }

    if (survey.email) {
      if (!emailRegex.test(survey.email)) {
        document.getElementById("emailaddress").style.border = "3px solid Red";
        msg.push("Email invalid");
      }
    }
    //const aCde = localStorage.getItem("accessCode");
    setSurveyMsg(msg);
    if (msg.length > 0) {
      return;
    }
    try {
      const response = await fetch(`${NODEURL}api/survey`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          survey: _survey,
        }),
      });

      const surveyResponse = await response.json();
      console.log(surveyResponse);

      // reset();
      setSurveyStatus("submitted");
      localStorage.setItem("surveyStatus", "submitted");
    } catch (err) {}
  };

  const handleSurvey = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    if (survey[name] !== value) {
      setSurvey({ ...survey, [name]: value });
    }
  };

  const NODEURL = appConfig.NODEURL;

  const theme = createTheme({
    typography: {
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      button: {
        textDecoration: "none",
        backgroundColor: "#51078b",
        color: "#fff",
        padding: 10,

        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1.75,
        textTransform: "capitalize",
        borderRadius: 10,
      },
      button2: {
        textDecoration: "none",
        backgroundColor: "#779279",
        color: "#fff",
        padding: 0,
        paddngTop: 0,
        paddingBottom: 0,

        // fontWeight: 500,
        fontSize: "1em", ///"0.875rem",
        lineHeight: 1.1,
        textTransform: "lowercase",
        borderRadius: 5,
        margin: 0,
        width: "fit-content",
        whiteSpace: "nowrap",
      },
      survey: {
        whiteSpace: "none",
        color: "#fff",
        textDecoration: "none",
        backgroundColor: "#779279",
        padding: 10,

        fontSize: "1.5em", ///"0.875rem",
        lineHeight: 1.5,
        borderRadius: 5,
        margin: 0,
        width: "fit-content",
      },
    },
    palette: {
      primary: {
        main: "#779279",
      },
      secondary: {
        main: "#51078b",
      },
      alert: {
        main: red[500],
        light: red[300],
        dark: red[800],
        contrast: "#002884",
      },
    },
  });

  useEffect(() => {
    const sstatus = localStorage.getItem("surveyStatus");

    if (sstatus === "submitted") {
      setSurveyStatus("submitted");
    }
    // getSurvey();
    // getGrouped();

    return () => {};
  }, []);

  return (
    <Header title="Survey">
      <Box>
        <div sx={{ border: 1 }} className="noprint">
          <div
            style={{
              // margin: 20,
              gap: 5,
              //    border: "1px solid black",
              display: surveyStatus === "active" ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            <div style={{ ...theme.typography.h4 }}>We want your opinion!</div>
            <div
              style={{
                ...theme.typography.survey,
                width: "90%",
                minwidth: 300,
                maxWidth: 600,
              }}
            >
              We are considering holding the{" "}
              <i>
                <b>2026</b>
              </i>{" "}
              Chattaboogie in <u>September</u>
              <p style={{ textDecoration: "underline" }}>
                {" "}
                What do you think about that idea?
              </p>
            </div>

            <div>
              <FormControl component="fieldset">
                <RadioGroup
                  id="likert"
                  style={{
                    minWidth: 300,
                    maxWidth: 400,
                    // margin: "auto",
                    marginBottom: 20,
                    marginTop: 20,
                    // backgroundColor: theme.palette.secondary.main,
                    // color: "#fff",
                  }}
                  name="likert"
                  value={survey.likert}
                  onChange={(event) => handleSurvey(event)}
                  row
                >
                  <FormControlLabel
                    key={5}
                    value="5"
                    control={<Radio />}
                    label="Great Idea"
                  />
                  <FormControlLabel
                    key={4}
                    value="4"
                    control={<Radio />}
                    label="Somewhat like"
                  />
                  <FormControlLabel
                    key={3}
                    value="3"
                    control={<Radio />}
                    label="Neutral"
                  />
                  <FormControlLabel
                    key={2}
                    value="2"
                    control={<Radio />}
                    label="Somewhat dislike"
                  />
                  <FormControlLabel
                    key={1}
                    value="1"
                    control={<Radio />}
                    label="Don't like the idea"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <textarea
              name="random"
              style={{
                width: "50%",
                height: "10vh",
                minWidth: 300,
                maxWidth: 900,
                maxHeight: 300,
                minHeight: 50,
              }}
              placeholder="Use this space to tell us what you think about this -- or any other contra dance topic"
              value={survey.random}
              onChange={(e) => handleSurvey(e)}
            ></textarea>
            <div>
              <TextField
                id="emailaddress"
                style={{ width: 300 }}
                title="email is optiona;"
                label="email is optional"
                name="email"
                value={survey.email}
                onChange={(event) => handleSurvey(event)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <Button
                style={{
                  backgroundColor: theme.palette.secondary.main,
                  color: "#fff",
                }}
                variant="contained"
                onClick={submitSurvey}
              >
                Submit
              </Button>
              <div
                onClick={() => setSurveyMsg([])}
                style={{
                  ...theme.typography.button,
                  backgroundColor: theme.palette.alert.main,
                  display: surveyMsg.length > 0 ? "flex" : "none",
                  flexDirection: "column",
                  gap: 9,
                  color: "#fff",
                  // height: "2em",
                  // lineHeight: "2em",
                }}
              >
                {surveyMsg.map((msg, index) => {
                  return (
                    <div key={index} style={{ ...theme.typography.button2 }}>
                      {msg}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            style={{
              margin: 20,
              gap: 5,
              border: "1px none black",
              display: surveyStatus === "submitted" ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            <h2>Thank you. Your response was submitted</h2>

            <Button
              style={{ width: "fit-content" }}
              variant="contained"
              onClick={() => setSurveyStatus("active")}
            >
              I want to take the survey again
            </Button>
          </div>

          <pre style={{ display: "none" }}>
            {JSON.stringify(survey, null, 3)}
          </pre>
        </div>
      </Box>
    </Header>
  );
}
