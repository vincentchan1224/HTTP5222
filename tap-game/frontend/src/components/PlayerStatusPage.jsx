import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Player from './Player';
import DialogBox from './DialogBox'; 

const PlayerStatusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [player, setPlayer] = useState(null);
  const [dialog, setDialog] = useState({ show: false, message: '' });

  useEffect(() => {
    if (location.state?.message) {
      setDialog({ show: true, message: location.state.message });
    }
    fetchPlayer();
  }, [id, location.state]);

  const fetchPlayer = async () => {
    const response = await fetch(`http://localhost:5001/api/player/${id}`);
    const data = await response.json();
    setPlayer(data);
  };

  // Define upgradeAtk function here if it's not passed down as a prop
  const upgradeAtk = async (playerId) => {
    if (!player || player.coin < 100) {
      alert('Not enough coins to upgrade ATK.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/player/${playerId}/upgrade-atk`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade ATK');
      }

      const updatedPlayer = await response.json();
      setPlayer(updatedPlayer); // Update the player state with the new data
    } catch (error) {
      console.error('Error upgrading ATK:', error);
      alert('Failed to upgrade ATK. Please try again.');
    }
  };

  const handleFindMonster = async () => {
    if (player.fighting) {
      navigate(`/fight/${id}`);  // Navigate to the fighting page if already fighting
    } else {
      const response = await fetch('http://localhost:5001/api/monster', {
        method: 'POST'
      });
      const newMonster = await response.json();
      await fetch(`http://localhost:5001/api/player/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ fighting: newMonster._id })
      });
      navigate(`/fight/${id}`, { replace: true });  // Navigate to fighting page after finding a new monster
    }
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Player player={player} upgradeAtk={upgradeAtk} />
      {dialog.show && (
        <DialogBox 
          message={dialog.message} 
          show={dialog.show} 
          onClose={() => setDialog({ show: false, message: '' })}
        />
      )}
      <button className="btn btn-primary mt-3" onClick={handleFindMonster}>Find a Monster</button>
    </div>
  );
};

export default PlayerStatusPage;
