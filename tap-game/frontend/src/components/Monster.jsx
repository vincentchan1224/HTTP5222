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
    let newHp = monster.hp - player.atk; // Use the latest atk value from player state

    // Ensure HP does not drop below 0
    if (newHp < 0) newHp = 0;

    if (newHp === 0) {
      // Update monster's status to dead (alive = false)
      await fetch(`http://localhost:5001/api/monster/${monster._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hp: newHp, alive: false }),
      });

      // Player defeats the monster
      let newExp = player.exp + monster.dropExp;
      let newLevel = player.level;
      let newAtk = player.atk;
      let newCoin = player.coin + monster.dropCoin;

      // Check if player should level up
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
          fighting: null, // Clear the fighting field after the monster dies
        }),
      });

      updatePlayer(); // Update player state in the parent component

      // Refresh the page after the monster dies to fetch the latest data
      window.location.reload(); // This will reload the entire page
    } else {
      // Update monster's HP after the attack
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
