import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import { Button, Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import "./dancers.css";
import { appConfig, prices, _fields } from "../config.js";
import Schedule from "../pages/Schedule";
import Playlist from "./Playlist";
import ContactInfo from "./ContactInfo";
import EventOptions from "./EventOptions";
import DancerFormField from "./DancerFormField.js";

const NODEURL = appConfig.NODEURL;

export default function RegisterForm(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const earlyBirdDate = new Date(appConfig.EARLYBIRDDATE);
  const isEarlyBird = earlyBirdDate > new Date();

  const [price] = useState(isEarlyBird ? prices[0][0] : prices[0][1]);
  const [studentPrice] = useState(isEarlyBird ? prices[0][0] : prices[0][0]);
  const [total, setTotal] = useState(price);
  const [showForm, setShowForm] = useState(true);

  const [loc, setLoc] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [showDoc, setShowDoc] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const usPhoneNumberRegex =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  const [valMsg, setValMsg] = useState({});
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const allowed = [
      "192.168.1.66:3008",
      "localhost:3008",
      "staging.contranooga.us",
    ];
    // setLoc(allo.find((el)=>{el===window.location.host})//window.location.host);
    setLoc(allowed.some((el) => el === window.location.host));
    // // console.log(allowed.some((el) => el === window.location.host));
    // // console.log(loc);
  }, []);

  useEffect(() => {
    if (loc && fields.length === 1 && fields[0].firstname === "") {
      const locFields = { ..._fields };
      locFields.firstname = "richard";
      locFields.lastname = "lanham";
      locFields.email = "richard.lanham@gmail.com";
      setFields([locFields]);
    }
  }, [loc]);

  const factr = isEarlyBird ? 0 : 2;

  const choices = Object.entries(prices);

  useEffect(() => {
    // this is what fixed the return problem, where student change made price 0
    if (props.cartItems) {
      try {
        const _choices = JSON.parse(props.cartItems[0].event).alacart || [];
      } catch (err) {}

      props.cartItems.map((item, index) => {
        try {
          const ala = JSON.parse(item.event);
          updateEventAlaCarte(index, ala["alacarte"]);
        } catch (err) {}
      });
    }
  }, []);

  const [renderer, setRenderer] = useState("");
  const [fields, setFields] = useState(
    props.cartItems ? props.cartItems : [_fields]
  );

  const selectChange = (index, event) => {
    if (showPlayer) {
      closePlayer();
    }
    // console.log("selectChange");
    const newFields = [...fields];
    newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };

  const resetChange = (index) => {
    // console.log("resetChange");

    const newFields = [...fields];

    const p =
      prices[choices[0][0]][
        newFields[index]["student"] ? 1 + factr : 0 + factr
      ];
    newFields[index]["event"] = choices[0][0];
    newFields[index]["price"] = p;
    newFields[index]["unit_amount"] = p;

    const totalAmount = newFields
      .reduce((total, item) => total + item.price * 1, 0)
      .toFixed(2);

    setTotal(totalAmount);
    setFields(newFields);
  };

  const handleChange = (event, index) => {
    try {
      const newFields = [...fields];
      if (event.target.name === "housing") {
        document.getElementById(`email${index}-label`).innerHTML =
          "Email (optional)";
        document.getElementById(`phone${index}-label`).innerHTML =
          "Phone (optional)";

        document.getElementById(`email${index}`).title = "Email (optional)";
        document.getElementById(`phone${index}`).title = "Phone (optional)";
      }

      if (event.target.name === "housing" && event.target.checked) {
        document.getElementById(`email${index}-label`).innerHTML =
          "Email Required (or Phone)";
        document.getElementById(`phone${index}-label`).innerHTML =
          "Phone Required (or Email)";

        document.getElementById(`email${index}`).title =
          "Email or Phone is required";
        document.getElementById(`phone${index}`).title =
          "Phone or Email is required";
      }
      if (event.target.name === "student" || event.target.name === "housing") {
        newFields[index][event.target.name] = event.target.checked;
        // ? true
        // : false;

        if (event.target.name === "student") {
          const thisField = fields[index];
          //// console.log(thisField.event);
          const factr = isEarlyBird ? 0 : 2;

          if (thisField.event === choices[0][0]) {
            resetChange(index);
          } else {
            updateEventAlaCarte(index, alaCarteOptions);
          }
        }
      } else {
        newFields[index][event.target.name] = event.target.value;
      }
      setFields(newFields);
      const totalAmount = newFields
        .reduce((total, item) => total + item.price * 1, 0)
        .toFixed(2);
      setTotal(Number(totalAmount));
    } catch (err) {
      // console.log(err);
    }
  };

  const closePlayer = () => {
    setShowPlayer(false);
  };

  const openPlayer = () => {
    setShowPlayer(true);
    setShowDoc(false);
  };

  const openDoc = () => {
    setShowPlayer(false);
    setShowDoc(true);
  };

  const removeField = (index) => {
    const xPrice = fields[index].price;
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    const totalAmount = newFields
      .reduce((total, item) => total + item.price * 1, 0)
      .toFixed(2);
    setTotal(Number(totalAmount));
  };

  const addFields = () => {
    const modField = { ..._fields };
    modField.firstname = "";
    modField.lastname = "";
    modField.email = "";
    modField.phone = "";
    const lastEvent = fields[fields.length - 1].event || "Weekend"; // for multi event setup to insert same as last setErrormsg("Check errors");
    setFields((prevFields) => {
      const newFields = [...prevFields, modField];
      const totalAmount = newFields
        .reduce((total, item) => total + item.price * 1, 0)
        .toFixed(2);
      setTotal(Number(totalAmount));
      return newFields;
    });
  };

  const [errs, setErrs] = useState({});

  const validateBoxes = () => {
    setRenderer("");
    const _er = {};
    setErrs(_er);
    try {
      for (var i = 0; i < fields.length; i++) {
        let msg = [];
        document.getElementById("email" + i).style.border = "none";
        document.getElementById("phone" + i).style.border = "none";
        document.getElementById("phone" + i).style.border = "none";
        document.getElementById("email" + i).style.border = "none";
        document.getElementById("lastname" + i).style.border = "none";
        document.getElementById("firstname" + i).style.border = "none";

        if (fields[i].housing) {
          if (
            document.getElementById("email" + i).value === "" &&
            document.getElementById("phone" + i).value === ""
          ) {
            document.getElementById("email" + i).style.border = "3px solid red";
            document.getElementById("phone" + i).style.border = "3px solid red";
            msg.push("Email or Phone are required if Housing is requested");
          }
        }
        if (fields[i].firstname === "") {
          document.getElementById("firstname" + i).style.border =
            "3px solid red";
          msg.push("First required");
        }
        if (fields[i].lastname === "") {
          document.getElementById("lastname" + i).style.border =
            "3px solid red";
          msg.push("Last required");
        }
        if (fields[i].email) {
          if (!emailRegex.test(fields[i].email)) {
            document.getElementById("email" + i).style.border = "3px solid red";
            msg.push("Email invalid");
          }
        }

        if (fields[i].phone) {
          if (!usPhoneNumberRegex.test(fields[i].phone)) {
            document.getElementById("phone" + i).style.border = "3px solid red";
            msg.push("Phone invalid");
          }
        }
        if (msg.length > 0) {
          const _errs = errs;
          _errs[i] = msg;
          setErrs(_errs);
        }
      }
    } catch (err) {
      // // console.log(err);
    }

    const msgs = valMsg;

    setRenderer(Math.random().toString());
    return;
  };

  const validateCheckout = () => {
    // setDeferLoading(false);
    // // console.log("Dancers");
    setRenderer("");
    const _er = {};
    setErrs(_er);
    validateBoxes();

    const msgs = valMsg;

    if (Object.keys(errs).length > 0) {
      setRenderer(Math.random().toString());
      setErrormsg("Check errors");
      return;
    }
    setShowHeader(false);
    setShowForm(false);
    setShowPlayer(false);
    setShowDoc(false);
    // setShowConf(false);
    setErrormsg("");
    navigate("/checkout/", {
      state: { price: price, amount: 1, cartItems: fields },
    });
  };

  const [alaCarteOptions, setAlaCarteOptions] = useState({});

  const updateEventAlaCarte = (index, options) => {
    setAlaCarteOptions(options);

    // const subTotal = getAlaCarteSubtotal(options);
    const newFields = [...fields];
    newFields[index]["price"] = 0;
    newFields[index]["unit_amount"] = 0;
    newFields[index]["event"] = `{"alacarte": ${JSON.stringify(options)}}`;

    const total = 0;
    Object.entries(options).forEach((option) => {
      if (option[1]) {
        const subTot =
          prices[option[0]][fields[index].student ? 1 + factr : 0 + factr];
        newFields[index]["price"] = newFields[index]["price"] + subTot;
        newFields[index]["unit_amount"] =
          newFields[index]["unit_amount"] + subTot;
      }
    });

    const totalAmount = newFields
      .reduce((total, item) => total + item.price * 1, 0)
      .toFixed(2);
    // const totalAmount = newFields.reduce((total, item) => total + (item.price * 1), 0).toFixed(2);
    setTotal(Number(totalAmount));
    setFields(newFields);
    // // console.log(subTotal);
  };

  // setFields(props.fields);

  const RowErrors = ({ index, errs }) => {
    return (
      <div
        style={{
          display: errs[index] ? "flex" : "none",
          gap: 10,
        }}
      >
        {errs[index] &&
          errs[index].map((msg, index) => {
            return (
              <div
                style={{
                  ...theme.typography.h6,
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                }}
                key={index}
              >
                {msg}
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <Box>
      <ContactInfo />
      <div style={{ display: showForm ? "block" : "none" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "fit-content",
            margin: "auto",
          }}
        >
          {fields.map((field, index) => {
            return (
              <div
                key={index}
                style={{ border: `2px solid ${theme.palette.primary.dark}` }}
              >
                <Box
                  key={"box" + index}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    borderRadius: 2,

                    padding: 2,
                  }}
                >
                  <pre style={{ display: "none" }}>
                    {JSON.stringify(fields[index]["event"], null, 3)}
                  </pre>
                  <DancerFormField
                    key={index}
                    field={field}
                    index={index}
                    handleChange={handleChange}
                    validateBoxes={validateBoxes}
                  />

                  <div
                    style={{ display: "flex", gap: 3, position: "relative" }}
                  >
                    <EventOptions
                      show={field?.event?.indexOf("alacarte") > -1 || false}
                      field={field}
                      updateEventAlaCarte={updateEventAlaCarte}
                      selectChange={selectChange}
                      resetChange={resetChange}
                      index={index}
                    />

                    <div
                      style={{
                        ...theme.typography.button2,
                        position: "absolute",
                        top: -20,
                        left: 0,
                        zIndex: 0,
                      }}
                      id="diet-label"
                    >
                      weekend or ala carte
                    </div>
                    <div>
                      <div
                        style={{
                          ...theme.typography.h4,
                          paddingTop: 13,
                          border: `1px none ${theme.palette.primary.dark}`,
                          // marginTop: 5,
                          display: "table-cell",
                          margin: "auto",
                          height: 50,
                          fontWeight: "bold",
                        }}
                      >
                        ${field.price}
                      </div>
                    </div>
                  </div>

                  {index > 0 ? (
                    <Fab
                      title="delete dancer"
                      onClick={() => removeField(index)}
                      aria-label="delete"
                    >
                      <CloseIcon
                        style={{
                          backgroundColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.contrastText,
                          borderRadius: 100,
                          width: 20,
                          height: 20,
                        }}
                      />
                    </Fab>
                  ) : null}
                </Box>
                <RowErrors index={index} errs={errs} />
              </div>
            );
          })}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              flexBasis: 50,
              flexGrow: 0,
              flexShrink: 1,
              flexWrap: "wrap",
              // width: 500,
              margin: "auto",
            }}
          >
            <div
              style={{
                ...theme.typography.h4,
                paddingTop: 20,
                height: 20,
                fontWeight: "bold",
                borderBottom: "5px double black",
              }}
            >
              total:${total}
            </div>
            <Button
              style={{
                color: "#fff",
                ...theme.typography.button,
                backgroundColor: theme.palette.success.main,
              }}
              variant="contained"
              color="secondary"
              onClick={addFields}
            >
              Add Dancer
            </Button>
            <IconButton
              style={{
                width: "10vw",
                minWidth: 100,
                maxWidth: 150,
                textTransform: "capitalize",
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                borderRadius: 10,
              }}
              onClick={validateCheckout}
              variant="contained"
            >
              Check Out
              <ShoppingCartCheckoutIcon />
            </IconButton>
          </div>
        </Box>

        <div
          className="noprint"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            margin: "auto",
            marginTop: 10,
            gap: 10,
          }}
        >
          <div style={{ border: "1px solid black", width: "100%" }}></div>

          <div style={{ display: "flex", gap: 3 }}>
            {showDoc ? (
              <Button
                title="close schedule"
                onClick={() => setShowDoc(false)}
                aria-label="close 2023 schedle"
                style={{
                  ...theme.typography.button,
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.info.contrastText,
                }}
              >
                <CloseIcon />
                close schedule
              </Button>
            ) : (
              <a
                style={{ ...theme.typography.button }}
                onClick={openDoc}
                href="#event-schedule"
              >
                Schedule
              </a>
            )}

            {showPlayer ? (
              <Button
                name="event-schedule"
                style={{
                  ...theme.typography.button,
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.info.contrastText,
                }}
                onClick={() => closePlayer()}
                // onClick={() => setShowDoc(true)}
                href="#event-schedule"
              >
                <CloseIcon />
                Close Player
              </Button>
            ) : (
              <a
                href="#playerLoc"
                style={{ ...theme.typography.button }}
                onClick={openPlayer}
              >
                Videos
              </a>
            )}
          </div>
        </div>
      </div>
      {showPlayer && (
        <div>
          <div id="playerLoc"></div>
          <div className="noprint" style={{ fontSize: 24 }}>
            Videos
          </div>

          <Playlist
            showPlayer={showPlayer}
            play={[
              {
                url: "",
                label: "",
              },
              {
                url: "https://youtu.be/cb4-nbYOU5k",
                label: "2020 Chattaboogie One",
              },
              {
                url: "https://youtu.be/a-LfWhcotRM",
                label: "2020 Chattaboogie Two",
              },
              {
                url: "https://youtu.be/rwjMxc5GIUQ",
                label: "2020 Chattaboogie Three",
              },
              {
                url: "https://youtu.be/gjV5zm0BYkY",
                label: "2020 Chattaboogie Four",
              },
              {
                url: "https://youtu.be/i0NVg80JLT8",
                label: "Angel Band",
              },
              {
                url: "https://youtu.be/r4nWJGow-Qw",
                label: "Waltz",
              },
            ]}
          />
        </div>
      )}

      <div
        style={{
          backgroundColor: "#fff",
          marginTop: 40,
          display: showDoc ? "block" : "none",
        }}
      >
        <div id="event-schedule" />
        <div
          style={{
            width: "100vw",
            position: "relative",
            // marginTop: 20,
            display: showPlayer ? "block" : "none",
          }}
        ></div>
        <Schedule />
      </div>
    </Box>
  );
}
