import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DancerFormField from "./DancerFormField.js";
import "./dancers.css";
import ConfirmButtons from "./ConfirmButtons";
import { appConfig, _fields } from "../config.js";

const NODEURL = appConfig.NODEURL;

export default function DancerForm({
  dancer,
  resetField,
  setSelectedRow,
  deleteDancer,
  getDancers,
}) {
  const handleChange = (event) => {
    const newField = { ...field };
    if (event.target.name === "student" || event.target.name === "housing") {
      newField[event.target.name] = event.target.checked;
    } else {
      newField[event.target.name] = event.target.value;
    }
    setField(newField);
  };

  const [showNote, setShowNote] = useState("");
  const [showEditButton, setShowEditButton] = useState(false);

  const doSetSearch = (event) => {
    setSearch(event.target.value);
  };

  const showNoteRow = (orderId) => {
    // console.log(orderId);
    setShowNote(orderId);
  };
  const clearBorders = () => {
    document.getElementById("firstname").style.border = "none";
    document.getElementById("lastname").style.border = "none";
    document.getElementById("email").style.border = "none";
    document.getElementById("phone").style.border = "none";
  };
  // const [selectedRow, setSelectedRow] = useState("");
  const [undos, setUndos] = useState([]);
  // const setUpEdit = (dancer) => {
  //   console.log();
  //   // let timeout2;
  //   setField(dancer);
  //   setShowEditButton(true);
  //   clearBorders();
  //   setValMsg([]);
  //   setSelectedRow(dancer.orderId);
  //   setShowEditButton(false);
  //   setTimeout(() => setShowEditButton(true), 300);
  // };

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const usPhoneNumberRegex =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  const [valMsg, setValMsg] = useState([]);
  const [field, setField] = useState(_fields);
  const theme = useTheme();

  const colHeadStyle = {
    ...theme.typography.button2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: 2,
  };

  const validateForm = () => {
    const msg = [];
    document.getElementById("unit_amount").style.border = "none";

    if (
      !document.getElementById("unit_amount").value ||
      isNaN(document.getElementById("unit_amount").value)
    ) {
      document.getElementById("unit_amount").style.border = "3px solid red";
      msg.push("Price should be a number");
    }

    if (field.firstname === "") {
      document.getElementById("firstname").style.border = "3px solid red";
      msg.push("First Name required");
    } else {
      document.getElementById("firstname").style.border = "none";
    }
    if (field.lastname === "") {
      document.getElementById("lastname").style.border = "3px solid red";
      msg.push("Last Name required");
    } else {
      document.getElementById("lastname").style.border = "none";
    }

    document.getElementById("email").style.border = "none";
    if (field.email) {
      if (!emailRegex.test(field.email)) {
        document.getElementById("email").style.border = "3px solid red";
        msg.push("Email invalid");
      }
    }

    document.getElementById("phone").style.border = "none";
    if (field.phone) {
      if (!usPhoneNumberRegex.test(field.phone)) {
        document.getElementById("phone").style.border = "3px solid red";
        msg.push("Phone invalid");
      }
    }
    setValMsg(msg);
    return msg.length === 0 ? true : false;
  };
  const submitUpdate = async () => {
    fetch(`${NODEURL}api/update-dancer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dancer: field }), // Send the object in the request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        console.log("Received back:", data); // The object sent back by the server
        // You can now use this object to implement an undo operation
        const newUndo = [...undos];
        newUndo.push(data);
        setUndos(newUndo);
        getDancers();
        // setSelectedRow("");
        resetField();
        setSelectedRow("");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setSelectedRow("");
      });
  };

  const [dancers, setDancers] = useState([]);
  const [forward, setForward] = useState(true);
  const [err, setErr] = useState("");

  const headers = [];
  Object.entries(_fields).map((field) => {
    headers.push({ label: field, key: field });
    console.log(field);
  });

  const [aCode, setACode] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  const [showSearchResults, setShowSearchResults] = useState(
    searchResults.length > 0 || search !== ""
  );

  useEffect(() => {
    setField(dancer);
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <div className="noprint">
        <Box
          onMouseLeave={resetField}
          key={"box1"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            borderRadius: 2,
            border: `2px none ${theme.palette.success.main}`,
            padding: 3,
            margin: 0,
            position: "relative",
            backgroundColor: theme.palette.grey[100],
            color: "#000", //theme.palette.info.contrastText,
            // color: selectedRow ? "#fff" : "#000",
          }}
        >
          <DancerFormField
            // key={index}
            field={field}
            index={0}
            handleChange={handleChange}
            // validateBoxes={validateBoxes}
          />

          <div
            style={{
              position: "relative",
              border: "1px none black",
            }}
          ></div>
          <TextField
            size="small"
            type="number"
            style={{ width: 100 }}
            title="Price (required)"
            label="Price is required"
            name="unit_amount"
            id={"unit_amount"}
            key={"unit_amount"}
            value={field.unit_amount}
            onChange={(event) => handleChange(event)}
          />
          <textarea
            value={field.note}
            name="note"
            onChange={(event) => handleChange(event)}
            placeholder="note"
            rows="1"
          ></textarea>
          <div style={{ display: "flex", gap: 20 }}>
            <div
              style={{
                position: "absolute",
                top: -14,
                left: 0,
                display: "flex",
                // flexDirection: "column",
                gap: 10,
                backgroundColor: theme.palette.info.main,
                padding: 3,
                borderRadius: 5,
              }}
            >
              <Button
                onClick={submitUpdate}
                variant="contained"
                key="update"
                style={{
                  ...theme.typography.button2,
                  backgroundColor: theme.palette.success.main,
                }}
              >
                Update
              </Button>
              <Button
                onClick={resetField}
                variant="contained"
                key="reset"
                style={{
                  ...theme.typography.button2,
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Cancel
              </Button>
              <ConfirmButtons
                className="noprint"
                label="Delete"
                action={deleteDancer}
                args={dancer}
              ></ConfirmButtons>
            </div>
          </div>
        </Box>
      </div>

      <h2
        style={{
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
        }}
      >
        {err.message}
      </h2>
      <pre style={{ display: "none" }}>{JSON.stringify(dancers, null, 3)}</pre>
    </div>
  );
}
