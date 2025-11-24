const mongoose = require('mongoose')


const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connection Successful!!!!!!!")
    }catch(error){
        console.log("Connectioin Error in database")
    }
}

module.exports = connectDb