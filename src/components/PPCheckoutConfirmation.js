import React from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { appConfig } from "../config.js";
const PPCheckoutConfirmation = ({ details, sortEvent, resetDetails }) => {
  const theme = useTheme();
  return (
    <div
      sx={{
        display: "block",
        width: {
          xs: 280,
          sm: 450,
          lg: 800,
        },
        margin: "auto",
        border: "1px solid black",
      }}
    >
      <div>
        <Button
          className="noprint"
          variant="contained"
          onClick={() => window.print()}
        >
          Print
        </Button>
      </div>
      <h2>Thank you for registering!</h2>
      <b>Confirmation sent to</b>
      <ul style={{ marginTop: 0 }}>
        <li>{details.payer.email_address}</li>
        {details.cartItems.map((item, index) => {
          if (item.email !== details.payer.email_address) {
            if (item.email) {
              return <li key={index}>{item.email}</li>;
            }
          }
        })}
      </ul>

      <div>
        <div>OrderID: {details.id}</div>
        <div>
          Payment: $
          {details.purchase_units[0].payments.captures[0].amount.value}
        </div>
        <div>
          From: {details.payer.name.given_name} {details.payer.name.surname}
        </div>

        <div>Dancer(s)</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {details.cartItems.map((line, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${appConfig.HOME}ticket.jpg)`,
                  backgroundColor: theme.palette.grey[100],
                  backgroundSize: "cover",
                  margin: 20,
                  padding: 5,
                  borderRadius: 10,
                  position: "relative",
                  width: 479,
                  height: 196,
                }}
              >
                <div style={{ backgroundColor: "#fff", width: 200 }}>
                  <div className="cart-row2">
                    <div>Name: </div>
                    <div>
                      {line.firstname} {line.lastname}{" "}
                    </div>
                  </div>
                  <div className="cart-row2">
                    <div>Student: </div>
                    <div>{line.student ? "yes" : "no"}</div>
                  </div>
                  <div className="cart-row2">
                    <div>Diet Pref: </div>
                    <div>{line.dietary} </div>
                  </div>
                  <div className="cart-row2">
                    <div>Paid: </div>
                    <div>${line.price}</div>
                  </div>
                  <div className="cart-row2">
                    <div>Event: </div>
                    <div> {sortEvent(line.event)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="noprint">
          <Button
            style={{ ...theme.typography.h4, margin: 10 }}
            variant="contained"
            color="secondary"
            onClick={resetDetails}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PPCheckoutConfirmation;
