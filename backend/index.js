const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./schema/UserSchema.js');
require('./dbConnection.js');
const dotenv = require('dotenv');
const cors = require('cors');
const multer=require('multer')
const path = require('path'); 
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; 


const formatDatatoSend=(user)=>{
    return{
        name:user.name,
        email:user.email,
        image:user.image
    }
}

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images/'); 
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });
app.post("/signup", (req, res) => {
    let { name, email, password } = req.body;
    if (!name || name.length < 3) {
        return res.status(403).json({ "error": "Name must be 3 letters long" });
    }
    if (!email || !email.length) {
        return res.status(403).json({ "error": "Enter email" });
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Invalid email format" });
    }
    if (!password || !passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter" });
    }
    bcrypt.hash(password, 10, async (err, hashed_password) => {
        if (err) {
            return res.status(500).json({ "error": "Error hashing password" });
        }
        let user = new User({
            name: name,
            email: email,
            password: hashed_password,
            image: null, 
            authType: "manual"
        });        
        user.save()
            .then((u) => {
                return res.status(200).json(formatDatatoSend(u));
            })
            .catch(err => {
                if (err.code == 11000) {
                    return res.status(500).json({ "error": "Email already exists" });
                }
                return res.status(500).json({ "error": err.message });
            });
    });
});

app.post("/login",(req,res)=>{
    let {email,password}=req.body;
    User.findOne({email:email})
    .then((user)=>{
        if(!user){
            return res.status(404).json({ "error": "Email not found" });
        }
        if(user.authType!== "google"){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    return res.status(403).json({"error":"Some error occured!! Please try again"})
                }
                if(!result){
                    return res.status(403).json({"error":"Incorrect password!! Please try again"})
                }else{
                    return res.status(200).json(formatDatatoSend(user));
                }
            });
        }
        else {
            return res.status(403).json({ "error": "Please log in using Google authentication." });
        }
    })
    .catch(err=>{
        return res.status(500).json({"error":err.message})
    })
});


app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})