import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Sign";
import RegisterComponent from "./Register";
import SendCode from "./RegisterCodeMail";
// import LogicComponent from "./Logic";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<SignIn />}></Route>
        <Route path="/register"  element={<RegisterComponent />}></Route>
        <Route path="/register/code"  element={<SendCode />}></Route>
      </Routes>
    </BrowserRouter>
    // <LogicComponent />
  );
}

export default App;