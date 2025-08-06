import { Button, Paper, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faUser, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import postingData from "./API/connection";
function RegisterComponent() {

  // let info = {username: "", email: "", password: ""};
  // let data = ;
  // useEffect(() => postingData, []);
  let [visibilityEmail, setVisibilityEmail] = useState(false);
  let [visibilityUserName, setVisibilityUserName] = useState(false);
  let [visibilityPassword, setVisibilityPassword] = useState(false);
  let [visibilityConfirmPassword, setVisibilityConfirmPassword] = useState(false);
  let [userInfo, setUserInfo] = useState({username: "", email: "", password: "", confirmPassword: ""});
  let transfer = useNavigate();
  let emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ig;
  function change(e: ChangeEvent<HTMLInputElement>) {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  async function handleSubmit(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setVisibilityEmail(false);
    setVisibilityUserName(false);
    setVisibilityPassword(false);
    setVisibilityConfirmPassword(false);
    if (!emailValidator.test(userInfo.email)) {
      setVisibilityEmail(true);
    } else if (userInfo.username === "") {
      setVisibilityUserName(true);
    } else if (userInfo.password === "") {
      setVisibilityPassword(true);
    } else if (userInfo.password !== userInfo.confirmPassword) {
      setVisibilityConfirmPassword(true);
    } else {
      postingData(userInfo);
      setUserInfo({username: "", email: "", password: "", confirmPassword: ""});
      transfer("/");
    } 
      // const data = await postingData(userInfo);
      // setUserInfo([...userInfo, data]);
    }
    // console.log("Hello");

  console.log(userInfo);
  return (
    <Paper sx={{ position: "absolute", display: "flex", flexDirection: "column", padding: "30px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px" }}>
      <h2 className="text-sign">Register</h2>
      <FontAwesomeIcon className="email-icon2" icon={faUser} />
      <TextField onChange={change} label="Username" variant="outlined" name="username"></TextField>
      <div style={{display: visibilityUserName ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Empty Username</p>
      </div>
      <FontAwesomeIcon className="email-icon2" icon={faEnvelope} />
      <TextField onChange={change} label="Email" variant="outlined" name="email"></TextField>
      <div style={{display: visibilityEmail ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Invalid Email</p>
      </div>
      {/* <script></script> */}
      <FontAwesomeIcon className="email-icon2" icon={faKey} />
      <TextField onChange={change} label="Password" variant="outlined" name="password"></TextField>
      <div style={{display: visibilityPassword ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Empty Password</p>
      </div>
      <FontAwesomeIcon className="email-icon2" icon={faKey} />
      <TextField onChange={change} label="Confirm Password" variant="outlined" name="confirmPassword"></TextField>
      <div style={{display: visibilityConfirmPassword ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Password Doesn't Equal The First One</p>
      </div>
      <Button onClick={handleSubmit} sx={{ marginTop: "10px" }} variant="contained">Register</Button>
    </Paper>
  );
}

export default RegisterComponent;
