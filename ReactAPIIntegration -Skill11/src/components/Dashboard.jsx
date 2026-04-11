import React, { useState } from 'react';
import LocalUserList from './LocalUserList';
import UserList from './UserList';
import FakePostList from './FakePostList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('local');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>API Integration React Demo</h1>
        <p>Exploring Fetch API, Axios, and Local JSON</p>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'local' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setActiveTab('local')}
        >
          Local Users
        </button>
        <button 
          className={activeTab === 'api' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setActiveTab('api')}
        >
          Users API
        </button>
        <button 
          className={activeTab === 'posts' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setActiveTab('posts')}
        >
          Fake API Posts
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'local' && <LocalUserList />}
        {activeTab === 'api' && <UserList />}
        {activeTab === 'posts' && <FakePostList />}
      </main>
      
      <footer className="dashboard-footer">
        <p>Built with React + Vite + Axios</p>
      </footer>
    </div>
  );
};

export default Dashboard;
