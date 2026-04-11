import { Trash2, Edit3, Search, X } from 'lucide-react';

const StudentList = ({ students, onEdit, onDelete, searchQuery, onSearchChange }) => {
    return (
        <div className="list-container">
            <div className="search-bar-container">
                <Search className="search-icon" size={18} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search students by name or email..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button 
                        className="clear-search" 
                        onClick={() => onSearchChange('')}
                        title="Clear search"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {students.length === 0 ? (
                <div className="empty-state">
                    {searchQuery ? `No students found matching "${searchQuery}"` : "No students found. Add one to get started!"}
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default StudentList;
