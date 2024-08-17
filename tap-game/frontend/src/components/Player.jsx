import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Player.css'; 

const Player = ({ player, upgradeAtk }) => {
  const handleUpgradeAtk = () => {
    if (player.coin >= 100) {
      upgradeAtk(player._id); 
    } else {
      alert('Not enough coins to upgrade ATK.');
    }
  };

  return (
    <Card style={{ width: '380px', textAlign: 'center', margin: '0 auto', marginTop: '20px', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <Card.Img
        variant="top"
        src={`/images/${player.image}`}
        alt="Player Image"
        style={{ width: '150px', height: '150px', margin: '0 auto' }}
      />
      <Card.Body>
      <Card.Title className="title">Player</Card.Title>
        <div className="player-status border p-3">
 
          <Row>
          <Col xs={6}><strong>Level:</strong> {player.level}</Col>
          <Col xs={6}><strong>EXP:</strong> {player.exp}</Col>
        </Row>
        <Row>
          <Col xs={6}><strong>ATK:</strong> {player.atk}</Col>
          <Col xs={6}><strong>Coin:</strong> {player.coin}</Col>
        </Row>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleUpgradeAtk}>
          Upgrade Atk (100 coins)
        </button>
      </Card.Body>
    </Card>
  );
};

export default Player;
