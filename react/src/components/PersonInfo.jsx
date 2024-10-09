import React, { useEffect, useState } from 'react';
import './PersonInfo.css';
import EmployeeCard from './EmployeeCard';

const PersonInfo = ({ personInfo }) => {
  const [sameRoleEmployees, setSameRoleEmployees] = useState([]);

  useEffect(() => {
    const fetchSameRoleEmployees = async () => {
      if (personInfo?.jobRole) {
        try {
          const response = await fetch(`http://localhost:3000/employees/role?role=${personInfo.jobRole}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            // Filter out the current person from the list
            const filteredData = data.filter(employee => employee._id !== personInfo._id);
            setSameRoleEmployees(filteredData);
          } else {
            console.error('Failed to fetch employees with the same role');
          }
        } catch (error) {
          console.error('Error fetching employees with the same role:', error);
        }
      }
    };

    fetchSameRoleEmployees();
  }, [personInfo?.jobRole, personInfo?._id]);

  return (
    <div className="person-info">
      <h3>Current Person Information</h3>
      <div className="person-info-card">
        <p><strong>Name:</strong> {personInfo?.name}</p>
        <p><strong>Role:</strong> {personInfo?.jobRole}</p>
        <p><strong>Location:</strong> {personInfo?.workLocation}</p>
        <p><strong>Salary:</strong> {personInfo?.salary}</p>
      </div>
      {sameRoleEmployees.length > 0 && (
        <div className="same-role-employees">
          <h4>Coworkers</h4>
          <div className="employee-cards">
            {sameRoleEmployees.map((employee) => (
              <EmployeeCard key={employee._id} employee={employee} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonInfo;
