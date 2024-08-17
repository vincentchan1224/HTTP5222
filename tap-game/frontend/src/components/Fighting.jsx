import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Fighting = ({ monster, onAttack }) => {
  if (!monster) return null;

  return (
    <Card className="mt-3 text-center" style={{ width: '18rem', margin: '0 auto' }}>
      <Card.Img
        variant="top"
        src={`/images/${monster.image}`}
        alt="Fighting Monster"
        style={{ width: '150px', height: '150px', margin: '0 auto' }}
      />
      <Card.Body>
        <Card.Title>{monster.name}</Card.Title>
        <Row>
          <Col xs={6}><strong>Level:</strong> {monster.level}</Col>
          <Col xs={6}><strong>HP:</strong> {monster.hp}</Col>
        </Row>
        <Row>
          <Col xs={6}><strong>EXP:</strong> {monster.dropExp}</Col>
          <Col xs={6}><strong>Coin:</strong> {monster.dropCoin}</Col>
        </Row>
        <Button variant="danger" className="mt-3" onClick={onAttack}>
          Attack Monster
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Fighting;
