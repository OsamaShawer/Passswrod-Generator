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
  let [visibilityEmailRegister, setVisibilityEmailRegister] = useState(false);
  let [visibilityUserName, setVisibilityUserName] = useState(false);
  let [visibilityUserNameRegister, setVisibilityUserNameRegister] = useState(false);
  let [visibilityPassword, setVisibilityPassword] = useState(false);
  let [visibilityConfirmPassword, setVisibilityConfirmPassword] = useState(false);
  let [userInfo, setUserInfo] = useState({username: "", email: "", password: "", confirmPassword: ""});
  let transfer = useNavigate();
  let emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  function change(e: ChangeEvent<HTMLInputElement>) {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  async function handleSubmit(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setVisibilityEmail(false);
    setVisibilityUserName(false);
    setVisibilityPassword(false);
    setVisibilityConfirmPassword(false);
    setVisibilityEmailRegister(false);
    setVisibilityUserNameRegister(false);
    console.log("Hello");
    if (!emailValidator.test(userInfo.email)) {
      setVisibilityEmail(true);
      return;
    } else if (userInfo.username === "") {
      setVisibilityUserName(true);
      return;
    } else if (userInfo.password === "") {
      setVisibilityPassword(true);
      return;
    } else if (userInfo.password !== userInfo.confirmPassword) {
      setVisibilityConfirmPassword(true);
      return;
    }
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await response.json()
    if (response.status === 409 && result.message === "Username is taken") {
      setVisibilityUserNameRegister(true);
      return;
    } else if (response.status === 409 && result.message === "Email is registered") {
      setVisibilityEmailRegister(true);
      return;
    } else {
      // postingData(userInfo);
      setUserInfo({username: "", email: "", password: "", confirmPassword: ""});
      transfer("/register/code");
    }
  }
      // const data = await postingData(userInfo);
      // setUserInfo([...userInfo, data]);
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
      <div style={{display: visibilityUserNameRegister ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Username is taken</p>
      </div>
      <FontAwesomeIcon className="email-icon2" icon={faEnvelope} />
      <TextField onChange={change} label="Email" variant="outlined" name="email"></TextField>
      <div style={{display: visibilityEmail ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Invalid Email</p>
      </div>
      <div style={{display: visibilityEmailRegister ? "flex" : "none"}} className="validation-parent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <p className="validation">Registered Email</p>
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