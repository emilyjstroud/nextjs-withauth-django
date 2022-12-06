import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleEvent } from '../../utils/data/eventData';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEventDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <p>{eventDetails?.description}</p>
      <p>{eventDetails?.date}</p>
      <p>{eventDetails?.time}</p>
      <p>{eventDetails?.game}</p>
    </div>
  );
}
