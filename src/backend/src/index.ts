import express from 'express';
import cors from 'cors';
import informationModel from './database/models';
import mongoose, { Model } from 'mongoose';
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "osamashawar7@gmail.com",
    pass: "happycat123"
  }
});
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const code = Math.floor(Math.random() * 10);
export let result = "";
for (let i = 0; i < 6; i++) {
  result += (numbers[code]).toString;
}
async function sendEmail(emailSent: string) {
  const mailOptions = {
    from: "osamashawar7@gmail.com",
    to: emailSent,
    subject: "Password Generator Code",
    html: `
      <div>
        <h1>Thank you to join us in this Password Generator</h1>
        <h3>Your security code is: ${+result}</h3>
      </div>
    `
  };
  try {
    const info = transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}

const app = express();
mongoose.connect("mongodb://localhost:27017/Information");
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send("Express Is Working On Express");
});
app.get("/register", async (req, res) => {
  const data = await informationModel.find();
  res.send(data);
})

app.post('/register', async (req, res) => {
  const {username, email, password} = req.body;
  try {
    const emailExists = await informationModel.findOne({ email });
    if (emailExists) {
      res.status(409).json({ message: "Email is registered" });
    } 
    const usernameExists = await informationModel.findOne({ username });
    if (usernameExists) {
      res.status(409).json({ message: "Username is taken" });
    }
    const creation = informationModel.create(req.body);
    res.status(201).send(creation);
  } catch (error) {
    console.log(error);
  }
});



app.listen(port, () => console.log("Working ...on port " + port));