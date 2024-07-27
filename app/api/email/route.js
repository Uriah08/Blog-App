import { connectDb } from "@/lib/config/db";
import EmailModel from "@/lib/models/emailModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
    await connectDb()
}

loadDB()

export async function POST(req){
    const formData = await req.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({success:true,msg:'Email Subscribed'})
}

export async function GET(req){
    const emails = await EmailModel.find({})
    return NextResponse.json({emails})
}

export async function DELETE(req){
    const emailId = await req.nextUrl.searchParams.get("id")
    await EmailModel.findByIdAndDelete(emailId)
    return NextResponse.json({success:true,msg:'Email deleted successfully'})
}