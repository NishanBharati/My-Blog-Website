import React,{useState,useEffect} from 'react'
import axios from '../utils/axiosConfig'
import BlogCard from '../components/BlogCard'

const Blogs = () => {
  const [blogs,setBlogs] = useState([])

const getAllBlogs = async()=>{
  try{
    const {data} = await axios.get('/api/v1/blog/all-blogs')
    if(data && data.success){
      setBlogs(data.blogs)
    }
  }catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  getAllBlogs()

},[])

  return (
    <div>
      {blogs && blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog?.user?._id}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          username={blog.user?.username}
          time={blog.createdAt}
        />
      ))}
    </div>
  )
}

export default Blogs
