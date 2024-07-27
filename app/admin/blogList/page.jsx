'use client';
import BlogTableItem from '@/components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      // Check if response.data is an array
      if (Array.isArray(response.data.blogs)) {
        setBlogs(response.data.blogs);
      } else {
        console.error('Unexpected response format:', response.data);
        setBlogs([]); // Set to empty array to avoid map error
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]); // Set to empty array in case of error
    }
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete('/api/blog',{
      params: { id: mongoId }
    })
    toast.success(response.data.msg)
    fetchBlogs()
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-26'>
      <h1>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Author Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Blog Title
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} author_img={item.author_img} date={item.date} deleteBlog={deleteBlog}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
