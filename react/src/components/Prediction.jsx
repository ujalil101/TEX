import React, { useState } from 'react';
import './Prediction.css';

const roles = [
  "Operations Manager",
  "Administrative Assistant",
  "Business Analyst",
  "Claims Adjuster",
  "Claims Representative",
  "Underwriter",
  "Risk Control Consultant",
  "Actuarial Analyst",
  "Software Developer",
  "IT Project Manager",
  "Data Analyst",
  "Cybersecurity Specialist",
  "Systems Administrator",
  "Financial Analyst",
  "Accountant",
  "Internal Auditor",
  "Investment Analyst",
  "Sales Representative",
  "Marketing Specialist",
  "Product Manager",
  "Customer Relationship Manager",
  "HR Generalist",
  "Talent Acquisition Specialist",
  "Compensation Analyst",
  "Corporate Counsel",
  "Compliance Officer",
  "Paralegal",
  "Regulatory Affairs Specialist",
  "Manager",
  "Customer Service Representative",
  "Call Center Agent"
];

const work_locations = ['Atlanta', 'Hartford', 'St Paul'];

const Prediction = () => {
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [predictedSalary, setPredictedSalary] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async (e) => {
    e.preventDefault();
    setError('');
    setPredictedSalary(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobRole, location }),
      });

      if (response.ok) {
        const data = await response.json();
        setPredictedSalary(data.predictedSalary);
      } else {
        setError('Failed to fetch predicted salary');
      }
    } catch (error) {
      setError('Internal server error');
    }
  };

  return (
    <div className="prediction">
      <h3>Predict Salary</h3>
      <form onSubmit={handlePredict}>
        <div>
          <label>Job Role:</label>
          <select value={jobRole} onChange={(e) => setJobRole(e.target.value)} required>
            <option value="" disabled>Select Job Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Location:</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="" disabled>Select Location</option>
            {work_locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <button type="submit">Predict</button>
      </form>
      {predictedSalary !== null && (
        <div>
          <h4>Predicted Salary: ${predictedSalary.toLocaleString()}</h4>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Prediction;
