import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Player from './player';
import Fighting from './Fighting';

const FightingPage = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [monster, setMonster] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      const response = await fetch(`http://localhost:5001/api/player/${playerId}`);
      const data = await response.json();
      setPlayer(data);

      if (data.fighting) {
        setMonster(data.fighting); // Set monster data if the player is fighting
      }
    };

    fetchPlayer();
  }, [playerId]);

  const upgradeAtk = async (playerId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/player/${playerId}/upgrade-atk`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedPlayer = await response.json();
        setPlayer(prev => ({ ...prev, atk: updatedPlayer.atk, coin: updatedPlayer.coin }));
        // Preserve the monster state by only updating the player's relevant attributes
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Handle any errors from the server
      }
    } catch (error) {
      console.error('Failed to upgrade ATK:', error);
    }
  };

  const handleAttackMonster = async () => {
    if (!monster || !player) return;
  
    const response = await fetch(`http://localhost:5001/api/monster/${monster._id}/attack/${player._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ atk: player.atk })
    });
  
    const result = await response.json();
    let updatedPlayer = result.player;
    let updatedMonster = result.monster;
  
    if (!updatedMonster.alive) {
      alert(`Monster defeated! Gained ${updatedPlayer.exp - player.exp} EXP and ${updatedPlayer.coin - player.coin} coins.`);
      
      // Level up logic
      let levelUpOccurred = false;
      while (updatedPlayer.exp >= 1000) {
        updatedPlayer.exp -= 1000;
        updatedPlayer.level += 1;
        updatedPlayer.atk += 5;
        levelUpOccurred = true;
      }
  
      if (levelUpOccurred) {
        alert(`Level up! You are now level ${updatedPlayer.level}. ATK increased by 5.`);
        
        // Send the updated player data to the backend to save the changes
        await fetch(`http://localhost:5001/api/player/${updatedPlayer._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPlayer)
        });
      }
  
      setPlayer(updatedPlayer);  // Update player with new EXP, level, and ATK
      setMonster(null);  // Remove the defeated monster from the state
    } else {
      setMonster(updatedMonster);  // Update monster state with potentially new HP or alive status
    }
  };
  

  if (!player) {
    return <div>Loading...</div>;
  }

  if (!player.fighting) {
    return <Navigate to={`/player/${playerId}`} replace />;
  }

  return (
    <div>
      <Player player={player} upgradeAtk={upgradeAtk} />
      {monster && <Fighting monster={monster} onAttack={handleAttackMonster} />}
    </div>
  );
};

export default FightingPage;
