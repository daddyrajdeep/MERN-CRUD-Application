function StudentList({ students, onEdit, onDelete }) {
return (
<div className="table-container">
<h2>Student Records</h2>
<table>
<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Course</th>
<th>Age</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{students.length === 0 ? (
<tr>
<td colSpan="6">No students found</td>
</tr>
) : (
students.map((student) => (
<tr key={student._id}>
<td>{student.name}</td>
<td>{student.email}</td>
<td>{student.phone}</td>
<td>{student.course}</td>
<td>{student.age}</td>
<td>
<button
onClick={() => onEdit(student)}
>
Edit
</button>
<button
onClick={() => onDelete(student._id)}
>
Delete
</button>
</td>
</tr>
))
)}
</tbody>
</table>
</div>
);
}
export default StudentList;
