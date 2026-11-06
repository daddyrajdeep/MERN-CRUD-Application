const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Create student
router.post('/', createStudent);

// Get all students
router.get('/', getAllStudents);

// Update student
router.put('/:id', updateStudent);

// Delete student
router.delete('/:id', deleteStudent);

// Read student by ID
router.get('/:id', getStudentById);

module.exports = router;
