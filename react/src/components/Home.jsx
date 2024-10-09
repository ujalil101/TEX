import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const { user } = location.state || { user: 'Guest' };
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/employees?name=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        setMessage('');
      } else {
        setMessage('Employee not found');
        setUserInfo(null);
      }
    } catch (error) {
      setMessage('Internal server error');
      setUserInfo(null);
    }
  };

  return (
    <div>
      <h2>Welcome, {user}</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Search Directory:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
      {userInfo && (
        <div>
          <h3>Employee Information</h3>
          {userInfo.map((employee) => (
            <div key={employee._id}>
              
              <p>Name: {employee.name}</p>
              <p>Role: {employee.jobRole}</p>
              <p>Location: {employee.workLocation}</p>
              <p>Salary: {employee.salary}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
