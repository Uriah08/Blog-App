'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { assets } from '@/assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author:"Alex Bernett",
    author_img:"/author_img.png"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    console.log(data);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('author_img', data.author_img);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/blog', formData);

      toast.success(response.data.msg);
      setImage(null)
      setData({
        title: "",
        description: "",
        category: "Startup",
        author:"Alex Bernett",
        author_img:"/author_img.png"
      })
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            width={140}
            height={70}
            alt='thumbnail'
            className='mt-4 w-[140px] h-[70px]'
            priority={true}
          />
        </label>
        <input onChange={onImageChange} type="file" id='image' hidden required />
        <p className='text-xl mt-4'>Blog Title</p>
        <input
          name='title'
          onChange={onChangeHandler}
          value={data.title}
          type="text"
          placeholder='Enter blog title'
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          required
        />
        <p className='text-xl mt-4'>Blog Description</p>
        <textarea
          name='description'
          onChange={onChangeHandler}
          value={data.description}
          placeholder='Enter blog description'
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          rows={6}
          required
        />
        <p className='text-xl mt-4'>Blog Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className='w-40 mt-4 py-3 border text-gray-500'
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type='submit' className='mt-4 w-40 h-12 bg-black text-white'>
          Add
        </button>
      </form>
    </>
  );
};

export default Page;
