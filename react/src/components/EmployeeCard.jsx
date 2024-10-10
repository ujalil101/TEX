import React from 'react';
import './EmployeeCard.css';

const EmployeeCard = ({ employee, showSalary }) => {
  return (
    <div className="employee-card">
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.jobRole}</p>
      <p><strong>Location:</strong> {employee.workLocation}</p>
      {showSalary && <p><strong>Salary:</strong> {employee.salary}</p>}
    </div>
  );
};

export default EmployeeCard;
