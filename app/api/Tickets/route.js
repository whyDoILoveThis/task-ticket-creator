import Ticket from "../../(models)/Ticket";

import { NextResponse } from "next/server";

export async function POST(req) {
    console.log('POST REQ...');
    try {
        const body = await req.json();
        const ticketData = body.formData;
        
        try {
            await Ticket.create(ticketData);
            console.log('🎊🎉👏🥳🎉🎊Ticket creation successful✔🤘✔'); // Log success message
            return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
        } catch (err) {
            console.error('😡 Error creating Ticket:', err); // Log specific error details
            return NextResponse.json({ message: 'error', err }, { status: 500 });
        }
        
    } catch (err) {
        console.error('😡 Error parsing request JSON:', err); // Log specific error details
        return NextResponse.json({ message: 'error', err }, { status: 500 });
    }
}

export async function GET() {
    try {
        const tickets = await Ticket.find();
        return NextResponse.json({ tickets }, { status: 200 });

    }catch(err) {
        return NextResponse.json({ message: 'error', err }, { status: 500 });
    }
}




export async function DELETE(req, { params }) {
  try {

    const { id } = params;

    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return NextResponse.json({ message: "❌ Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "🗑️ Ticket deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ message: "❌ Error deleting ticket", err }, { status: 500 });
  }
}