import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const router = useRouter();

  return (
    <article className="games">
      <h1>Games</h1>
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} />
        </section>
      ))}
    </article>
  );
}

export default Home;
