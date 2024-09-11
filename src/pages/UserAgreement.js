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

import { Link } from "react-router-dom";

import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import "./policy.css";

import { contact } from "../config";

import Header from "../components/Header";

const m = (id) => {
  console.log("OK");
  const email = document.getElementById(id).textContent;
  navigator.clipboard.writeText(email).then(() => {
    alert("Email address copied to clipboard");
  });
};
const UserAgreement = () => {
  const theme = useTheme();
  return (
    <Header title="User Agreement">
      <div style={{ maxWidth: 800, minWidth: 280, margin: "auto" }}>
        <h1>User Agreement</h1>
        <ol>
          <li>
            Welcome to Chattanooga Traditional Dance Society (CTDS)
            <ul>
              <li>
                By using this website to register and pay for this year's Fling,
                you agree to the following terms and conditions.
              </li>
            </ul>
          </li>

          <li>
            Payment and Registration:
            <ul>
              <li>
                All payments are processed through PayPal or its subsidiary
                Venmo.
              </li>
              <li>
                We never handle, store, or retain any payment information.
              </li>
              <li>
                Upon successful payment, you will receive a confirmation email
                with details about the event.
              </li>
              <li style={{ fontWeight: "bold" }}>
                Registrations are not transferrable!
              </li>
            </ul>
          </li>

          <li>
            Cancellations, Refunds & COVID Policy
            <ul>
              <li>
                If you think you or anyone in your household has COVID, if you
                are experiencing COVID symptoms, or if you have been exposed to
                COVID shortly before the dance, we encourage you to stay home.
                We will give you a full refund.
              </li>
              <li>
                You may cancel your registration up to a month before the dance
                (through Oct 15th) and receive a full refund.
              </li>
              <li>
                Cancellation between one month and 7 days (Oct 16th through Nov
                8th) before the dance will be a $10 charge
              </li>
              <li>
                Cancellation less than 7 days (after Nov 8th) before the dance
                will be a $20 charge
              </li>
            </ul>
          </li>
          <li>
            Use of Personal Information
            <ul>
              <li>
                We collect the first & last name, and the email address
                associated with the PayPal account of the purchaser for the
                purpose of event registration and communication, if necessary.
              </li>
              <li>
                For additional dancers, we will also collect and retain email
                addresses and phone numbers if provided, solely for event
                registration and admission purposes, including communicaton, if
                neccessary.
              </li>
              <li>
                Please refer to our{" "}
                <Link to="/privacy-policy">Privacy Policy</Link> for more
                information on how we handle your data.
              </li>
            </ul>
          </li>
          <li>
            Liability
            <ul>
              <li>
                CDTS is not responsible for any personal injuries or lost items
                that may occur during the event.
              </li>
              <li>
                CTDS is not responsible for problems arising from or related to
                PayPal or its subsidiary Venmo.
              </li>
            </ul>
          </li>
          <li>
            Changes to Terms
            <ul>
              <li>
                We reserve the right to update or change these terms at any
                time. Any changes will be posted on this page.
              </li>
            </ul>
          </li>
          <li>
            Contact Information
            <ul>
              <li>
                If you have any questions about these terms, please contact us
                at{" "}
                <div>
                  <pre style={{ display: "inline" }}>&nbsp;{contact.email}</pre>
                </div>
              </li>
              <li>
                If you have problems with this website please send email to
                <pre style={{ display: "inline" }}>
                  &nbsp;{contact.email}
                  &nbsp;or message {contact.message}
                </pre>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </Header>
  );
};

export default UserAgreement;
