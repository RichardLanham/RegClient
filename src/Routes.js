import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import Dancers from "./pages/Dancers";
import Register from "./pages/Register";
import SurveyResults from "./pages/SurveyResults";
import Survey from "./pages/Survey";
import Test from "./pages/Test";
import About from "./pages/About";

import UserAgreement from "./pages/UserAgreement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Schedule2024 from "./pages/Schedule2024";
import Schedule from "./pages/Schedule"; // same as above but no header. useful for iframes
import PpCheckout from "./pages/PpCheckout";
import PayPalReturn from "./pages/PayPalReturn"; // no in use 09-07-24
// import PayPalAltCheckOut from "./pages/PayPalAltCheckOut";
import Braintree from "./pages/Braintree";

import Theme from "./Theme";

import MuiSize from "./components/MuiSize";

import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";

export default function App() {
  <Theme />;

  return (
    <Router>
      <Theme>
        <MuiSize />
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dancers" element={<Dancers />} />
          <Route path="/surveyresults" element={<SurveyResults />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/test" element={<Test />} />
          <Route path="/user-agreement" element={<UserAgreement />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/schedule2024" element={<Schedule2024 />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/checkout" element={<PpCheckout />} />
          <Route path="/return" element={<PayPalReturn />} />
          <Route path="/braintree" element={<Braintree />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Theme>
    </Router>
  );
}
