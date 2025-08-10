import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Sign";
import RegisterComponent from "./Register";
import SendCode from "./RegisterCodeMail";
import LogicComponent from "./Logic";
import ResetComponent from "./Reset";
import ResetCode from "./ResetCode";
import ResetPassword from "./ResetPassword";
import ShowUsers from "./Users";
// import LogicComponent from "./Logic";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<SignIn />}></Route>
        <Route path="/secret"  element={<ShowUsers />}></Route>
        <Route path="/reset"  element={<ResetComponent />}></Route>
        <Route path="/reset/code"  element={<ResetCode />}></Route>
        <Route path="/reset/password"  element={<ResetPassword />}></Route>
        <Route path="/register"  element={<RegisterComponent />}></Route>
        <Route path="/register/code"  element={<SendCode />}></Route>
        <Route path="/password-generator"  element={<LogicComponent />}></Route>
      </Routes>
    </BrowserRouter>
    // <LogicComponent />
  );
}

export default App;