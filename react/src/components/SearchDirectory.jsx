import React, { useState } from 'react';
import EmployeeCard from './EmployeeCard';
import './SearchDirectory.css';

<<<<<<< HEAD
const SearchDirectory = () => {
=======
const SearchDirectory = ({ currentUser }) => {
>>>>>>> a24732536ff951cf70added8449d744541b4bcc3
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

<<<<<<< HEAD
=======
  const canViewSalary = (employee) => {
    return (
      currentUser.role === 2 || // CEO
      currentUser.role === 3 || // HR
      (currentUser.role === 1 && employee.managerId === currentUser.name) || // Manager viewing their employees
      (currentUser.role === 0 && currentUser.id === employee.id) // Employee viewing their own salary
    );
  };

>>>>>>> a24732536ff951cf70added8449d744541b4bcc3
  return (
    <div className="search-directory">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-container">
          <h3>Directory</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <div className="employee-info">
        {message && <p>{message}</p>}
        {userInfo.length > 0 && (
          <div className="employee-list">
            <h3>Employee Information</h3>
            <div className="employee-cards-container">
              {userInfo.map((employee) => (
<<<<<<< HEAD
                <EmployeeCard key={employee._id} employee={employee} />
=======
                <EmployeeCard
                  key={employee._id}
                  employee={employee}
                  showSalary={canViewSalary(employee)}
                />
>>>>>>> a24732536ff951cf70added8449d744541b4bcc3
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDirectory;
