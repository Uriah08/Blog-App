import { connectDb } from "@/lib/config/db";
import BlogModel from "@/lib/models/blogModel";
const fs = require('fs')

const { NextResponse } = require("next/server");
import { writeFile } from 'fs/promises'

const LoadDB = async () => {
    connectDb();
}

LoadDB();

// API Endpoint for Fetching All Blogs
export async function GET(req){

    const blogId = req.nextUrl.searchParams.get("id")
    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json({blog})
    }else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({blog: blogs.length, blogs})
    }
}



// API Endpoint for Uploading Blogs
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

// API for deleting blog

export async function DELETE(req){
    const blogId = await req.nextUrl.searchParams.get("id")
    const blog = await BlogModel.findById(blogId)
    fs.unlink(`./public${blog.image}`,() => {

    })
    await BlogModel.findByIdAndDelete(blogId)
    return NextResponse.json({msg:"Blog deleted successfully"})
}