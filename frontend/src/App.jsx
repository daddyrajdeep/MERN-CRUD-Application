import { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";
const API_URL = "http://localhost:5000/api/students";
function App() {
const [students, setStudents] = useState([]);
const [editingStudent, setEditingStudent] = useState(null);
const [message, setMessage] = useState("");
// READ ALL STUDENTS
const fetchStudents = async () => {
try {
const response = await axios.get(API_URL);
setStudents(response.data.data);
} catch (error) {
setMessage("Unable to fetch students");
console.error(error);
}
};
// LOAD STUDENTS
useEffect(() => {
fetchStudents();
}, []);
// CREATE OR UPDATE
const handleSubmit = async (studentData) => {
try {
if (editingStudent) {
await axios.put(
`${API_URL}/${editingStudent._id}`,
studentData
);
setMessage("Student updated successfully");
setEditingStudent(null);
} else {
await axios.post(API_URL, studentData);
setMessage("Student added successfully");
}
fetchStudents();
} catch (error) {
setMessage(
error.response?.data?.message || "Something went wrong"
);
}
};
// EDIT STUDENT
const handleEdit = (student) => {
setEditingStudent(student);
window.scrollTo({
top: 0,
behavior: "smooth"
});
};
// DELETE STUDENT
const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this student?"
);
if (!confirmDelete) return;
try {
await axios.delete(`${API_URL}/${id}`);
setMessage("Student deleted successfully");
if (editingStudent?._id === id) {
setEditingStudent(null);
}
fetchStudents();
} catch (error) {
setMessage("Unable to delete student");
}
};
return (
<div className="app-container">
<h1>Student Management System</h1>
{message && (
<p className="message">{message}</p>
)}
<StudentForm
onSubmit={handleSubmit}
editingStudent={editingStudent}
cancelEdit={() => setEditingStudent(null)}
/>
<StudentList
students={students}
onEdit={handleEdit}
onDelete={handleDelete}
/>
</div>
);
}
export default App;