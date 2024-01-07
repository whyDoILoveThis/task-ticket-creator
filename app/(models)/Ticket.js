import mongoose, { Schema } from "mongoose";


console.log('🔃CONNECTING TO MONGODB....');
try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('🟢MONGO DB CONNECTION SUCCESS')
}catch(err) {
    console.log('⛔ ISSUE CONNECTING TO MONGO DB::  ', err);
    
}
mongoose.Promise = global.Promise

const ticketSchema = new Schema(
    {
        title: String,
        description: String,
        category: String,
        priority: Number,
        progress: Number,
        status: String,
        active: Boolean,
    },
    {
        timestamps: true,
    }
);


const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)
export default Ticket
