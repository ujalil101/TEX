import React, { useState } from 'react';
import EmployeeCard from './EmployeeCard';
import './SearchDirectory.css';

const SearchDirectory = ({ currentUser }) => {
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

  const handleClear = () => {
    setSearchQuery('');
    setUserInfo([]);
    setMessage('');
  };

  const canViewSalary = (employee) => {
    return (
      currentUser.role === 2 || 
      currentUser.role === 3 || 
      (currentUser.role === 1 && employee.managerId === currentUser.name) || 
      (currentUser.role === 0 && currentUser.id === employee.id) 
    );
  };

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
          <button type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>
      <div className="employee-info">
        {message && <p>{message}</p>}
        {userInfo.length > 0 && (
          <div className="employee-list">
            <h3>Employee Information</h3>
            <div className="employee-cards-container">
              {userInfo.map((employee) => (
                <EmployeeCard
                  key={employee._id}
                  employee={employee}
                  showSalary={canViewSalary(employee)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDirectory;
