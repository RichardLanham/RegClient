import React, { useEffect, useState, useRef } from "react";
import { hostedFields, paypalCheckout } from "braintree-web";
import { appConfig } from "../config";
import "./braintree.css";

function BraintreeHostedFields() {
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const [errors, setErrors] = useState([]); // State for validation errors
  const formRef = useRef(null);
  const paypalButtonRef = useRef(null);

  useEffect(() => {
    const initializeBraintree = async () => {
      const clientToken = await getClientTokenFromServer();

      hostedFields.create(
        {
          authorization: clientToken,
          styles: {
            input: {
              "font-size": "14px",
              color: "#333",
            },
          },
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "4111 1111 1111 1111",
            },
            cvv: { selector: "#cvv", placeholder: "123" },
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

          hostedFieldsInstance.on("validityChange", (event) => {
            const allFieldsAreValid = Object.keys(event.fields).every(
              (key) => event.fields[key].isValid
            );
            setIsPaymentReady(allFieldsAreValid); // Enable Pay Now button
          });
        }
      );

      // Initialize PayPal (if needed)
      paypalCheckout.create(
        {
          authorization: clientToken,
        },
        (err, paypalCheckoutInstance) => {
          if (err) {
            console.error(err);
            return;
          }

          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return paypalCheckoutInstance.createPayment({
                  flow: "checkout",
                  amount: "10.00",
                  currency: "USD",
                });
              },
              onApprove: (data, actions) => {
                return paypalCheckoutInstance
                  .tokenizePayment(data)
                  .then((payload) => {
                    handlePayment(payload.nonce);
                  });
              },
              onCancel: (data) => {
                console.log("PayPal payment canceled", data);
              },
              onError: (err) => {
                console.error("PayPal error", err);
              },
            })
            .render(paypalButtonRef.current);
        }
      );
    };

    initializeBraintree();
  }, []);

  const handlePayment = async () => {
    setErrors([]); // Clear previous errors
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

        console.log("Payment nonce:", payload.nonce);
        const orderData = await createOrder(payload.nonce);
        console.log("Order data:", orderData);
      } catch (error) {
        // Capture and display Braintree validation errors
        if (error.details && error.details.invalidFieldKeys) {
          const fieldErrors = error.details.invalidFieldKeys.map((field) => {
            if (field === "number") return "Invalid credit card number";
            if (field === "cvv") return "Invalid CVV";
            if (field === "expirationDate") return "Invalid expiration date";
            return "Invalid payment details";
          });
          setErrors(fieldErrors);
        } else {
          console.error("Payment error:", error);
        }
      }
    }
  };

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

  const createOrder = async (nonce) => {
    const response = await fetch("/api/btcheckout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payment_method_nonce: nonce,
        payment_method_amount: "10.00",
      }),
    });

    const data = await response.json();
    return data;
  };

  return (
    <div>
      {/* Display validation errors */}
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: "red" }}>
              {error}
            </li>
          ))}
        </ul>
      )}

      {/* Hosted Fields for credit card */}
      <div id="card-number" className="hosted-field"></div>
      <div id="cvv" className="hosted-field"></div>
      <div id="expiration-date" className="hosted-field"></div>

      <button onClick={handlePayment} disabled={!isPaymentReady}>
        Pay Now
      </button>

      {/* PayPal Button */}
      <div ref={paypalButtonRef}></div>
    </div>
  );
}

export default BraintreeHostedFields;
