const mongoose = require('mongoose')
const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')

exports.getAllBlogsController = async(req,res)=>{ 
    try{
        const blogs = await blogModel.find({}).populate("user");

        if(blogs.length === 0){
            return res.status(404).send({
                success:false,
                message:"No blogs found"
             })
        }

        return res.status(200).send({
            success:true,
            BlogCount :blogs.length,
            message:"All blogs list",
            blogs
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error while getting blogs",
            error
        })
    }

}

exports.createBlogController = async(req,res)=>{
    try{
        const {title,description,image, user} = req.body
        
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:"Please provide all fields"
        })
    }

    const existingUser = await userModel.findById(user)
    if(!existingUser){
        return res.status(404).send({
            success:false,
            message:"User not found"
        })
    }





    const newBlog = new blogModel({title,description,image,user})

    const session = await mongoose.startSession()
    session.startTransaction()
    await newBlog.save({session})
    existingUser.blogs.push(newBlog)
    await existingUser.save({session})
    await session.commitTransaction()

    return res.status(201).send({
        success:true,
        message:"Blog created successfully",
        newBlog
    })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error while creating blog",
            error
        })
    }
}


exports.updateBlogController = async(req,res)=>{
    try{
        const {id} = req.params
        const{title,description,image}=req.body

        const blog = await blogModel.findByIdAndUpdate(id,{title,description,image},{new:true})

        if(!blog){
            return res.status(404).send({
                success:false,
                message:"Blog not found"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Blog updated successfully",
            blog
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while updating blog",
            error
        })
    }
}

exports.getBlogByIdController= async(req,res)=>{
    try{
        const {id}=req.params
        const blog = await blogModel.findById(id)

        if(!blog){
            return res.status(404).send({
                success:false,
                message:"Blog not found"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Single blog fetched",
            blog
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while getting single blog",
            error
        })
    }
}

exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel
            .findById(req.params.id)
            .populate("user");

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found"
            });
        }

        if (!blog.user) {
            return res.status(500).send({
                success: false,
                message: "User not found for this blog"
            });
        }

        blog.user.blogs.pull(blog._id);
        await blog.user.save();
        await blog.deleteOne();

        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while deleting blog",
            error
        });
    }
};

exports.userBlogController=async(req,res)=>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate({
            path: "blogs",
            populate: { path: "user", select: "username" }
        })

        if(!userBlog){
            return res.status(500).send({
                success:false,
                message:"Blogs not found with this id"
            
            })
        }
        return res.status(200).send({
            success:true,
            message:"User blog fetched successfully",
            userBlog
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while getting user blog",
            error
        })
    }

}
