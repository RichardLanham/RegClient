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
import "./policy.css";

import { contact } from "../config";

import Header from "../components/Header";

const PrivacyPolicy = () => {
  const theme = useTheme();
  return (
    <Header title="Privacy Policy">
      <div style={{ maxWidth: 800, minWidth: 280, margin: "auto" }}>
        <h1>Privacy Policy</h1>
        <ol>
          <li>
            Introduction
            <ul>
              <li>
                We at Chattanooga Traditional Dance Society are committed to
                protecting your privacy. This Privacy Policy outlines how we
                collect, use, and protect your personal information.
              </li>
            </ul>
          </li>
          <li>
            Information We Collect
            <ul>
              <li>
                Personal Information: We collect the first & last name and email
                address associated with the PayPal account of the purchaser.
              </li>
              <li>
                For additional dancers on an order, we will collect and retain
                first and last name and, if provided, email address and/or phone
                number, solely for event registration and admission purposes,
                including communications, if necessary.
              </li>
              <li>
                All transactions are handled through PayPal or its subsidiary
                Venmo. We do not receive, collect, or retain any payment
                information, except the email address associated with the
                payer's PayPal account.
              </li>
            </ul>
          </li>
          <li>
            How We Use Information
            <ul>
              <li>
                We use the collected information solely for the purposes of
                event registration and communication.
              </li>
            </ul>
          </li>
          <li>
            Data Security
            <ul>
              <li>
                We take appropriate measures to protect the data we retain from
                unauthorized access or disclosure.
              </li>
            </ul>
          </li>
          <li>
            Third-Party Services
            <ul>
              <li>
                All transactions are processed through PayPal or its subsidiary
                Venmo. We do not store payment information.
              </li>
            </ul>
          </li>
          <li>
            User Rights
            <ul>
              <li>
                You have the right to request the deletion of your personal
                information at any time. Please contact us if you wish to
                exercise this right.
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
                  &nbsp;{contact.email}&nbsp;or message {contact.message}
                </pre>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </Header>
  );
};

export default PrivacyPolicy;
