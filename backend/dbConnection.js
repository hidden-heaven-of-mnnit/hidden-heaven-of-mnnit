require('dotenv').config();
const mongoose=require('mongoose'); 
mongoose.connect(process.env.DB_URL,{
    autoIndex:true
})