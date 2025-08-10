import { Button, Paper, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const transfer = useNavigate();
  let [pass, setPass] = useState({ newPassword: "", confirmPassword: "" });
  let [length, setLength] = useState(false);
  let [dif, setDif] = useState(false);
  function change(element: ChangeEvent<HTMLInputElement>) {
    setPass({...pass, [element.target.name]: element.target.value});
    console.log(pass);
  }
  async function handleSubmit() {
    setDif(false);
    setLength(false);
    const response = await fetch("http://localhost:3000/reset/password", {
      method: "POST",
      body: JSON.stringify(pass),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseJson = await response.json();
    if (response.status === 400 && responseJson.message === "Passwords do not match") {
      setDif(true);
    }
    if (response.status === 400 && responseJson.message === "Password too short") {
      setLength(true);
    }
    if (response.status === 200) {
      transfer("/");
    }
  }
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "500px",padding: "30px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <h3>Now you are ready to reset your password</h3>
      <TextField onChange={change} sx={{ width: "100%" }} variant="outlined" label="New Password" name="newPassword"></TextField>
      <TextField onChange={change} sx={{ width: "100%" }} variant="outlined" label="Confirm Password" name="confirmPassword"></TextField>
      <div style={{ display: length ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Should be more than 8</p>
      </div>
      <div style={{ display: dif ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Not the same of the first</p>
      </div>
      <Button onClick={handleSubmit} variant="contained" sx={{ width: "100%" }}>Submit</Button>
    </Paper>
  );
}

export default ResetPassword;