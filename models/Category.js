import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'Category name cannot exceed 100 characters']
    },
    
    image: { 
        type: Object, 
    },
},{ timestamps: true, versionKey:false })



const Category = mongoose.model('Category', DataSchema);

export default Category;
