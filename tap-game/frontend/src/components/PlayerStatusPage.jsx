import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Player from './Player';  // Ensure correct path and name

const PlayerStatusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  const fetchPlayer = async () => {
    const response = await fetch(`http://localhost:5001/api/player/${id}`);
    const data = await response.json();
    setPlayer(data);
  };

  const handleFindMonster = async () => {
    if (player.fighting) {
      navigate(`/fight/${id}`);  // Navigate to fighting page if already fighting
    } else {
      const response = await fetch('http://localhost:5001/api/monster', {
        method: 'POST'
      });
      const newMonster = await response.json();
      // Update player's fighting status
      await fetch(`http://localhost:5001/api/player/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ fighting: newMonster._id })
      });
      navigate(`/fight/${id}`);  // Navigate to fighting page after finding a new monster
    }
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Player player={player} />
      <button onClick={handleFindMonster}>Find a Monster</button>
    </div>
  );
};

export default PlayerStatusPage;
