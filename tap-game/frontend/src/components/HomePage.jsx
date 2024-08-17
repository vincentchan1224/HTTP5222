import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  const navigate = useNavigate();

  const createNewPlayer = async () => {
    const existingPlayerId = Cookies.get('playerId');

    if (existingPlayerId) {
      const confirmDelete = window.confirm('A player already exists. Do you want to delete this player and create a new one?');
      if (confirmDelete) {
        Cookies.remove('playerId');
        await createPlayer();
      }
    } else {
      await createPlayer();
    }
  };

  const createPlayer = async () => {
    const response = await fetch('http://localhost:5001/api/player', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const newPlayer = await response.json();
    Cookies.set('playerId', newPlayer._id);
    navigate(`/player/${newPlayer._id}`);
  };

  const loadCurrentPlayer = () => {
    const playerId = Cookies.get('playerId');
    if (playerId) {
      navigate(`/player/${playerId}`);
    } else {
      alert('No player found. Please create a new player first.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Button variant="primary" className="mb-3" onClick={createNewPlayer}>
        Create a New Player
      </Button>
      <Button variant="secondary" onClick={loadCurrentPlayer}>
        Load the Current Player
      </Button>
    </div>
  );
};

export default HomePage;
