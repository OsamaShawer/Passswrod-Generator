import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button, Paper, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css"
function SignIn() {
  return (
    <Paper sx={{ width: "500px",padding: "30px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      {/* <div className="parent-signin"> */}
        <h2 className="text-sign">Sign In</h2>
        <div className="form-sign">
          <FontAwesomeIcon className="email-icon" icon={faEnvelope} />
          
          <TextField label="Email" className="email" variant="outlined"></TextField>
          <FontAwesomeIcon className="email-icon" icon={faKey} />
          
          <TextField className="password" variant="outlined" type="password" label="Password">icon={}</TextField>
          <Button variant="contained">Sign In</Button>
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