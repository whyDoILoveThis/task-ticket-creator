// app/api/Projects/route.js
import Project from "../../(models)/Project";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    if (!mongoose.connections[0].readyState) {
     console.log('🔃CONNECTING TO MONGODB....');
     try {
         await mongoose.connect('mongodb+srv://TicketMaster:BLackBitch5764@cluster0.fowyzvn.mongodb.net/TaskTicketDB');
     
         console.log('🟢MONGO DB CONNECTION SUCCESS')
     }catch(err) {
         console.log('⛔ ISSUE CONNECTING TO MONGO DB::  ', err);
         
     }
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    console.error("❌ Failed to fetch projects:", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}


// app/api/Projects/route.js
export async function POST(req) {
  try {
    if (!mongoose.connections[0].readyState) {
     console.log('🔃CONNECTING TO MONGODB....');
     try {
         await mongoose.connect('mongodb+srv://TicketMaster:BLackBitch5764@cluster0.fowyzvn.mongodb.net/TaskTicketDB');
     
         console.log('🟢MONGO DB CONNECTION SUCCESS')
     }catch(err) {
         console.log('⛔ ISSUE CONNECTING TO MONGO DB::  ', err);
         
     }
    }

    const body = await req.json();
    const newProject = await Project.create({
      name: body.name,
      description: body.description,
      active: true,
    });

    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (err) {
    console.error("❌ Failed to create project:", err);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

