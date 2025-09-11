import Project from "../../../(models)/Project";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Ticket from "../../../(models)/Ticket";

export async function DELETE(req, { params }) {
  try {
    // ensure DB connection
    if (!mongoose.connections[0].readyState) {
      console.log("🔃 CONNECTING TO MONGODB....");
      try {
        await mongoose.connect(
          "mongodb+srv://TicketMaster:BLackBitch5764@cluster0.fowyzvn.mongodb.net/TaskTicketDB"
        );
        console.log("🟢 MONGO DB CONNECTION SUCCESS");
      } catch (err) {
        console.log("⛔ ISSUE CONNECTING TO MONGO DB:: ", err);
      }
    }
    const { id } = params;

    // First delete all tickets linked to this project
    await Ticket.deleteMany({ id });

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { message: "❌ Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "🗑️ Project deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error deleting project:", err);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
