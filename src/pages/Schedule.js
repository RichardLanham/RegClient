import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import { CSVLink } from "react-csv";
import {
  createTheme,
  useTheme,
  styled,
  alpha,
  ThemeProvider,
} from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import "./schedule.css";

import Header from "../components/Header";

const Schedule = () => {
  const theme = useTheme();

  const StyledInfo = styled("div")({
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    maxWidth: 400,
    minWidth: 250,
    height: "auto",
    margin: "auto",
    padding: 6,
    display: "flex",
    flexDirection: "column",
    fontSize: "1.2em",
    lineHeight: "1.4em",
    gap: 20,
  });

  return (
    <div style={{}}>
      <div
        style={{
          ...theme.typography.h4,
          fontWeight: 800,
          margin: "auto",
          marginBottom: 10,
          width: "fit-content",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          borderRadius: 10,
          padding: 10,
          boxShadow: theme.shadows[10],
        }}
      >
        Chattaboogie 2025 Daily Schedule
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <StyledInfo>
          <div style={{ ...theme.typography.h4 }}>Subject to Change</div>
        </StyledInfo>

        <StyledInfo className="schedule-section">
          <div className="title">Friday (6:00 PM - 11:00 PM)</div>
          <div className="column">
            <div className="row">
              <div className="time">5:30 PM</div>
              <div className="event">Registration Opens</div>
            </div>
            <div className="row">
              <div className="time">6:30 - 7:15 PM</div>
              <div className="event">Waltzing with Kingfisher (KF)</div>
            </div>
            <div className="row">
              <div className="time">7:30 - 9:00 PM</div>
              <div className="event">Contra with Kingfisher (KF)</div>
            </div>
            <div className="row">
              <div className="time">9:15 - 11:00 PM</div>
              <div className="event">Contra with Turnip the Beet (TtB)</div>
            </div>
          </div>
        </StyledInfo>

        <StyledInfo className="schedule-section">
          <div className="title">Saturday (10:00 AM - 11:00 PM)</div>
          <div className="column">
            <div className="row">
              <div className="time">10:00 - 11:30 AM</div>
              <div className="event">
                English Country Dance (Recorded Music)
              </div>
            </div>
            <div className="row">
              <div className="event">Cathy Hollister</div>
            </div>
          </div>
        </StyledInfo>

        <StyledInfo className="schedule-section">
          <div className="title">Saturday Afternoon Contra</div>
          <div className="column">
            <div className="row">
              <div className="time">1:00 - 2:30 PM</div>
              <div className="event">Complex Contra with Kingfisher (KF)</div>
              <div className="event">Tim Klein calling</div>
            </div>
            <div className="row">
              <div className="time">2:45 - 4:15 PM</div>
              <div className="event">
                No Walk Through with Turnip the Beet (TtB)
              </div>
              <div className="event">Vicki Hearndon calling</div>
            </div>
          </div>
        </StyledInfo>

        <StyledInfo className="schedule-section">
          <div className="title">Saturday Evening</div>
          <div className="column">
            <div className="row">
              <div className="time">6:30 - 7:00 PM</div>
              <div className="event">Waltzing with Turnip the Beet (TtB)</div>
            </div>
            <div className="row">
              <div className="time">7:15 - 9:00 PM</div>
              <div className="event">Contra with Turnip the Beet (TtB)</div>
            </div>
            <div className="row">
              <div className="time">9:15 - 11:00 PM</div>
              <div className="event">Contra with Kingfisher (KF)</div>
            </div>
          </div>
        </StyledInfo>

        <StyledInfo className="schedule-section">
          <div className="title">Sunday (10:00 AM - 3:00 PM)</div>
          <div className="column">
            <div className="row">
              <div className="time">10:00 - 10:45 AM</div>
              <div className="event">Waltzing with Turnip the Beet (TtB)</div>
            </div>
            <div className="row">
              <div className="time">11:00 AM - 12:45 PM</div>
              <div className="event">Contra with Turnip the Beet (TtB)</div>
            </div>
            <div className="row">
              <div className="time">1:00 - 3:00 PM</div>
              <div className="event">Contra with Kingfisher (KF)</div>
            </div>
          </div>
        </StyledInfo>

        {/* Add location sections similar to your existing JSX */}
      </div>
    </div>
  );
};

export default Schedule;
