import React, { useState, useEffect } from 'react';

const Monster = ({ player, updatePlayer }) => {
  const [monster, setMonster] = useState(null);

  useEffect(() => {
    if (player.fighting) {
      const fetchMonster = async () => {
        const response = await fetch(`http://localhost:5001/api/monster/${player.fighting}`);
        const data = await response.json();
        setMonster(data);
      };

      fetchMonster();
    }
  }, [player.fighting]);

  const attackMonster = async () => {
    let newHp = monster.hp - player.atk; 

    if (newHp < 0) newHp = 0;

    if (newHp === 0) {
      await fetch(`http://localhost:5001/api/monster/${monster._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hp: newHp, alive: false }),
      });

      let newExp = player.exp + monster.dropExp;
      let newLevel = player.level;
      let newAtk = player.atk;
      let newCoin = player.coin + monster.dropCoin;

      while (newExp >= 1000) {
        newExp -= 1000;
        newLevel += 1;
        newAtk += 10; // Increase attack power by 10 per level
      }

      // Update player with new exp, level, atk, and clear the fighting monster
      await fetch(`http://localhost:5001/api/player/${player._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exp: newExp,
          level: newLevel,
          atk: newAtk,
          coin: newCoin,
          fighting: null,
        }),
      });

      updatePlayer(); 
      window.location.reload(); 
    } else {
      
      const response = await fetch(`http://localhost:5001/api/monster/${monster._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hp: newHp }),
      });
      const updatedMonster = await response.json();
      setMonster(updatedMonster);
    }
  };

  return (
    <div>
      {monster && monster.alive && (
        <div>
          <h2>Monster Stats</h2>
          <p>Level: {monster.level}</p>
          <p>HP: {monster.hp}</p>
          <button onClick={attackMonster}>Attack</button>
        </div>
      )}
      {monster && !monster.alive && (
        <div>
          <h2>Monster Defeated!</h2>
        </div>
      )}
    </div>
  );
};

export default Monster;
