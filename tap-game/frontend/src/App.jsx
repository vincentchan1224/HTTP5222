import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PlayerStatusPage from './components/PlayerStatusPage';
import FightingPage from './components/FightingPage'; // Make sure to create and import this component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

const App = () => {
  return (
    <div className="app-container"> 
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player/:id" element={<PlayerStatusPage />} />
          <Route path="/fight/:playerId" element={<FightingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
