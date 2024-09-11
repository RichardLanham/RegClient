import React, { useEffect, useState, useRef } from "react";
import dropin from "braintree-web-drop-in";
import { appConfig } from "../config";

function BraintreeDropIn() {
  const braintreeRef = useRef(null);

  // useEffect(() => {
  //   if (userHasReturnedFromPayPal) {
  //     handleReview();
  //   }
  // }, [userHasReturnedFromPayPal]); // userHasReturnedFromPayPal is a flag that tracks PayPal flow

  useEffect(() => {
    console.log(dropin);
  }, []);

  useEffect(() => {
    const initializeBraintree = async () => {
      const clientToken = await getClientTokenFromServer();

      console.log(clientToken);

      dropin.create(
        {
          authorization: clientToken,
          container: braintreeRef.current,
          paypal: {
            flow: "checkout",
            amount: "10.00", // dynamically set this
            currency: "USD",
          },
        },
        (err, instance) => {
          if (err) {
            console.error(err);
            return;
          }

          braintreeRef.current = instance;
        }
      );
    };

    initializeBraintree();

    return () => {
      if (braintreeRef.current) {
        braintreeRef.current.teardown(() => {
          braintreeRef.current = null;
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

  const handleReview = async () => {
    if (braintreeRef.current) {
      try {
        // Capture the payment method when they return from PayPal
        const payload = await new Promise((resolve, reject) => {
          braintreeRef.current.requestPaymentMethod((err, payload) => {
            if (err) {
              reject(err);
            } else {
              resolve(payload);
            }
          });
        });

        // Capture the PayPal email or other payment method details
        const paymentMethodInfo = {
          method: payload.type,
          email: payload.details.email, // For PayPal, get the email
        };

        // Show a review modal or confirmation to the user
        // setReviewInfo(paymentMethodInfo); // Save the payment method info in state
        // setShowReviewModal(true); // Show a review modal (or any other UI)
      } catch (error) {
        console.error("Error capturing payment method:", error);
      }
    }
  };

  const handlePayment = async () => {
    if (braintreeRef.current) {
      try {
        const payload = await new Promise((resolve, reject) => {
          braintreeRef.current.requestPaymentMethod((err, payload) => {
            if (err) {
              reject(err);
            } else {
              resolve(payload);
            }
          });
        });

        const orderData = await createOrder(payload.nonce);
        console.log("Order data:", orderData); // This is where you read the return data
        onApprove(orderData); // Passing the order data to onApprove
      } catch (error) {
        console.error("Error in handlePayment:", error);
      }
    }
  };

  // router.post("/api/btcheckout", (req, res) => {
  //
  const [order, setOrder] = useState({});

  const createOrder = async (nonce) => {
    try {
      const response = await fetch(`${appConfig.NODEURL}api/btcheckout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method_nonce: nonce,
          payment_method_amount: "10.00", // Replace with your amount
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || "Transaction failed");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const onApprove = (data) => {
    console.log("Payment successful:", data);
    // Handle post-payment steps here
  };

  return (
    <div style={{ display: "block" }}>
      <button onClick={handleReview}>Review Order</button>
      <div ref={braintreeRef}></div>
      <button onClick={handlePayment}>Pay Now</button>

      <pre>{JSON.stringify(order, null, 3)}</pre>
    </div>
  );
}

export default BraintreeDropIn;
