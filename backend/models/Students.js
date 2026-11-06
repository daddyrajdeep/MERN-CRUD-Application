const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the student's name"],
    trim: true
  },
  age: {
    type: Number,
    required: [true, "Please provide the student's age"],
    min: 1,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide the student's email"],
    trim: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: Number,
    required: [true, "Please provide the student's phone number"],
    trim: true
  },
  course: {
    type: String,
    required: [true, "Please provide the student's course"],
    trim: true
  }
},
  {
    timestamps: true
  }
 
);
module.exports = mongoose.model('Student', studentSchema);