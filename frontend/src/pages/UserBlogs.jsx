import React,{useState,useEffect} from 'react'
import axios from '../utils/axiosConfig'
import BlogCard from '../components/BlogCard'
import { Box, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'


const UserBlogs = () => {
  const [blogs,setBlogs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const getUserBlogs = async()=>{
    try{
      const id = localStorage.getItem("userId")
      const {data} = await axios.get(`/api/v1/blog/user-blog/${id}`)
      if(data?.success){
        setBlogs(data?.userBlog.blogs)
      }

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getUserBlogs()
  },[]);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box sx={{
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    }}>
      <Box sx={{ 
        maxWidth: '1200px', 
        margin: '0 auto 30px auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: 2
      }}>
        <TextField
          fullWidth
          placeholder="Search your blogs by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredBlogs && filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <Box sx={{ textAlign: 'center', color: '#333', marginTop: '50px' }}>
          <h1>{blogs.length === 0 ? "You haven't created a blog" : "No blogs found"}</h1>
          {blogs.length > 0 && <p>Try adjusting your search</p>}
        </Box>
      )}
    </Box>
  )
}

export default UserBlogs
