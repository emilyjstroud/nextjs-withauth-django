import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { getSingleGame } from '../../../utils/data/gameData';

export default function EditGame() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setEditItem);
  }, [id]);

  return (
    <GameForm obj={editItem} />
  );
}
