import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../utils/data/gameData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setGameDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <p>{gameDetails?.title}</p>
      <p>{gameDetails?.game_type?.label}</p>
      <p>{gameDetails?.maker}</p>
      <p>{gameDetails?.number_of_players}</p>
      <p>{gameDetails?.skill_level}</p>
    </div>
  );
}
