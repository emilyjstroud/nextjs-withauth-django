import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const EventForm = ({ user, obj }) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    description: '',
    date: '',
    time: '',
    game: 0,
  });

  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
    if (obj.id) {
      setCurrentEvent({
        description: obj.description,
        date: obj.date,
        time: obj.time,
        game: obj.game,
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      game: Number(currentEvent.game),
      user_id: user.uid,
    };

    if (obj.id) {
      updateEvent(event, obj.id).then(() => router.push('/events'));
    } else {
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black mt-5">{obj.id ? 'Update' : 'Create'} Event</h2>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Form.Label>Game</Form.Label>
        <Form.Select onChange={handleChange} className="mb-3" name="game" type="number" required>
          <option value="">Select a Game</option>
          {games?.map((game) => (
            <option key={game.id} value={game.id}>
              {game.id}
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

EventForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

export default EventForm;
