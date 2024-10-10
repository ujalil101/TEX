import React from 'react';
import { useLocation } from 'react-router-dom';
import Welcome from './Welcome';
import PersonInfo from './PersonInfo';
import SearchDirectory from './SearchDirectory';
import './Home.css';

const Home = () => {
  const location = useLocation();
  const { personInfo } = location.state;

  return (
    <div className="home-container">
      <Welcome />
      <div className="main-content">
        <div className="left-container">
          <PersonInfo personInfo={personInfo} />
        </div>
        <div className="right-container">
          <SearchDirectory currentUser={personInfo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
