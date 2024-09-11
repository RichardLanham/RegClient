import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DanceForm from "./DancerForm";
import { _fields } from "../config";

const DancerRow = (props) => {
  const dancer = props.dancer;
  const showNoteRow = props.showNoteRow;
  const setUpEdit = props.setUpEdit;
  const selectedRow = props.selectedRow;
  const showNote = props.showNote;
  const deleteDancer = props.deleteDancer;
  const setSelectedRow = props.setSelectedRow;
  const resetField = props.resetField;
  const getDancers = props.getDancers;

  const theme = useTheme();

  if (selectedRow === dancer.orderId) {
    return (
      <DanceForm
        dancer={dancer}
        resetField={resetField}
        setSelectedRow={setSelectedRow}
        deleteDancer={deleteDancer}
        getDancers={getDancers}
      />
    );
  }

  const DanceRows = () => {
    const exclude = ["unit_amount", "quantity"];
    return (
      <>
        {Object.entries(_fields)
          .filter((f) => exclude.indexOf(f[0]) === -1)
          .map((field, index) => {
            //console.log(field);
            return (
              <div key={index} style={{ textAlign: "left", width: 180 }}>
                {dancer[field[0]]}
              </div>
            );
          })}
      </>
    );
  };
  return (
    <div
      id={dancer.orderId}
      onClick={() => setUpEdit(dancer)}
      style={{
        cursor: "pointer",
        backgroundColor:
          selectedRow === dancer.orderId
            ? theme.palette.grey[300]
            : showNote === dancer.orderId
            ? theme.palette.grey[200]
            : "#fff",
        color:
          selectedRow === dancer.orderId
            ? "#000" //theme.palette.info.contrastText
            : showNote === dancer.orderId
            ? "#000" //theme.palette.info.contrastText
            : "#000",
        // bacgroundColor: "green",
      }}
      key={"dancer"}
      onMouseOver={() => showNoteRow(dancer.orderId)}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <DanceRows />
        {/* <div style={{ width: 180, overflow: "hidden" }}>{dancer.firstname}</div>
        <div style={{ width: 200, overflow: "hidden" }}>{dancer.lastname}</div>
        <div style={{ width: 200, overflow: "hidden" }}>{dancer.email}</div>
        <div style={{ width: 100 }}>{dancer.phone}</div>
        <div style={{ width: 100 }}>{dancer.student ? "Yes" : "No"}</div>
        <div style={{ width: 100 }}>{dancer.housing ? "Yes" : "No"}</div>
        <div style={{ width: 100 }}>{dancer.dietary}</div>
        <div style={{ width: 100 }}>{dancer.waltzattend}</div>
        <div style={{ width: 100 }}>{dancer.price}</div> */}
        <div style={{ width: 200, textAlign: "left" }}>
          {new Date(dancer.createdOn).toLocaleString()}
        </div>
        <div style={{ width: 200 }}>{dancer.orderId}</div>
        <div
          className="noprint"
          style={{
            border: "1px none yellow",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Button
            className="noprint"
            style={{
              ...theme.typography.button2,
              display: "none",
              // width: 10,
              // marginLeft: 0,
              // marginRight: 0,
              padding: 0,
            }}
            variant="contained"
            onClick={() => setUpEdit(dancer)}
          >
            edit
          </Button>
          {/* <ConfirmButtons
            className="noprint"
            // icon={<CloseIcon />}

            label="Delete"
            action={deleteDancer}
            args={dancer.orderId}
          ></ConfirmButtons> */}
        </div>
      </div>
      <div
        style={{
          width: "fit-content",
          border: `2px solid ${theme.palette.info.light}`,
          // backgroundColor: theme.palette.info.light,
          // color: theme.palette.info.contrastText,
          display: showNote === dancer.orderId ? "block" : "block",
          borderRadius: 3,
          padding: 2,
          paddingTop: 0,
          margin: 3,
          marginTop: 0,
        }}
      >
        {dancer.note ? dancer.note : "no notes"}
      </div>

      <hr />
    </div>
  );
};

export default DancerRow;
