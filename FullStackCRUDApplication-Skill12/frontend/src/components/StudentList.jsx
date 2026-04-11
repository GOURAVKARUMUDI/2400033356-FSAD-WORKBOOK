import { Trash2, Edit3 } from 'lucide-react';

const StudentList = ({ students, onEdit, onDelete }) => {
    if (students.length === 0) {
        return <div className="empty-state">No students found. Add one to get started!</div>;
    }

    return (
        <div className="table-responsive">
            <table className="student-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>
                            <td className="actions">
                                <button
                                    className="btn-icon btn-edit"
                                    onClick={() => onEdit(student)}
                                    title="Edit"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button
                                    className="btn-icon btn-delete"
                                    onClick={() => onDelete(student.id)}
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
