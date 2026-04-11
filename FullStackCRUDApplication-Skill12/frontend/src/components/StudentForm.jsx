import { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, initialData, onCancel }) => {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        course: ''
    });

    useEffect(() => {
        if (initialData) {
            setStudent(initialData);
        } else {
            setStudent({ name: '', email: '', course: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(student);
        if (!initialData) {
            setStudent({ name: '', email: '', course: '' });
        }
    };

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="course">Course</label>
                <input
                    type="text"
                    id="course"
                    name="course"
                    value={student.course}
                    onChange={handleChange}
                    placeholder="Enter course name"
                    required
                />
            </div>
            <div className="button-row">
                <button type="submit" className="btn-primary">
                    {initialData ? 'Update Student' : 'Add Student'}
                </button>
                {initialData && (
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default StudentForm;
