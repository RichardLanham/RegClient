import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "../components/Header";
import ConfirmButtons from "../components/ConfirmButtons";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// import Survey from "./Survey.js";
import { Button, Box } from "@mui/material";

import "../pages/register.css";

import Progress from "../components/Progress";

import { appConfig, _fields, prices } from "../config.js";
import LogoutIcon from "@mui/icons-material/Logout";

import ContactInfo from "../components/ContactInfo.js";

import PPCheckoutConfirmation from "../components/PPCheckoutConfirmation.js";
import PPFallbackCheckoutConf from "../components/PPFallbackCheckoutConf.js";

// import BraintreeDropIn from "../components/BraintreeDropIn.js";

export default function PpCheckout() {
  const [searchParams] = useSearchParams();
  const PayerId = searchParams.get("PayerID");
  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const orderId = searchParams.get("orderId");

  const NODEURL = appConfig.NODEURL; //appConfig.nodeurl;;

  const doUpdate = async (PayerId, paymentId, token, orderId) => {
    const resp = await fetch(`${NODEURL}api/complete/`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
        PayerId: PayerId,
        paymentId: paymentId,
        token: token,
      }),
    })
      .then((response) => {
        console.log(response.ok);
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // resp
  };

  if (PayerId) {
    doUpdate(PayerId, paymentId, token, orderId);
  }

  const theme = useTheme();
  const [showButtons, setShowButtons] = useState(false);

  const [fallbackLabel, setFallbackLabel] = useState("Pay at PayPal");

  const location = useLocation();
  const navigate = useNavigate();
  let { cartItems } = location.state || [];

  const { price } = location.state || prices[0][0];
  const [items, setItems] = useState(cartItems || []);
  const [details, setDetails] = useState(false);
  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const t =
    (items.length > 0 && items.reduce((acc, item) => acc + item.price, 0)) || 0;
  console.log(t);
  const [total, setTotal] = useState(t);

  const THRID_DOMAIN = appConfig.THIRD_DOMAIN;

  const [buttons, setButtons] = useState(null);
  const [paypalLoaded, setPaypalLoaded] = useState(true);

  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    if (PayerId) {
      const response = await fetch(`${NODEURL}api/user-info/${paymentId}/`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });
      const userData = await response.json();
      setUser(userData);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Optional for smooth scrolling
    });
  }, []);
  useEffect(() => {
    items.length > 0 &&
      localStorage.setItem("cartItems", JSON.stringify(items));
  }, []);

  useEffect(() => {
    try {
      const storedItems = JSON.parse(localStorage.getItem("cartItems"));
      setItems(storedItems);
      setTotal(
        (storedItems.length > 0 &&
          storedItems.reduce((acc, item) => acc + item.price, 0)) ||
          0
      );
    } catch (err) {}
    console.log(localStorage.getItem("cartItems"));
  }, []);

  useEffect(() => {
    async function fetchData() {
      await getUserInfo();
    }
    fetchData();
  }, []);

  useEffect(() => {
    let count = 0;
    const checkPayPal = () => {
      count++;
      // console.log(count);
      if (window.paypal) {
        setPaypalLoaded(true);
      } else {
        count > 3 && setPaypalLoaded(false);
      }
    };

    // checkPayPal();

    const intervalId = setInterval(checkPayPal, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setButtons(document.querySelectorAll(".paypal-buttons"));
  }, []);

  useEffect(() => {
    setShowButtons(typeof cartItems === "undefined" ? false : true);
  }, []);

  useEffect(() => {
    try {
      if (items[0].firstname === "") {
        goBack();
      }
    } catch {}
  }, [items]);

  const createOrder = async () => {
    try {
      const response = await fetch(`${NODEURL}api/create-paypal-order`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: items,
          payer: {
            payment_method: {
              credit_card: {
                number: "4111111111111111",
                type: "VISA",
                expire_month: "12",
                expire_year: "2023",
                cvv2: "123",
                first_name: "John",
                last_name: "Doe",
              },
            },
          },
        }),
      });

      const orderData = await response.json();

      if (!orderData.id) {
        const errorDetail = orderData.error_description;

        throw new Error(errorDetail);
      }
      return orderData.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data) => {
    const citems = { items };
    const response = await fetch(
      `${NODEURL}api/orders/${data.orderID}/capture`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: items,
          orderID: data.orderID,
        }),
      }
    );

    const _details = await response.json();

    setDetails(_details);
    setErrorMsg(_details.message);

    if (!_details) {
      return;
    }

    if (!_details.payer) {
      return;
    }
    setEmail(_details.payer.email_address);

    resetItems();

    if (_details.status === "COMPLETED") {
      setTotal(0);
      setItems([]);
    }
  };

  const onError = (error) => {
    // setErrorMsg(error.message);
  };

  const initialOptions = {
    clientId: appConfig.PAYPAL_CLIENT_ID,
  };

  const styles = {
    shape: "rect",
    layout: "vertical",
    width: "100%",
  };
  const goBack = (price) => {
    if (items) {
      navigate("/", {
        state: {
          cartItems: items ? items : [_fields],
        },
      });
    } else {
      navigate("/");
    }
  };
  const BackButton = () => {
    const Contact = () => {
      return (
        <Box>
          <div>If you need help with email us at or </div>
        </Box>
      );
    };
    return (
      <div
        className="noprint"
        style={{ margin: "auto", width: 200, marginTop: 20 }}
      >
        <Button
          style={{
            ...theme.typography.button,
          }}
          onClick={goBack}
        >
          Back to Registration
        </Button>
      </div>
    );
  };

  const resetItems = () => {
    setItems([
      _fields,
      // {
      //   firstname: "",
      //   lastname: "",
      //   email: "",
      //   phone: "",
      //   student: false,
      //   housing: false,
      //   dietary: "omnivore",
      //   price: price,
      //   unit_amount: price,
      //   quantity: 1,
      //   waltzattend: "select...",
      //   name: "Weekend",
      //   event: "Weekend",
      // },
    ]);
    setTotal(0);
  };

  const resetDetails = () => {
    setDetails("");
    resetItems();
  };

  const returnUrl = `https://${THRID_DOMAIN}.louisvillecountrydancers.org/`;
  const cancelUrl = `https://${THRID_DOMAIN}.louisvillecountrydancers.org/`;

  const formAction = appConfig.PAYPAL_ENV;
  const paypalEmail = appConfig.PAYPAL_EMAIL;

  const handlePayment = async () => {
    setFallbackLabel("Waiting for PayPal...");
    setSpinner(true);
    const response = await fetch(`${NODEURL}api/create-fallback-paypal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total, cart: cartItems }),
    });
    const payment = await response.json();
    if (payment.links) {
      setSpinner(false);
      const approvalUrl = payment.links.find(
        (link) => link.rel === "approval_url"
      ).href;
      window.location.href = approvalUrl;
    }
  };

  const [approval, setApproval] = useState(false);

  useEffect(() => {
    if (details.payer) {
      resetItems();
    }
    if (approval === "Approved!") {
      localStorage.setItem("cartItems", "[]");
    }
  }, [approval]);

  const [approveButtonText, setApproveButtonText] = useState("Approve");

  const [spinner, setSpinner] = useState(false);

  const executeFallbackOrder = async (user) => {
    setSpinner(true);
    setApproveButtonText("Waiting for approval...");
    const response = await fetch(
      `${NODEURL}api/execute-fallback-paypal-payment/`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PayerId: PayerId,
          paymentId: paymentId,
          user: user,
        }),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          setApproval("Approved!");
          setSpinner(false);

          setResponse(await response.json());

          // localStorage.setItem("cartItems", "[]");
          // navigate("/", {
          //   state: {},
          // });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [response, setResponse] = useState("");

  const sortEvent = (danceEvent) => {
    // console.log(danceEvent);

    let ret = [];
    try {
      const alaCart = JSON.parse(danceEvent);

      Object.entries(alaCart).map((item) => {
        console.log(item[1]);

        Object.entries(item[1]).map((itm) => {
          // console.log(itm);
          if (itm[1]) {
            console.log(itm[0]);
            ret.push(itm[0]);
          }
        });
        // console.log(ret.join(","));

        //return JSON.stringify(ret);
      });
    } catch (err) {
      // console.log(err);
      return danceEvent;
    }
    return "Ala Carte: " + ret.join(",");
  };
  const doTest = () => {
    const test = sortEvent(
      // '{"alacarte": {"Friday":true,"Saturday":true,"SaturdayNight":true}}'
      "Weekend"
    );
    console.log(test);
  };
  if (!showButtons) {
    //i.e. no cartItems
    const Approval = () => {
      const _cart = localStorage.getItem("cartItems");

      return (
        <div style={{ width: 300, margin: "auto" }}>
          <pre style={{ display: "none" }}>
            {JSON.stringify(response, null, 3)}
          </pre>
          {!response ? (
            <div>
              <div style={{ ...theme.typography.h4 }}>
                Thanks for registering {user?.payer?.payer_info?.first_name}{" "}
                {user?.payer?.payer_info?.last_name}!
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="label">ID</td>
                    <td>{user?.id}</td>
                  </tr>
                  <tr>
                    <td className="label">Email</td>
                    <td>{user?.payer?.payer_info?.email}</td>
                  </tr>
                  <tr>
                    <td className="label">For</td>
                    <td>{user?.transactions[0]?.description}</td>
                  </tr>
                  <tr>
                    <td className="label">Price</td>
                    <td>${user?.transactions[0]?.amount?.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}

          {response ? (
            <PPFallbackCheckoutConf
              response={response}
              sortEvent={sortEvent}
              resetDetails={resetDetails}
            />
          ) : null}

          <div
            style={{
              ...theme.typography.h4,
              backgroundColor: theme.palette.info.main,
              color: theme.palette.info.contrastText,
            }}
          >
            {approval}
          </div>

          <div
            className="noprint"
            style={{
              display: approval ? "block" : "none",
            }}
          >
            <Button
              className="noprint"
              variant="contained"
              onClick={() => window.print()}
            >
              Print
            </Button>
          </div>
          <pre>{JSON.stringify(cartItems, null, 3)}</pre>

          <div
            style={{
              display: approval ? "none" : "block",
            }}
          >
            <div
              style={{
                ...theme.typography.h4,
                boxShadow: theme.shadows[20],
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                marginBottom: 5,
              }}
            >
              To complete this order click Approve
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ display: "flex" }}>
                <Button
                  onClick={() => executeFallbackOrder(user)}
                  style={{
                    ...theme.typography.button,
                    ...theme.typography.h4,
                    boxShadow: theme.shadows[20],
                  }}
                >
                  {approveButtonText}
                </Button>
                <Progress spinner={spinner} />
              </div>
            </div>
          </div>
          <pre style={{ display: "none" }}>{JSON.stringify(user, null, 3)}</pre>
        </div>
      );
    };

    return (
      <Header title="Checkout">
        <div style={{ margin: "auto" }}>
          {PayerId && <Approval />}
          {!PayerId && <h1>Empty Cart</h1>}
          <div>
            <BackButton />
            <ContactInfo />
          </div>
        </div>
      </Header>
    );
  }
  return (
    <Header title="Checkout">
      <Box
        sx={{
          margin: "auto",
          marginTop: {
            // xs: 14,
            // sm: 20,
            // md: 30,
            // lg: 35,
          },
          width: {
            xs: 280,
            sm: 400,
            md: 500,
            lg: 640,
          },
        }}
      >
        {/* <input type="text" />"<button onClick={() => doTest()}>test</button> */}
        <Box
          style={{
            ...theme.typography.h5,
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          }}
        ></Box>
        {details.payer ? (
          <PPCheckoutConfirmation
            details={details}
            resetDetails={resetDetails}
            sortEvent={sortEvent}
          />
        ) : (
          <Box>
            <div>{details.message}</div>
          </Box>
        )}
        <div
          style={{ display: items.length === 0 ? "none" : "block" }}
          className="noprint"
        >
          <div style={{ display: "flex", width: 300, margin: "auto" }}>
            <Box
              sx={(theme) => ({
                ...theme.typography.h4,
                width: 150,
              })}
            >
              Cart
            </Box>
            <ConfirmButtons action={resetItems} label="delete cart" />
          </div>

          <div
            className="cart"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            }}
          >
            <div className="cart-row">First name</div>
            <div className="cart-row">Last name </div>
            <div className="cart-row">Price</div>
          </div>
          {items.map((dancer, index) => {
            return (
              <div key={index}>
                <div
                  className="cart"
                  style={{
                    backgroundColor: theme.palette.info.light,
                    color: theme.palette.info.contrastText,
                  }}
                >
                  <div className="cart-row">{dancer.firstname}</div>
                  <div className="cart-row">{dancer.lastname}</div>
                  <div className="cart-row">{dancer.price}</div>
                </div>
              </div>
            );
          })}
          <div
            style={{
              ...theme.typography.h5,
              width: 300,
              margin: "auto",
              marginBottom: 20,
              marginTop: 20,
              borderBottom: "3px double black",
            }}
          >
            Total ${Number(total).toFixed(2)}
          </div>
        </div>
        {total > 0 && !details && (
          <div style={{ position: "relative" }}>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                className="noprint"
                style={{ ...styles }}
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={(data) => {}}
                onError={onError}
              />
            </PayPalScriptProvider>
          </div>
        )}
        {!paypalLoaded && (
          <div>
            <div
              style={{
                ...theme.typography.h5,
                border: "1px none black",
                borderRadius: 10,
              }}
            >
              <div
                onClick={handlePayment}
                style={{
                  // always display
                  border: `2px solid ${theme.palette.primary.dark}`,
                  padding: 5,
                  display: paypalLoaded ? "block" : "block",
                  float: "left",
                  backgroundColor: theme.palette.grey[200],
                  borderRadius: 5,
                  marginBottom: 20,

                  ...theme.typography.subtitle2,
                }}
              >
                Use this method to pay at the PayPal site. You will be sent back
                here for approval to complete the purchase
                <div style={{ float: "left", display: "flex" }}>
                  <Button
                    style={{
                      ...theme.typography.button,
                    }}
                    onClick={handlePayment}
                  >
                    {fallbackLabel}
                    <LogoutIcon />
                  </Button>
                  <Progress spinner={spinner} />
                </div>
              </div>
            </div>
          </div>
        )}
        {details.payer ? null : (
          <div>
            <BackButton style={{ width: 300, margin: "auto", marginTop: 80 }} />
            <ContactInfo />
          </div>
        )}
      </Box>
    </Header>
  );
}
