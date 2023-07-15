import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'Category name cannot exceed 100 characters']
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    descriptin: {
        type: String,
        trim: true,
    },
    images: { 
        type: String, 
        required: true
    },
},{ timestamps: true, versionKey:false })



const Movie = mongoose.model('Movie', DataSchema);

export default Movie;
