import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./register.css";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import EventInfo from "../components/EventInfo.js";
import { appConfig } from "../config.js";
const NODEURL = appConfig.NODEURL;

export default function Register() {
  const location = useLocation();
  const { cartItems } = location.state || {};
  // console.log(cartItems);
  return (
    <Header scroll={false} title="Registration">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,

          margin: "auto",
        }}
        className="App"
      >
        <EventInfo />
        <RegisterForm cartItems={cartItems} />
      </div>
    </Header>
  );
}
