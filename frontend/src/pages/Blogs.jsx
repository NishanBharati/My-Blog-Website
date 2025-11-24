import React,{useState,useEffect} from 'react'
import axios from '../utils/axiosConfig'
import BlogCard from '../components/BlogCard'
import { Box, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Blogs = () => {
  const [blogs,setBlogs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

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
          placeholder="Search blogs by title or description..."
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

      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
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
        ))
      ) : (
        <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>No blogs found</h2>
          <p>Try adjusting your search</p>
        </Box>
      )}
    </Box>
  )
}

export default Blogs
