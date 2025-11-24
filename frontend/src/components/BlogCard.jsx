import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axiosConfig';


export default function BlogCard({
  id,
  title,
  description,
  image,
  username,
  time,
  isUser,
}) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 150;

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async()=>{
    try{
      const {data} = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
      if(data?.success){
        alert('Blog Deleted Successfully')
        window.location.reload();
      }
    }catch(error){
        console.log(error)
    }
  }

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
        display: "flex",
        flexDirection: "column",
        minHeight: "400px",
      }}
    >
      {isUser && (
        <Box display={'flex'}>
          <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}>
            <EditIcon  color = "info"/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color = "error"/>
          </IconButton>
        </Box>

      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            {username?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>
        }
        title={username || "Unknown User"}
        subheader={time ? new Date(time).toLocaleDateString() : ""}
      />
      {image && (
        <CardMedia component="img" height="194" image={image} alt={title} />
      )}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Title : {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
          Description : {expanded || description.length <= MAX_LENGTH
            ? description
            : `${description.substring(0, MAX_LENGTH)}...`}
        </Typography>
        {description.length > MAX_LENGTH && (
          <Button
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ textTransform: "none", p: 0, minWidth: 0 }}
          >
            {expanded ? "Read Less" : "Read More"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
