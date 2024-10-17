import mongoose from "mongoose";

const comicSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:true,
    unique:true,
  },
  
  bookName: {
    type: String,
    required: true,
    unique: true, // Ensure unique book names
  },
  authorName: {
    type: String,
    required: true,
  },
  yearOfPublication: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  numberOfPages: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    enum: ["new", "used"],
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  genre: {
    type: String,
    required: true,
  },
});

const Comic = mongoose.model("Comic", comicSchema);
export default Comic;
