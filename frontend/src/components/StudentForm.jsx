import { useEffect, useState } from 'react'

const emptyStudent = { name: '', age: '', email: '', phone: '', course: '' }

function StudentForm({ student, onSubmit, onCancel, saving = false }) {
  const [form, setForm] = useState(emptyStudent)

  useEffect(() => {
    setForm(student ? {
      name: student.name ?? '',
      age: student.age ?? '',
      email: student.email ?? '',
      phone: student.phone ?? '',
      course: student.course ?? '',
    } : emptyStudent)
  }, [student])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const saved = await onSubmit({ ...form, age: Number(form.age), phone: Number(form.phone) })
    if (saved && !student) setForm(emptyStudent)
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">STUDENT DETAILS</p>
          <h2>{student ? 'Edit student' : 'Add a student'}</h2>
        </div>
      </div>
      <div className="form-grid">
        <label>Full name<input name="name" value={form.name} onChange={handleChange} autoComplete="name" required maxLength="100" placeholder="e.g. Asha Patel" /></label>
        <label>Age<input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} required placeholder="e.g. 20" /></label>
        <label>Email address<input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required placeholder="asha@example.com" /></label>
        <label>Phone number<input name="phone" type="tel" inputMode="numeric" pattern="[0-9]{7,15}" value={form.phone} onChange={handleChange} required placeholder="7–15 digits" title="Enter 7 to 15 digits" /></label>
        <label className="course-field">Course<input name="course" value={form.course} onChange={handleChange} required maxLength="100" placeholder="e.g. Computer Science" /></label>
      </div>
      <div className="form-actions">
        {student && <button className="button button-secondary" type="button" onClick={onCancel} disabled={saving}>Cancel</button>}
        <button className="button button-primary" type="submit" disabled={saving}>{saving ? 'Saving…' : student ? 'Save changes' : 'Add student'}</button>
      </div>
    </form>
  )
}

export default StudentForm
