import Link from 'next/link';  
import PocketBase from 'pocketbase';
import CreateEvent from './createEvent/page';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Box, Stack, Divider, Typography } from '@mui/material';

const pb = new PocketBase('http://127.0.0.1:8090');

async function getEvents() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/events/records?page=1&perPage=30',
        { cache: "no-store" }
    );
    const data = await res.json();
    return data.items as any[];
}

export default async function EventPage() {
    const events = await getEvents();

    return (
        <>
            <ResponsiveAppBar />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Stack spacing={4} sx={{ maxWidth: 'lg', width: '100%' }}>
                    <Typography variant="h4" align="center" padding="10px">
                        Events
                    </Typography>
                    <Divider />
                    <Box sx={{ paddingBottom: 2 }}>
                        {events.map((event) => (
                            <Event key={event.id} event={event} />
                        ))}
                        
                    </Box>
                    <Divider />
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: 0 }}>
                    <CreateEvent />
                    </Box>
                </Stack>
            </Box>
        </>
    );
};

function Event({ event }: any) {
    const { id, name, description } = event || {};
    return (
        <Link href={`/events/${id}`} passHref >
            <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, marginBottom: 2, boxShadow: 2 }}>
                <Typography variant="h6" >{name}</Typography>
                <Typography variant="body2" color="textSecondary">{description}</Typography>
            </Box>
        </Link>
    );
}
