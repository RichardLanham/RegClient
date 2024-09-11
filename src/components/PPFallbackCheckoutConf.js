import React from "react";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { appConfig } from "../config.js";

const PPFallbackCheckoutConf = ({ response, sortEvent, resetDetails }) => {
  const theme = useTheme();
  if (!response) {
    return;
  }
  // Extract relevant data from payment
  const payerInfo = response.payer.payer_info;
  const transaction = response.transactions[0];
  const shippingAddress = payerInfo.shipping_address;

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
      <b>Confirmation sent to:</b>
      <ul style={{ marginTop: 0 }}>
        <li>{payerInfo.email}</li>
      </ul>

      <div>
        <div>Order ID: {response.id}</div>
        <div>Payment: ${transaction.amount.total}</div>
        <div>
          From: {payerInfo.first_name} {payerInfo.last_name}
        </div>
        <div>
          Shipping Address: {shippingAddress.line1}, {shippingAddress.city},{" "}
          {shippingAddress.state} {shippingAddress.postal_code},{" "}
          {shippingAddress.country_code}
        </div>

        <div>Dancer(s)</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {transaction.item_list.items.map((item, index) => (
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
                  <div>{item.description}</div>
                </div>
                <div className="cart-row2">
                  <div>Price: </div>
                  <div>${item.price}</div>
                </div>
                <div className="cart-row2">
                  <div>Quantity: </div>
                  <div>{item.quantity}</div>
                </div>
                <div className="cart-row2">
                  <div>Event: </div>
                  <div>{sortEvent(item.name)}</div>
                </div>
              </div>
            </div>
          ))}
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

export default PPFallbackCheckoutConf;
