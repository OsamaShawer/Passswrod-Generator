import express from "express";
import cors from "cors";
import informationModel from "./database/models";
import mongoose, { Model } from "mongoose";
import nodemailer from "nodemailer";
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let result = "";
for (let i = 0; i <= 5; i++) {
  result += (numbers[Math.floor(Math.random() * 10)]).toString();
}
const app = express();
mongoose.connect("mongodb://localhost:27017/Information");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
const port = 3000;



const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "944467001@smtp-brevo.com",
    pass: "mvyOQ3xX6ZgGF9pN",
  },
  tls: {
    rejectUnauthorized: false, // Only needed if you get certificate errors
  },
});

async function send(email: string, username: string, code: string) {
  try {
    const info = await transporter.sendMail({
      from: '"Osama" <brbrbr.ps@gmail.com>', // Must be verified in Brevo
      to: email,
      subject: "First Email!",
      html: `
      <h1>Welcome ${username}</h1>
      <p>The Security Code is: ${code}</p>
      <p>Please Don't share this code with anyone</p>
      `,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}



// toString()





app.get("/", (req, res) => {
  res.send("Express Is Working On Express");
});

app.get("/register", async (req, res) => {
  const data = await informationModel.find();
  res.send(data);
});
let information = { username: "", email: "", password: "", confirmPassword: "" };
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password, confirmPassword } = req.body;
  information = {username: username, email: email, password: password, confirmPassword: confirmPassword};

  try {
    const emailExists = await informationModel.findOne({ email });
    if (emailExists) {
      res.status(409).json({ message: "Email is registered" });
      return;
    }
    const usernameExists = await informationModel.findOne({ username });
    if (usernameExists) {
      res.status(409).json({ message: "Username is taken" });
      return;
    }
    await send(email, username, result);
    console.log("SENT");
    res.status(200).json({ message: "Registered" })

  } catch (err) { console.log(err); }
});
app.get("/register/code", (req, res) => {res.send("Hello");});
app.post('/register/code', async (req, res) => {
  const value = req.body;
  console.log(req.body.code);
  if (req.body.code == result) {
    // console.log(value);
    const creation = await informationModel.create(information);

    res.status(200).json({ message: "Registered" });
  } else if (req.body.code != result) {
    res.status(404).json({ message: "Wrong code" })
  }
})
app.listen(port, () => console.log("Working ...on port " + port));