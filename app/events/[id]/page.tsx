import EventDetails from './EventDetails';

async function getEvent(id: String){
    const record = await fetch(
        `https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records/${id}`,
        {
            next: {revalidate:10},
        }
    )
    const data = await record.json();
    return data;
}

export default async function EventPage({ params }: any) {
    const event = await getEvent(params.id);

    return (
        <div>
            <EventDetails event={event} eventId={params.id} />
        </div>
    );
}
