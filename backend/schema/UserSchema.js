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
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 
    },
    authType: {
        type: String,
        required: true, 
    }
});

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;
