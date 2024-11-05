import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,   
    },
    password: {
        type: String,
        
    },
    image: {
        type: String,
        default: null, 
    },
    authType: {
        type: String,
        required: true, 
    }
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
