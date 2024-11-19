import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import EventDetails from './EventDetails';

async function getEvent(id: string){
    const record = await fetch(
        `https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records/${id}`,
        {
            next: {revalidate:10},
        }
    )
    const data = await record.json();
    return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EventPage({ params }: any) {
    const event = await getEvent(params.id);

    return (

        <><ResponsiveAppBar></ResponsiveAppBar><EventDetails event={event} eventId={params.id} /></>
       
    );
}
