import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
},{ timestamps: true, versionKey:false })



const User = mongoose.model('User', DataSchema);

export default User;
