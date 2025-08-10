import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Button, Paper, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css"
import { useState, type ChangeEvent } from "react";
function SignIn() {
  const transfer = useNavigate();
  const [ data, setData ] = useState({ email: "", passowrd: "" });
  let [visibilityEmail, setVisibilityEmail] = useState(false);
  let [visibilityPassword, setVisibilityPassword] = useState(false);
  function change(e: ChangeEvent<HTMLInputElement>) {
    setData({...data, [e.target.name]: e.target.value});
  }
  async function handleSubmitFetch() {
    setVisibilityEmail(false);
    setVisibilityPassword(false);
    const fetches = await fetch('http://localhost:3000', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const fetchesJson = await fetches.json();
    if (fetches.status === 200 && fetchesJson.message === "Signed") {
      transfer("/password-generator");
    } else if (fetches.status === 404 && fetchesJson.message === "Wrong Password") {
      setVisibilityPassword(true);
    } else {
      setVisibilityEmail(true);
    }
    // return await fetches.json();
  }
  return (
    <Paper sx={{ width: "500px",padding: "30px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      {/* <div className="parent-signin"> */}
        <h2 className="text-sign">Sign In</h2>
        <div className="form-sign">
          <FontAwesomeIcon className="email-icon" icon={faEnvelope} />
          <TextField onChange={change} name="email" label="Email" className="email" variant="outlined"></TextField>
          <div style={{ display: visibilityEmail ? "flex" : "none"}} className="validation-parent">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <p className="validation">Email Not Registered</p>
          </div>
          <FontAwesomeIcon className="email-icon" icon={faKey} />
          <TextField onChange={change} name="password" className="password" variant="outlined" type="password" label="Password">icon={}</TextField>
          <div style={{ display: visibilityPassword ? "flex" : "none"}} className="validation-parent">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <p className="validation">Wrong Password</p>
          </div>
          <Button onClick={handleSubmitFetch} variant="contained">Sign In</Button>
          <div className="texts-other">
            <Link to="/register" className="text-other">Create Account</Link>
            <Link to="/reset" className="text-other">Forgot Password</Link>
          </div>
        </div>
      {/* </div> */}
    </Paper>
  );
}
export default SignIn;