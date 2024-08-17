import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../styles/Fighting.css'; 

const Fighting = ({ monster, onAttack }) => {
  if (!monster) return null;

  return (
    <Card style={{ width: '380px', textAlign: 'center', margin: '0 auto', marginTop: '20px', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <Card.Img
        variant="top"
        src={`/images/${monster.image}`}
        alt="Fighting Monster"
        style={{ width: '150px', height: '150px', margin: '0 auto' }}
      />
      <Card.Body>
        <Card.Title className="title">{monster.name}</Card.Title>
        <div className="fighting-status border p-3">
        <Row>
          <Col xs={6}><strong>Level:</strong> {monster.level}</Col>
          <Col xs={6}><strong>HP:</strong> {monster.hp}</Col>
        </Row>
        <Row>
          <Col xs={6}><strong>EXP:</strong> {monster.dropExp}</Col>
          <Col xs={6}><strong>Coin:</strong> {monster.dropCoin}</Col>
        </Row>
        </div>
        <Button variant="danger" className="mt-3" onClick={onAttack}>
          Attack Monster
        </Button>
      </Card.Body>
    </Card>
    
  );
};

export default Fighting;
