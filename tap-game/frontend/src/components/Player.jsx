import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Player.css'; // Confirm the path matches your project structure

const Player = ({ player, upgradeAtk }) => {
  const handleUpgradeAtk = () => {
    if (player.coin >= 100) {
      upgradeAtk(player._id); // Call the upgrade function passed as a prop
    } else {
      alert('Not enough coins to upgrade ATK.');
    }
  };

  return (
    <Card style={{ width: '18rem', textAlign: 'center', margin: '0 auto', marginTop: '20px' }}>
      <Card.Img
        variant="top"
        src={`/images/${player.image}`}
        alt="Player Image"
        style={{ width: '150px', height: '150px', margin: '0 auto' }}
      />
      <Card.Body>
        <div className="player-status border p-3">
          <Row>
            <Col xs={6} className="stat">
              <strong>Level:</strong> {player.level}
            </Col>
            <Col xs={6} className="stat">
              <strong>EXP:</strong> {player.exp}
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="stat">
              <strong>ATK:</strong> {player.atk}
            </Col>
            <Col xs={6} className="stat">
              <strong>Coin:</strong> {player.coin}
            </Col>
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
