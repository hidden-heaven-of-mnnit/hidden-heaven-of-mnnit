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
<<<<<<< HEAD
        
=======
>>>>>>> 403086d969f72971f19dca6f54eef0f9633044bb
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

<<<<<<< HEAD
const UserModel = mongoose.model("user", UserSchema);
=======
const UserModel = mongoose.model('user', UserSchema);
>>>>>>> 403086d969f72971f19dca6f54eef0f9633044bb
export default UserModel;
