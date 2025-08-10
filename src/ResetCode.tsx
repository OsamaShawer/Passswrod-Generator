import { Button, Paper, TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
function ResetCode() {
  let transfer = useNavigate();
  let [code, setCode] = useState({ code: "" });
  let [visibilityCode, setVisibilityCode] = useState(false);
  function change(e: ChangeEvent<HTMLInputElement>) {
    setCode({ code: e.target.value });
    console.log(code);
  }
  async function handleSubmit() {
    setVisibilityCode(false);
    const response = await fetch("http://localhost:3000/reset/code", {
      method: "POST",
      body: JSON.stringify(code),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseJson = await response.json();
    if (response.status === 200 && responseJson.message === "Right Code") {
      transfer("/reset/password");
      return;
    } else {
      setVisibilityCode(true);
    }
  }
  return (
    <>
      <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "500px",padding: "30px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <p>We sent you a code which has</p>
        <b>6 digits</b>
        <TextField onChange={change} name="code" variant="standard" label="Code"></TextField>
          <div style={{ display: visibilityCode ? "flex" : "none"}} className="validation-parent">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <p className="validation">Wrong Password</p>
          </div>
          <Button sx={{ width: "100%" }} onClick={handleSubmit} variant="contained">Submit</Button>
      </Paper>
    </>
  );
}

export default ResetCode;