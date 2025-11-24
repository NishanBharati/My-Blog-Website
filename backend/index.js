const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
dotenv.config()
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

connectDb();

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog',blogRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)

})