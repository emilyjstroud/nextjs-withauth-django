import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EventForm from '../../../components/event/EventForm';
import { getSingleEvent } from '../../../utils/data/eventData';

export default function EditEvent() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEditItem);
  }, [id]);

  return (
    <EventForm obj={editItem} />
  );
}
