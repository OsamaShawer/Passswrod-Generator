import "./App.css";
import { TextField } from "@mui/material";
import { Paper } from "@mui/material";
import { use, useState, type ChangeEvent } from "react";
function App() {
  let charactersLower = "abcdefghigclmnopqrstuvwxyz";
  let charactersUpper = "abcdefghigclmnopqrstuvwxyz".toUpperCase();
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let specialChar = "!%#";
  let randomCharLowerIndex = Math.floor(Math.random() * (charactersLower.length));
  let randomCharUpperIndex = Math.floor(Math.random() * (charactersLower.length));
  let randomNumberIndex = Math.floor(Math.random() * (numbers.length));
  let randomSpecialIndex = Math.floor(Math.random() * (specialChar.length));
  const [clickedNumbers, setClickedNumbers] = useState(false);
  const [clickedSpecial, setClickedSpecial] = useState(false);
  let [passwords, setPasswords] = useState<string[]>([]);
  // let randomAll = Math.floor(Math.random() * 4);
  let [times, setTimes] =  useState<number>(0);
  let randomAll = Math.floor(Math.random() * 4);
  let result = "";
  for (let i = times; i > 0; i--) {
    randomCharLowerIndex = Math.floor(Math.random() * (charactersLower.length));
    randomCharUpperIndex = Math.floor(Math.random() * (charactersLower.length));
    randomNumberIndex = Math.floor(Math.random() * (numbers.length));
    randomSpecialIndex = Math.floor(Math.random() * (specialChar.length));
    if (clickedNumbers && clickedSpecial) {
      randomAll = Math.floor(Math.random() * 4);
    } else if (clickedNumbers && !clickedSpecial) {
      randomAll = Math.floor(Math.random() * 3);
    } else if (!clickedNumbers && clickedSpecial) {
      randomAll = Math.floor(Math.random() * 4);
      if (randomAll === 2) {
        randomAll = 3;
      }
    } else if (!clickedNumbers && !clickedSpecial){
      randomAll = Math.floor(Math.random() * 2);
    } else {
      randomAll = Math.floor(Math.random() * 4);
      
    }
    if (randomAll === 0) {
      result += charactersLower[randomCharLowerIndex];
    } else if (randomAll === 1) {
      result += charactersUpper[randomCharUpperIndex];
    } else if (randomAll === 2) {
      result += numbers[randomNumberIndex];
    } else if (randomAll === 3) {
      result += specialChar[randomSpecialIndex];
    }
  }
  let appearing = "Password Will Appear Here";
  
  let [appear, setApprear] = useState("Password Will Appear Here");
  
  console.log(result);
  return (
    <>
    <h2 className="center">Password Generator With Options</h2>
    <div className="page">
      <div className="container">
        <div className="form">
          <div className="length">
            <p>Password Length</p>
            <input onChange={ (e: ChangeEvent<HTMLInputElement>) =>  setTimes(parseInt(e.target.value)) } style={{ margin: "20px 0", padding: "6px", borderRadius: "5px" }} type="text" pattern="^[0-9]{1,32}$" placeholder="Passowrd(1-32)" minLength={1} maxLength={32} />
          </div>
          <div className="is-number">
            <p>Number</p>
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.currentTarget; // safer than e.target
                const currentColor = target.style.backgroundColor;
                setClickedNumbers(!clickedNumbers);
                if (currentColor === "rgb(255, 255, 255)" || currentColor === "") {
                  target.style.backgroundColor = "rgb(215, 0, 0)";
                } else if (currentColor === "rgb(215, 0, 0)") {
                  target.style.backgroundColor = "rgb(255, 255, 255)";
                }
              }}
              className="true-number"
            />
          </div>
          <div className="special">
            <p>Special Charecters</p>
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.currentTarget; // safer than e.target
                const currentColor = target.style.backgroundColor;
                setClickedSpecial(!clickedSpecial);
                if (currentColor === "rgb(255, 255, 255)" || currentColor === "") {
                  target.style.backgroundColor = "rgb(215, 0, 0)";
                } else if (currentColor === "rgb(215, 0, 0)") {
                  target.style.backgroundColor = "rgb(255, 255, 255)";
                }
              }}className="true-special"></div>
          </div>
        </div>
        <button onClick={() => {
          setApprear(result);
          setPasswords([...passwords, result]);
        }} className="generate-button">Generate Password</button>
        <div className="appear">{appear}</div>
        {/* <div className="last">Lastest 10 Generaterd Passwords</div> */}
        <div className="here">Passwords Will Show Here</div>
        <div className="passwords-parent">
          {passwords.map((pwd) => (
            <div className="passwords">{pwd}</div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
