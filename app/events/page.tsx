import Link from 'next/link';  
import PocketBase from 'pocketbase';
import CreateEvent from './createEvent/page';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Box, Stack, Divider, Typography } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pb = new PocketBase('https://pocketbase-docker-billowing-pine-9885.fly.dev');

async function getEvents() {
    const res = await fetch(
        'https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records?page=1&perPage=30',
        { cache: "no-store" }
    );
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
