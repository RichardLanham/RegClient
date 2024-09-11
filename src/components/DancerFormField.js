import React from "react";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

const DancerFormField = ({ field, index, handleChange, validateBoxes }) => {
  return (
    <div
      style={{
        border: "2px none black",
        display: "flex",
        flexWrap: "wrap",
        verticalAlign: "middle",
        alignItems: "center",
      }}
    >
      <TextField
        label="First Name (required)"
        name="firstname"
        id={"firstname" + index}
        value={field.firstname}
        onChange={(event) => handleChange(event, index)}
        onKeyUp={validateBoxes}
      />

      <TextField
        label="Last Name (required)"
        name="lastname"
        id={"lastname" + index}
        value={field.lastname}
        onChange={(event) => handleChange(event, index)}
        onKeyUp={validateBoxes}
      />

      <TextField
        label={index === 0 ? "Email (required)" : "Email (optional!)"}
        name="email"
        id={"email" + index}
        value={field.email}
        onChange={(event) => handleChange(event, index)}
        onKeyUp={validateBoxes}
      />

      <TextField
        label="Phone (optional)"
        name="phone"
        id={"phone" + index}
        value={field.phone}
        onChange={(event) => handleChange(event, index)}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="housing"
            checked={field.housing}
            onChange={(event) => handleChange(event, index)}
          />
        }
        label="Request Housing"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="student"
            checked={field.student}
            onChange={(event) => handleChange(event, index)}
          />
        }
        label="Student"
      />

      <Select
        label="Dietary Preference"
        name="dietary"
        style={{ height: 60 }}
        value={field.dietary}
        onChange={(event) => handleChange(event, index)}
      >
        <MenuItem value="omnivore">Omnivore</MenuItem>
        <MenuItem value="vegetarian">Vegetarian</MenuItem>
        <MenuItem value="vegan">Vegan</MenuItem>
      </Select>
    </div>
  );
};

export default DancerFormField;
