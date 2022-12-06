import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const GameForm = ({ user, obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: '',
    maker: '',
    game_type: 0,
  });

  const router = useRouter();

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then(setGameTypes);
    // if (obj.id) {
    //   setCurrentGame({
    //     skillLevel: obj.skill_level,
    //     numberOfPlayers: obj.number_of_players,
    //     title: obj.title,
    //     maker: obj.maker,
    //     game_type: obj.game_type,
    //   });
    // }
  }, [obj]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      updateGame(currentGame).then(() => router.push('/games'));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        number_of_players: Number(currentGame.numberOfPlayers),
        skill_level: Number(currentGame.skillLevel),
        game_type: Number(currentGame.game_type),
        user_id: user.uid,
      };

      // Send POST request to your API
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black mt-5">{obj.id ? 'Update' : 'Create'} Game</h2>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" type="number" required value={currentGame.skillLevel} onChange={handleChange} />
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" type="number" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        {/* TODO: create the rest of the input fields */}
        <Form.Label>Game Type</Form.Label>
        <Form.Select onChange={handleChange} className="mb-3" name="game_type" required>
          <option value="">Select a Game Type</option>
          {gameTypes?.map((gameType) => (
            <option key={gameType.id} value={gameType.id}>
              {gameType.label}
            </option>
          ))}
        </Form.Select>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

// GameForm.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string.isRequired,
//   }).isRequired,
// };

GameForm.propTypes = {
  obj: PropTypes.shape({
    skill_level: PropTypes.number,
    number_of_players: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    game_type: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

export default GameForm;
