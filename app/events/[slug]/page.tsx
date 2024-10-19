'use client';
import { useParams } from 'next/navigation';

const EventPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>Event: {slug}</h1>
      <p>Details about event "{slug}" will go here.</p>
    </div>
  );
};

export default EventPage;