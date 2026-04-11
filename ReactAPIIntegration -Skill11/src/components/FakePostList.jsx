import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FakePostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('all');

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://dummyjson.com/posts');
      setPosts(response.data.posts);
      setFilteredPosts(response.data.posts);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedUserId === 'all') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.userId === parseInt(selectedUserId));
      setFilteredPosts(filtered);
    }
  }, [selectedUserId, posts]);

  const handleRefresh = () => {
    fetchPosts();
  };

  // Extract unique user IDs for the dropdown filter
  const userIds = [...new Set(posts.map(post => post.userId))].sort((a, b) => a - b);

  if (loading) return <div className="loading">Loading posts from DummyJSON...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="list-container">
      <h2>Fake Posts (Axios)</h2>
      
      <div className="controls">
        <button className="primary-btn" onClick={handleRefresh}>Refresh Posts</button>
        
        <div className="filter-box">
          <label htmlFor="userFilter">Filter by User ID: </label>
          <select 
            id="userFilter" 
            value={selectedUserId} 
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="all">All Users</option>
            {userIds.map(id => (
              <option key={id} value={id}>User {id}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="card post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div className="card-footer">
                <span>User ID: {post.userId}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default FakePostList;
