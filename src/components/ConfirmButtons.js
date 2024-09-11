import React, { useState } from "react";
import Button from "@mui/material/Button";
import Zoom from "@mui/material/Zoom";
import { useTheme } from "@mui/material/styles";
import "./dancers.css";

const ConfirmButtons = ({ action, args, value, label, icon }) => {
  args = args ? args : null;

  // console.log("ConfirmButton");
  const [confirmed, setConfirmed] = useState(false);
  const theme = useTheme();
  const classes = {
    root: {
      marginBottom: 100,
    },
    icon: {
      width: 25,
      padding: 0,
      margin: 0,
    },
    resetButton: {
      width: "fit=content",
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
      boxShadow: theme.shadows[6],
      "&:hover": {
        boxShadow: theme.shadows[8],
        backgroundColor: theme.palette.warning.dark,
        color: theme.palette.warning.contrastDark,
      },
    },
    confirmButton: {
      width: "fit=content",
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.warning.contrastDark,
      boxShadow: theme.shadows[6],
      "&:hover": {
        boxShadow: theme.shadows[8],
        backgroundColor: theme.palette.warning.main,
      },
    },
    resetSubmit: {
      // marginLeft: 3,
      width: "fit=content",
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.success.dark,
      },
    },

    resetButtons: {
      display: "inline",
      flexDirect: "row",
      width: "fit-content",
      // width: 20,
      // height: 15,
      // textTransform: "lowercase",
      // backgroundColor: theme.palette.grey[200],
      // boxShadow: theme.shadows[4],
      // //position: "relative",
      zIndex: theme.zIndex.drawer,
      borderRadius: 10,
      alignItems: "center",
      verticalAlign: "middle",
      margin: 0,
      padding: 0,
    },
  };

  const toggleConfirm = () => {
    setConfirmed((prev) => !prev);
  };

  const clickText = "Confirm";
  const cancelText = "Cancel";
  //console.log("ColorResetButton");
  //const show = props.showReset;

  //const clearThemeFromStorage = props.clearThemeFromStorage;

  const handleClick = (e) => {
    // console.log(e);
    e.preventDefault();
    setConfirmed(false);
    action(args);
  };

  const [isVisible, setIsVisible] = useState(false);
  let timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => setConfirmed(false), 300); // 300ms delay
    // setConfirmed(false);
  };

  if (confirmed) {
    // the cancel and the {label} button that does the {action}
    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            border: "2px none black",
          }}
        >
          <Zoom in={true}>
            <Button
              className="noprint"
              variant="contained"
              style={{ ...theme.typography.button2 }}
              onClick={toggleConfirm}
            >
              {cancelText}
            </Button>
          </Zoom>
          <Zoom in={true}>
            <Button
              className="noprint"
              value={value}
              style={{
                ...theme.typography.button2,
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
              }}
              onClick={(e) => handleClick(e)}
            >
              {icon ? icon : label}
            </Button>
          </Zoom>
        </div>
      </div>
    );
  }

  // default button with {label}
  return (
    <div style={classes.resetButtons}>
      <Zoom in={true}>
        <Button
          className="noprint"
          style={{
            ...theme.typography.button2,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          }}
          onClick={toggleConfirm}
        >
          {icon ? icon : label}
        </Button>
      </Zoom>
    </div>
  );
};

ConfirmButtons.propTypes = {};

export default ConfirmButtons;
