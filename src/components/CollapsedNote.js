import React, { useState } from "react";
import {
  //   Checkbox,
  //   FormControlLabel,
  //   FormGroup,
  //   Select,
  //   MenuItem,
  Button,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

const CollapsedNote = ({ prompt, note }) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  return (
    <div style={{ display: "inline", marginLeft: 5 }}>
      <a
        onClick={() => setShow(!show)}
        style={{
          cursor: "pointer",
          ...theme.typography.littleLink,
          display: show ? "none" : "inline",
        }}
      >
        {prompt}
      </a>

      <pre
        onMouseLeave={() => setShow(false)}
        style={{
          border: "1px solid black",
          display: show ? "inline" : "none",
          margin: 5,
          padding: 0,
        }}
      >
        {note}
      </pre>
    </div>
  );
};

export default CollapsedNote;
