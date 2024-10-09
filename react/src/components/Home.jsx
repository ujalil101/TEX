import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmployeeCard from './EmployeeCard';
import './Home.css';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { personInfo } = location.state
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState([]);
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
        setUserInfo([]);
      }
    } catch (error) {
      setMessage('Internal server error');
      setUserInfo([]);
    }
  };


  return (
    <div className="home-container">
      <div className="home-form">
        <h2>Welcome, {personInfo?.name}</h2>
        <form className="search-form" onSubmit={handleSearch}>
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
      </div>
      <div className="employee-info">
        {message && <p>{message}</p>}
        {userInfo.length > 0 && (
          <div className="employee-list">
            <h3>Employee Information</h3>
            <div className="employee-cards-container">
              {userInfo.map((employee) => (
                <EmployeeCard key={employee._id} employee={employee} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
