import Ticket from "../../../(models)/Ticket"
import { NextResponse } from "next/server"

export async function GET(req, {params}) {
   try{
    const {id} = params
    const foundTicket = await Ticket.findOne({_id: id})

    return NextResponse.json({foundTicket}, {status: 200})
    }
    catch(err) {
        return NextResponse.json({message: "error", err}, {status: 500})
    }
}

export async function DELETE(req, {params}) {
    try {
        const {id} = params
        await Ticket.findByIdAndDelete(id)

        return NextResponse.json({message: "⛔🤘✔👍Ticket Deleted"}, {status: 200})
    }catch(err) {
        return NextResponse.json({message: "error", err}, {status: 500})

    }
}

export async function PUT(req, {params}) {
    try {
        const {id} = params
        const body = await req.json();
        const ticketData = body.formData

        const updateTicketData = await Ticket.findByIdAndUpdate(id, {
            ...ticketData
        })

        return NextResponse.json({message: "✔🤘Ticket Updated"}, {status: 200})
    }catch(err) {
        return NextResponse.json({message: "error", err}, {status: 500})

    }
}