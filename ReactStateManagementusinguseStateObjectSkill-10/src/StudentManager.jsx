import React, { useState } from "react";
import "./StudentManager.css";

function StudentManager() {

  const [students, setStudents] = useState([
    { id: 1, name: "Gourav", course: "CTI" },
    { id: 2, name: "RamSai", course: "FSPD" },
    { id: 3, name: "Hari Charan", course: "FDE" },
    { id: 4, name: "Nadeem sahik", course: "DAV" },
    { id: 5, name: "Balaji", course: "Cloud" }
  ]);

  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    course: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  // Add student
  const addStudent = () => {
    if (!newStudent.id || !newStudent.name || !newStudent.course) {
      alert("Please fill all fields");
      return;
    }

    setStudents([...students, newStudent]);

    setNewStudent({
      id: "",
      name: "",
      course: ""
    });
  };

  // Delete student
  const deleteStudent = (id) => {
    const updatedStudents = students.filter((s) => s.id !== id);
    setStudents(updatedStudents);
  };

  return (
    <div className="container">

      <h2>Student Manager</h2>

      <div className="form">

        <input
          type="number"
          name="id"
          placeholder="Student ID"
          value={newStudent.id}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={newStudent.course}
          onChange={handleChange}
        />

        <button onClick={addStudent}>Add Student</button>

      </div>

      <h3>Student List</h3>

      {students.length === 0 ? (
        <p>No students available</p>
      ) : (
        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>

                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>

                <td>
                  <button
                    className="delete"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}

export default StudentManager;