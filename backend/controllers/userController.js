const userModel = require('../models/userModel')
const becrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerController = async(req,res) =>{
    try{
        const {username,email,password}=req.body

        if(!username || !email || !password){
            return res.status(400).send({
                message:'Please fill all the fields',
                success:false
            })
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(409).send({
                success:false,
                message:'User already exists'
            })
        }

        const hashedPassword = await becrypt.hash(password,5)



        const user = new userModel({username,email,password:hashedPassword})
        await user.save()

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return res.status(201).send({
            success:true,
            message:'New user created successfully',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })   

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:'Error in register',
            success:false,
            error
        })   
     }
}

exports.getAllUsers = async(req,res)=>{
    try{
        const users = await userModel.find({})
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:"All users data ",
            users
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in getting all users',
            error
        })
    }

}

exports.loginController = async(req,res)=>{
    try{
        const {email,password}=req.body

        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:'please provide email and password'
            })
        }


        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'

            })
        }

    const isMatch = await becrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).send({
            success:false,
            message:'Invalid password'
        })

    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    return res.status(200).send({
        success:true,
        message:'login successfully',
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    }) 



    }catch(error){
        console.log(error)
         return res.status(500).send({
            success:false,
            message:'error in login credentials',
            error
         })
    }
}

