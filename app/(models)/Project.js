// models/Project.js
import mongoose, { Schema } from "mongoose";

console.log('🔃CONNECTING TO MONGODB....');
try {
    await mongoose.connect('mongodb+srv://TicketMaster:BLackBitch5764@cluster0.fowyzvn.mongodb.net/TaskTicketDB');

    console.log('🟢MONGO DB CONNECTION SUCCESS')
}catch(err) {
    console.log('⛔ ISSUE CONNECTING TO MONGO DB::  ', err);
    
}
mongoose.Promise = global.Promise


const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
