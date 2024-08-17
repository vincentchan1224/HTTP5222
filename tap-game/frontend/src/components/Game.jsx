import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Player from './player';
import Monster from './Monster';
import Button from 'react-bootstrap/Button';

const Game = ({ player, monster, upgradeAtk, attackMonster, findMonster }) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          <h1 className="text-center">Monster Battle Game</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          <Player player={player} upgradeAtk={upgradeAtk} />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          {monster && <Monster monster={monster} attackMonster={attackMonster} />}
          {!monster && (
            <Button variant="success" onClick={findMonster}>
              Find a Monster
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
