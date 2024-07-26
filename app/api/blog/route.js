import { connectDb } from "@/lib/config/db";
import BlogModel from "@/lib/models/blogModel";

const { NextResponse } = require("next/server");
import { writeFile } from 'fs/promises'

const LoadDB = async () => {
    connectDb();
}

LoadDB();

export async function POST(req){
    const formData = await req.formData()
    const timestamp = Date.now()

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;

    await writeFile(path, buffer);

    const imageUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        author:`${formData.get('author')}`,
        author_img:`${formData.get('author_img')}`,
        category:`${formData.get('category')}`,
        image: imageUrl,
    }

    await BlogModel.create(blogData);
    console.log('Blog saved');

    return NextResponse.json({msg:"Uploaded successfully", msgs: blogData})
}