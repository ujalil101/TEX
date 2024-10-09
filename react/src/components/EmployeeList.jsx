import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);


  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            <ul>{employee.name}  </ul>
            <ul> {employee.jobRole} </ul>
            <ul> {employee.phoneNumber} </ul>
            <ul> {employee.jobRole} </ul>
            <ul> {employee.workLocation} </ul>
            <ul>{employee.salary} </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
