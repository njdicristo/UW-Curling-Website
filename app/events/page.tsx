import Link from 'next/link';
import PocketBase from 'pocketbase';
import CreateEvent from './createEvent/page';
const pb = new PocketBase('http://127.0.0.1:8090');

async function getEvents() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/events/records?page=1&perPage=30',
        { cache: "no-store" }
    );
    const data = await res.json();
    return data.items as any[]
}

export default async function EventPage() {
    const events = await getEvents();

    return (
        <div>
            <h1>Events</h1>
            <div>
                {events.map((event) => {
                    return <Event key={event.id} event={event} />;
                })}
            </div>
            <CreateEvent/>
        </div>
    )
};

function Event({ event }: any) {
    const { id, name, description, created } = event || {};
    return (
        <Link href={`/events/${id}`}>
            <div>
                <h2>{name}</h2>
                <h5>{description}</h5>
                {/* <p>{created}</p> */}
            </div>
        </Link>
    )
}

