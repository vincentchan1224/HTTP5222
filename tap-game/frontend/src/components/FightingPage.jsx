import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Player from './Player';
import Fighting from './Fighting';
import DialogBox from './DialogBox';

const FightingPage = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [monster, setMonster] = useState(null);
  const [dialog, setDialog] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchPlayer = async () => {
      const response = await fetch(`http://localhost:5001/api/player/${playerId}`);
      const data = await response.json();
      setPlayer(data);
      if (data.fighting) {
        setMonster(data.fighting);
      }
    };

    fetchPlayer();
  }, [playerId]);

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
      let levelUpOccurred = false;
      let levelUpMessage = '';

      while (updatedPlayer.exp >= 1000) {
        updatedPlayer.exp -= 1000;
        updatedPlayer.level += 1;
        updatedPlayer.atk += 5;
        levelUpOccurred = true;
      }

      if (levelUpOccurred) {
        levelUpMessage = `Level up! You are now level ${updatedPlayer.level}. ATK increased by 5.`;
      }

      await updatePlayerData(updatedPlayer, playerId, levelUpMessage || "Monster defeated!");
    } else {
      setMonster(updatedMonster);
    }
  };

  const updatePlayerData = async (updatedPlayer, playerId, message) => {
    const updateResponse = await fetch(`http://localhost:5001/api/player/${updatedPlayer._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPlayer)
    });

    if (updateResponse.ok) {
      navigate(`/player/${playerId}`, { state: { message } });
    } else {
      console.error('Failed to update player data');
    }

    setPlayer(updatedPlayer);
    setMonster(null);
  };

  const upgradeAtk = async (playerId) => {
    if (player.coin < 100) {
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
      setPlayer(updatedPlayer);
    } catch (error) {
      console.error('Error upgrading ATK:', error);
      alert('Failed to upgrade ATK. Please try again.');
    }
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {dialog.show && <DialogBox message={dialog.message} show={dialog.show} onClose={() => setDialog({ show: false, message: '' })} />}
      {monster && <Fighting monster={monster} onAttack={handleAttackMonster} />}
      <Player player={player} upgradeAtk={upgradeAtk} />
    </div>
  );
};

export default FightingPage;
