import EventDetails from './eventDetails';

async function getEvent(id: String){
    const record = await fetch(
        `http://127.0.0.1:8090/api/collections/events/records/${id}`,
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
