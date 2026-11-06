const Student = require('../models/Students');

// Create student
exports.createStudent = async (req, res) => {
  try {
const { name, age, email, phone, course } = req.body;
    const student = await Student.create({ name, age, email, phone, course });
    res.status(201).json({success: true,message: "Student created successfully", data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.code === 11000 ? 'Email already exists' : error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true,count: students.length, data: students });
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get one student
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if(!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student, message: 'Student updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.code === 11000 ? 'Email already exists' : error.message });
  } 
};
// delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if(!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student deleted successfully', data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.code === 11000 ? 'Email already exists' : error.message });
  }
};
