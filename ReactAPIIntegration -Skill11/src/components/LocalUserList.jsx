import React, { useState, useEffect } from 'react';

const LocalUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from public/users.json
    fetch('/users.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch local users');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading local users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="list-container">
      <h2>Local Users (Fetch API)</h2>
      <div className="grid">
        {users.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalUserList;
