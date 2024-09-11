import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  Button,
  Zoom,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { prices } from "../config.js";
const EventOptions = ({
  updateEventAlaCarte,
  selectChange,
  resetChange,
  index,
  show,
  field,
}) => {
  const theme = useTheme();

  const choices = Object.entries(prices);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [data] = useState(field);

  let alacarteOptions = "";

  const [alacartOptions, setAlacartOptions] = useState("");

  useEffect(() => {
    try {
      setAlacartOptions(JSON.parse(field.event));
      setSelectedChoices(JSON.parse(field.event).alacarte);
    } catch (err) {
      //   console.log(err);
    }
  }, []);

  // Handle Checkbox toggle
  const handleToggle = (event, choice) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [choice]: !prev[choice],
    }));
    console.log(choice);
    updateEventAlaCarte(index, {
      ...selectedChoices,
      [choice]: event.target.checked,
    });
  };

  const [val, setVal] = useState(choices[0][0]);

  const handleChange = (index, event) => {
    setVal(event.target.value);
    selectChange(index, event);
    setShowAlaCarte(event.target.value === "alacarte");
    event.target.value === "alacarte" &&
      updateEventAlaCarte(index, selectedChoices);
  };

  const reset = (val) => {
    setVal(val);
    setShowAlaCarte(false);
    resetChange(index);
  };

  const [showAlaCarte, setShowAlaCarte] = useState(false);

  useEffect(() => {
    setShowAlaCarte(show);

    console.log(selectedChoices);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Select
        style={{
          width: 160,
          height: 40,
          display: showAlaCarte ? "none" : "block",
        }}
        id="event"
        name="event"
        label="Event"
        value={val}
        onChange={(event) => handleChange(index, event)}
        // onClick={(event) => setAlaCart(event)}
      >
        {choices.slice(0, 1).map((choice, index) => {
          console.log(choice);
          return (
            <MenuItem key={"menuItem" + index} value={choice[0]}>
              {choice[0]}
            </MenuItem>
          );
        })}
        <MenuItem key={"menuItem" + index} value="alacarte">
          Ala Carte
        </MenuItem>
      </Select>

      {/* Multiple Checkbox options for choices excluding index 0 */}

      <FormGroup
        // onMouseLeave={() => reset(choices[0][0])}
        style={{
          bottom: 0,
          display: showAlaCarte ? "flex" : "none",
          height: 200,
          zIndex: theme.zIndex.tooltip,
          backgroundColor: "#fff",
          //   position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: 200,
            borderRadius: 10,
            backgroundColor: theme.palette.grey[300],
            position: "relative",
            marginTop: 20,
          }}
        >
          <div
            style={{
              ...theme.typography.h5,
            }}
          >
            Ala Carte
          </div>
          {choices.slice(1).map((choice, index) => (
            <FormControlLabel
              key={"checkbox" + index}
              control={
                <Checkbox
                  checked={!!selectedChoices[choice[0]]}
                  onChange={(event) => handleToggle(event, choice[0])}
                />
              }
              label={choice[0]} // Displaying the event name (choice[0])
            />
          ))}

          <Button
            variant="outline"
            sx={{
              ...theme.typography.button,
              marginTop: 0,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              position: "absolute",
              right: 0,
              top: 0,
              padding: 0,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main, // Change background on hover
                color: theme.palette.secondary.contrastText, // Change text color on hover
                boxShadow: theme.shadows[8],
              },
            }}
            onClick={() => reset(choices[0][0])}
          >
            <CloseIcon />
          </Button>
        </div>
      </FormGroup>
    </div>
  );
};

export default EventOptions;
