import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Users, Edit3, Loader2 } from 'lucide-react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

const getApiErrorMessage = (error, fallbackMessage) =>
    error.response?.data?.message || fallbackMessage;

const App = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const API_URL = '/api/students';

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            setMessage({
                type: 'error',
                text: getApiErrorMessage(error, 'Failed to fetch students.')
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleAddOrUpdate = async (studentData) => {
        try {
            if (editingStudent) {
                await axios.put(`${API_URL}/${editingStudent.id}`, studentData);
                setMessage({ type: 'success', text: 'Student updated successfully!' });
            } else {
                await axios.post(API_URL, studentData);
                setMessage({ type: 'success', text: 'Student added successfully!' });
            }
            setEditingStudent(null);
            await fetchStudents();
        } catch (error) {
            console.error('Error saving student:', error);
            setMessage({
                type: 'error',
                text: getApiErrorMessage(error, 'Failed to save student.')
            });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage({ type: 'success', text: 'Student deleted successfully!' });
                await fetchStudents();
            } catch (error) {
                console.error('Error deleting student:', error);
                setMessage({
                    type: 'error',
                    text: getApiErrorMessage(error, 'Failed to delete student.')
                });
            }
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingStudent(null);
    };

    return (
        <div className="app-container">
            <header className="glass-header">
                <h1>
                    <Users size={32} />
                    Student Management System
                </h1>
            </header>

            <main className="content">
                {message && (
                    <div className={`alert ${message.type}`}>
                        {message.text}
                        <button onClick={() => setMessage(null)}>&times;</button>
                    </div>
                )}

                <div className="grid-layout">
                    <section className="form-section glass-card">
                        <h2>
                            {editingStudent ? <Edit3 size={24} /> : <UserPlus size={24} />}
                            {editingStudent ? 'Edit Student' : 'Add New Student'}
                        </h2>
                        <StudentForm 
                            onSubmit={handleAddOrUpdate} 
                            initialData={editingStudent} 
                            onCancel={cancelEdit}
                        />
                    </section>

                    <section className="list-section glass-card">
                        <h2>
                            <Users size={24} />
                            All Students
                        </h2>
                        {loading ? (
                            <div className="loading-spinner">
                                <Loader2 className="animate-spin" size={48} />
                                <p>Loading Students...</p>
                            </div>
                        ) : (
                            <StudentList 
                                students={students} 
                                onEdit={handleEdit} 
                                onDelete={handleDelete} 
                            />
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default App;
