import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CSVLink } from "react-csv";
import { useTheme, styled } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import "./dancers.css";

import { appConfig, _fields } from "../config.js";

import DancerRow from "../components/DancerRow.js";

import Header from "../components/Header.js";

import DancerFormField from "../components/DancerFormField.js";

const NODEURL = appConfig.NODEURL;

export default function Dancers() {
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
    setShowNote(orderId);
  };
  const clearBorders = () => {
    document.getElementById("firstname0").style.border = "none";
    document.getElementById("lastname0").style.border = "none";
    document.getElementById("email0").style.border = "none";
    document.getElementById("phone0").style.border = "none";
  };
  const [selectedRow, setSelectedRow] = useState("");
  const [undos, setUndos] = useState([]);
  const setUpEdit = (dancer) => {
    setSelectedRow(dancer.orderId);
  };
  const deleteDancer = async (dancer) => {
    setSelectedRow("");
    fetch(`${NODEURL}api/delete-dancer`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dancer: dancer }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received back:", data);
        const newUndo = [...undos];
        newUndo.push(data);
        setUndos(newUndo);
        getDancers();
        resetField();
        setSelectedRow("");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setSelectedRow("");
      });
  };

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
    fontFamily: "Roboto",
  };

  const sortDancers = (field) => {
    // console.log(field);
    const dancersArray = [...dancers];
    // console.log(dancersArray);

    dancersArray.sort((a, b) => {
      const fieldA = a[field];
      const fieldB = b[field];
      if (fieldA < fieldB) {
        return -1;
      }
      if (fieldA > fieldB) {
        return 1;
      }
      return 0;
    });

    if (!forward) {
      dancersArray.reverse();
    }

    setForward(!forward);

    setDancers(dancersArray);
  };

  const resetField = () => {
    clearBorders();
    setValMsg([]);
    setSelectedRow("");
    setField(_fields);
    setShowEditButton(false);
  };
  const validateForm = () => {
    const msg = [];

    if (field.firstname === "") {
      document.getElementById("firstname0").style.border = "3px solid red";
      msg.push("First Name required");
    } else {
      document.getElementById("firstname0").style.border = "none";
    }
    if (field.lastname === "") {
      document.getElementById("lastname0").style.border = "3px solid red";
      msg.push("Last Name required");
    } else {
      document.getElementById("lastname0").style.border = "none";
    }

    document.getElementById("email0").style.border = "none";
    if (field.email) {
      if (!emailRegex.test(field.email)) {
        document.getElementById("email0").style.border = "3px solid red";
        msg.push("Email invalid");
      }
    }

    document.getElementById("phone0").style.border = "none";
    if (field.phone) {
      if (!usPhoneNumberRegex.test(field.phone)) {
        document.getElementById("phone0").style.border = "3px solid red";
        msg.push("Phone invalid");
      }
    }
    setValMsg(msg);
    return msg.length === 0 ? true : false;
  };
  const submitUpdate = async () => {
    if (validateForm()) {
      await fetch(`${NODEURL}api/update-dancer`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: field,
        }),
      });
      resetField();
      setShowEditButton(false);
    }
  };

  const submitUndo = async (undo, index) => {
    console.log(undo);

    try {
      //ret.push(field);
      const response = fetch(`${NODEURL}api/create-from-undo`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: [undo],
        }),
      });

      const orderData = await response.json();
      console.log(orderData);
    } catch (err) {}
    const newUndos = [...undos];

    newUndos.splice(index, 1);
    setUndos(newUndos);
    getDancers();
    // resetField();
  };

  const submit = async () => {
    // console.log("submit");

    if (validateForm()) {
      const ret = [];
      try {
        ret.push(field);
        const response = await fetch(`${NODEURL}api/create-from-form`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: ret,
          }),
        });

        const orderData = await response.json();
        console.log(orderData);
        getDancers();
      } catch (err) {}

      resetField();
    }
  };
  const [dancers, setDancers] = useState([]);
  const [forward, setForward] = useState(true);
  const [err, setErr] = useState("");

  const [aCode, setACode] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  const [showSearchResults, setShowSearchResults] = useState(
    searchResults.length > 0 || search !== ""
  );

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    console.log(dancers);
    const result = dancers.filter(
      (row) =>
        row.firstname.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        row.lastname.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        row.email.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        row.phone.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        row.orderId.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    setSearchResults(result);
    setShowSearchResults(result.length > 0 || search !== "");
    // console.log(result);
  }, [search, dancers]);

  const getDancers = async () => {
    setErr("");
    try {
      const response = await fetch(`${NODEURL}api/dancers`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });

      const newDancers = await response.json();

      setDancers(newDancers);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };

  useEffect(() => {
    // console.log("useeffect");
    getDancers();
    const aCde = localStorage.getItem("accessCode");
    setACode(aCde);
  }, []);

  const compare = () => {
    if (document.getElementById("accessCodeInput").value === accessCode) {
      setAccessCode("matched");

      if (remember) {
        localStorage.setItem("accessCode", accessCode);
      } else {
        localStorage.setItem("accessCode", "");
      }
    } else {
      setPrompt("Try again");
    }
  };

  const [accessCode, setAccessCode] = useState(appConfig.DANCERSCODE);

  const [prompt, setPrompt] = useState("Enter");

  const [remember, setRemember] = useState(true);

  const forget = () => {
    setACode("");
    localStorage.removeItem("accessCode");
  };

  const cSvStylesx = {
    ...theme.typography.button2,
    fontWeight: 500,
    lineHeight: "1em",
    height: "1em",
  };

  const StyledCSVLink = styled("CSVLink")({
    ...theme.typography.button2,
    fontWeight: 500,
    lineHeight: "1.2em",
    height: "1.2em",
    // paddingTop: 2,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  });

  const exclude = ["unit_amount", "quantity"];
  // const exclude = ["unit_amount", "quantity", "name", "event", "price"];
  if (accessCode !== "matched") {
    return (
      <Header title="Dancer List">
        <div style={{ margin: 20 }}>
          <TextField
            size="small"
            id="accessCodeInput"
            label="enter code"
            value={aCode}
            onChange={(value) => setACode(value.value)}
            onKeyDown={(key) => {
              if (key.key === "Enter") {
                compare();
              }
            }}
          />

          <Button
            style={{
              ...theme.typography.button2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
            onClick={() => compare()}
          >
            {prompt}
          </Button>

          <div
            style={{
              border: "1px none black",

              width: 200,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id="rememberCode"
                  onChange={() => setRemember(!remember)}
                  checked={remember}
                />
              }
              label="Remember Code"
            />

            <Button
              id="forget"
              style={{
                ...theme.typography.button2,
                display: aCode ? "" : "none", // "" makes the css of button2 to work
                backgroundColor: theme.palette.info.main,
                color: theme.palette.info.contrastText,
              }}
              onClick={forget}
            >
              forget code
            </Button>
          </div>
        </div>
      </Header>
    );
  }
  return (
    <Header title="Dancer List">
      <div style={{ margin: 20 }}>
        <div className="noprint">
          <Box
            key={"box1"}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0,
              borderRadius: 2,
              border: `2px solid ${theme.palette.primary.dark}`,
              // borderLeft: "none",
              padding: 2,

              backgroundColor: showEditButton
                ? theme.palette.info.light
                : "#fff",
              // color: selectedRow ? "#fff" : "#000",
            }}
          >
            <DancerFormField
              key={0}
              field={field}
              index={0}
              handleChange={handleChange}
              // validateBoxes={validateBoxes}
            />

            <TextField
              size="small"
              type="number"
              style={{ width: 100 }}
              title="Price"
              label="Price"
              name="unit_amount"
              id={"unit_amount"}
              key={"unit_amount"}
              value={field.unit_amount}
              onChange={(event) => handleChange(event)}
            />

            <textarea
              value={field.note}
              name="note"
              row="1"
              onChange={(event) => handleChange(event)}
              placeholder="note"
            ></textarea>
            <div style={{ display: "flex", gap: 20 }}>
              <Button
                onClick={submit}
                key="add"
                style={{
                  ...theme.typography.button2,
                  // display: showEditButton ? "none" : "inline",
                  backgroundColor: theme.palette.success.main,
                }}
              >
                Add
              </Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Button
                  onClick={submitUpdate}
                  variant="contained"
                  key="update"
                  style={{
                    ...theme.typography.button,
                    display: showEditButton ? "block" : "none",
                  }}
                >
                  Update
                </Button>
                <Button
                  onClick={resetField}
                  variant="contained"
                  key="reset"
                  style={{
                    ...theme.typography.button,
                    display: showEditButton ? "block" : "none",
                    backgroundColor: theme.palette.warning.main,
                    color: theme.palette.warning.contrastText,
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div>
                <div
                  style={{
                    border: "1px none black",
                    marginBottom: 10,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  {/* <CSVLink
                    className={classes.cSvStyles}
                    // className="csvbutton"
                    data={dancers}
                    headers={headers}
                    filename="dancers.csv"
                    target="_blank"
                  >
                    Download CSV
                  </CSVLink> */}

                  <Box
                    component={CSVLink}
                    data={dancers}
                    style={{
                      ...theme.typography.button2,
                      fontWeight: 500,
                      lineHeight: "1.5em",
                      height: "1.5em",
                      paddingTop: 2,
                      "&:hover": {
                        backgroundColor: theme.palette.secondary.dark,
                      },
                    }}
                  >
                    Download CSV
                  </Box>

                  <Button
                    style={{ ...theme.typography.button2 }}
                    onClick={getDancers}
                  >
                    Refresh
                  </Button>
                  <Button
                    style={theme.typography.button2}
                    onClick={() => window.print()}
                  >
                    print
                  </Button>
                  <div>
                    <div
                      style={{
                        // display: "flex",
                        // flexDirection: "column",
                        // gap: 1,
                        position: "relative",
                      }}
                    >
                      <InputBase
                        id="bootstrap-input"
                        onChange={doSetSearch}
                        value={search}
                        label="search"
                        style={{ border: "1px solid black" }}
                        placeholder="search"
                      />

                      <div
                        onClick={() => setValMsg([])}
                        style={{
                          ...theme.typography.button,
                          marginTop: 10,
                          cursor: "pointer",
                          display: valMsg.length === 0 ? "none" : "block",
                          backgroundColor: theme.palette.error.main,
                          color: theme.palette.error.contrastText,
                          position: "absolute",
                          zIndex: 99,
                        }}
                      >
                        {valMsg.map((msg, index) => (
                          <div key={index}>{msg}</div>
                        ))}
                        <CloseIcon
                          style={{ position: "absolute", top: 0, right: 0 }}
                        />
                      </div>
                      <div
                        style={{
                          ...theme.typography.label,
                          // display: "none",
                          position: "absolute",
                          top: -20,
                          left: 0,
                          zIndex: 0,
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        id="diet-label"
                      ></div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {undos.map((undo, index) => {
                      return (
                        // <div key={index}>{JSON.stringify(undo, null, 3)}</div>
                        <div key={index}>
                          <pre style={{ display: "none" }}>
                            {JSON.stringify(undo, null, 3)}
                          </pre>
                          <button
                            onClick={() => submitUndo(undo, index)}
                            onMouseEnter={() => {}}
                            title={
                              "undo delete " +
                              undo.firstname +
                              " " +
                              undo.lastname
                            }
                          >
                            undo
                          </button>
                          <span>
                            {"delete " + undo.firstname + " " + undo.lastname}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {Object.entries(_fields)
              .filter((f) => exclude.indexOf(f[0]) === -1)
              .map((field, index) => {
                return (
                  <div key={index} style={{ width: 180 }}>
                    <Button
                      style={colHeadStyle}
                      onClick={() => sortDancers(field)}
                    >
                      {field[0]}
                    </Button>
                  </div>
                );
              })}

            <div style={{ width: 200 }}>
              <Button style={colHeadStyle} onClick={() => sortDancers("price")}>
                Paid
              </Button>
            </div>
            <div style={{ width: 200 }}>
              <Button
                style={colHeadStyle}
                onClick={() => sortDancers("createdOn")}
              >
                Date/Time
              </Button>
            </div>
            <div style={{ width: 200 }}>
              <Button
                style={colHeadStyle}
                onClick={() => sortDancers("orderId")}
              >
                OrderID
              </Button>
            </div>
          </div>
        </div>
        <div
          onMouseLeave={() => setShowNote("")}
          style={{
            padding: 0,
            display: showSearchResults ? "block" : "none",
          }}
        >
          {searchResults.map((dancer, index) => {
            return (
              <DancerRow
                showNoteRow={showNoteRow}
                setUpEdit={setUpEdit}
                key={index}
                dancer={dancer}
                selectedRow={selectedRow}
                showNote={showNote}
                deleteDancer={deleteDancer}
                setSelectedRow={setSelectedRow}
                getDancers={getDancers}
              />
            );
          })}
        </div>
        <div
          onMouseLeave={() => setShowNote("")}
          style={{
            display: showSearchResults ? "none" : "block",
          }}
        >
          {dancers.map((dancer, index) => {
            return (
              <DancerRow
                showNoteRow={showNoteRow}
                setUpEdit={setUpEdit}
                key={index}
                dancer={dancer}
                selectedRow={selectedRow}
                showNote={showNote}
                deleteDancer={deleteDancer}
                setSelectedRow={setSelectedRow}
                resetField={resetField}
                getDancers={getDancers}
              />
            );
          })}
        </div>
        <h2
          style={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          }}
        >
          {err.message}
        </h2>
        <pre style={{ display: "none" }}>
          {JSON.stringify(dancers, null, 3)}
        </pre>
      </div>
    </Header>
  );
}
