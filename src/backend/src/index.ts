import express from 'express';
import cors from 'cors';
import informationModel from './database/models';
import mongoose, { Model } from 'mongoose';
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
  const data = req.body;
  const creation = await informationModel.create(data);
  res.status(201).send(creation);
});



app.listen(port, () => console.log("Working ..."));