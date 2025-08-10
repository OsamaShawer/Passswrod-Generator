import { Button, Paper, TextField } from "@mui/material";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
function ResetComponent() {
  let transfer = useNavigate();
  let [visibilityEmail, setVisibilityEmail] = useState(false);
  let [email, setEmail] = useState({ email: "" });
  async function handleSubmit() {
    setVisibilityEmail(false);
    const response = await fetch("http://localhost:3000/reset", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const dataResponse = await response.json();
    if (response.status === 200 && dataResponse.message === "Found") {
      transfer("/reset/code");
    } else {
      setVisibilityEmail(true);
      return;
    }
  }
  function change(e: ChangeEvent<HTMLInputElement>) {
    setEmail({ email: e.target.value });
    console.log(email);
  }
  return (
    <>
      <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "500px",padding: "30px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <p>Write your email we will send you a code</p>
        <p>To reset your password</p>
        <TextField onChange={change} name="email" variant="outlined" label="Email"></TextField>
          <div style={{ display: visibilityEmail ? "flex" : "none"}} className="validation-parent">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <p className="validation">Email Not Registered</p>
          </div>
          <Button sx={{ width: "100%" }} onClick={handleSubmit} variant="contained">Submit</Button>
      </Paper>
    </>
  );
}

export default ResetComponent;