import React, { useEffect, useState, useRef } from "react";
import { hostedFields, paypalCheckout } from "braintree-web";
import { appConfig } from "../config";

import "./braintree.css";

function BraintreeHostedFields() {
  const [isPaymentReady, setIsPaymentReady] = useState(false); // Controls Pay Now button
  const [address, setAddress] = useState(""); // Example non-sensitive field
  const formRef = useRef(null);

  useEffect(() => {
    // Initialize Braintree Hosted Fields
    const initializeBraintree = async () => {
      const clientToken = await getClientTokenFromServer(); // Fetch client token from server

      hostedFields.create(
        {
          authorization: clientToken,
          styles: {
            input: {
              "font-size": "26pt",
              color: "green",
              height: "10px",
            },
            ".number": {
              "font-family": "monospace",
            },
            ".valid": {
              color: "green",
            },
          },
          paypal: {
            flow: "checkout", // Use 'vault' for one-time payments
            amount: "10.00",
            currency: "USD",
          },
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "4111 1111 1111 1111",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "123",
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: "MM/YY",
            },
          },
        },
        (err, hostedFieldsInstance) => {
          if (err) {
            console.error(err);
            return;
          }

          formRef.current = hostedFieldsInstance;

          // Detect validity changes for Hosted Fields
          formRef.current.on("validityChange", (event) => {
            const formIsValid = Object.keys(event.fields).every(
              (key) => event.fields[key].isValid
            );
            setIsPaymentReady(formIsValid); // Enable Pay Now button only when fields are valid
          });
        }
      );
    };

    initializeBraintree();

    return () => {
      if (formRef.current) {
        formRef.current.teardown(() => {
          formRef.current = null;
        });
      }
    };
  }, []);

  const getClientTokenFromServer = () => {
    return fetch(`${appConfig.NODEURL}api/get-bt-client-token`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch client token");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.clientToken) {
          return data.clientToken;
        } else {
          throw new Error("No client token in response");
        }
      })
      .catch((err) => {
        console.log(err);
        throw err; // Rethrow the error to propagate it to the caller
      });
  };

  const handlePayment = async () => {
    if (formRef.current) {
      try {
        const payload = await new Promise((resolve, reject) => {
          formRef.current.tokenize((err, payload) => {
            if (err) {
              reject(err);
            } else {
              resolve(payload);
            }
          });
        });

        console.log("Payment payload:", payload); // Contains the nonce
        const orderData = await createOrder(payload.nonce);
        console.log("Order data:", orderData);
      } catch (error) {
        console.error("Error in handlePayment:", error);
      }
    }
  };

  const createOrder = async (nonce) => {
    const response = await fetch("/api/btcheckout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment_method_nonce: nonce,
        payment_method_amount: "10.00", // Replace with dynamic amount
        billing_address: address, // Non-sensitive data
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Transaction failed");
    }
  };

  // Handler for non-sensitive fields
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div style={{ margin: 20 }}>
      {/* Hosted Fields for sensitive payment details */}
      <div
        style={{
          width: 300,
          height: 300,
          padding: 20,
          border: "4px solid black",
        }}
      >
        <div id="card-number" className="hosted-field"></div>
        <div id="cvv" className="hosted-field"></div>
        <div id="expiration-date" className="hosted-field"></div>
      </div>
      {/* Example of handling non-sensitive fields */}
      <input
        type="text"
        placeholder="Billing Address"
        value={address}
        onChange={handleAddressChange} // Standard React onChange handler
      />

      {/* Pay Now button is enabled only if Hosted Fields are valid */}
      <button onClick={handlePayment} disabled={!isPaymentReady}>
        Pay Now
      </button>
    </div>
  );
}

export default BraintreeHostedFields;
