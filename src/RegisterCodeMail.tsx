import { Button, Paper, TextField } from "@mui/material";
// import { result } from "./backend/src/index"
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
function SendCode() {
  let [visibilityFailed, setVisibilityFailed] = useState(false);
  let result = "";
  for (let i = 0; i < 5; i++) {

  }
  function handleSubmit(e: ChangeEvent<HTMLInputElement>) {
    setVisibilityFailed(false);
    if (e.target.value == result) {
      const transfer = useNavigate();
      transfer("/");
    } else {
      setVisibilityFailed(true);
      return;
    }
  }
  return (
    <Paper className="parent-code">
      <p>You recived a code into your email which has: <b>6-digits-code</b></p>
      <TextField label="Code" variant="standard" inputProps={{ maxLength: 6, minLength: 6 }} ></TextField>
      <Button onClick={handleSubmit} variant="contained">Submit</Button>
      <div style={{ display: visibilityFailed ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Username is taken</p>
      </div>
    </Paper>
  );
}

export default SendCode;