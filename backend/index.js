import express from 'express';
import bcrypt from 'bcrypt';
import User from './schema/UserSchema.js';
import './dbConnection.js'; 
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import googleService from './hidden-heaven-of-mnnit-94fab-firebase-adminsdk-amnju-e80144a671.json' assert { type: 'json' }; // Use assert for JSON import if needed

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
admin.initializeApp({
    credential:admin.credential.cert(googleService)
})

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; 


const formatDatatoSend=(user)=>{
    const access_token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    return{
        access_token,
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

app.post("/google-auth",async(req,res)=>{
    let {access_token}=req.body;
    getAuth()
    .verifyIdToken(access_token)
    .then(async (decodeUser) => {
        let {email,name,picture}=decodeUser;
        picture=picture.replace("s96-c","s384-c") //resolution
        let user = await User.findOne({ email: email });
        if(user){
            if(user.authType=="manual"){
                return res.status(403).json({"error":"This email was signed up without google.Please login with password to access the account"})
            }
        }
        else{
            let user = new User({
                name: name,
                email: email,
                image:picture,
                authType: "google"
            });  
            await user.save().then((u)=>{
                user=u;
            })
            .catch((err)=>{
                return res.status(500).json({"error":err.message})
            })
        }
        return res.status(200).json(formatDatatoSend(user))
    })
    .catch((err)=>{
        return res.status(500).json({"error":"Failed to authenticate with google"})
    })
    })


app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})