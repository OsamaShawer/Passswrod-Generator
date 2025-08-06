import mongoose, { Document, Schema } from "mongoose";

interface InterInformaion extends Document {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

const informationSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }
});

const informationModel = mongoose.model<InterInformaion>("Informations", informationSchema);

export default informationModel;