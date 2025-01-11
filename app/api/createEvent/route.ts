import { pb, authenticatePocketBase } from '@/src/lib/pb';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }
    if (session.user.role !== 'admin') {
        return new Response(JSON.stringify({ error: 'Access Denied' }), { status: 401 });
    }

    console.log("Creating event...");

    const body = await request.text();
    if (!body) {
        return new Response(JSON.stringify({ error: 'request body is required' }), { status: 400 });
    }
    const { name, description, capacity, cost, date } = JSON.parse(body);
    await authenticatePocketBase();
    try {
        // Create the event in PocketBase
        console.log("Creating event in PocketBase with the following data:", {
            name,
            description,
            capacity,
            cost,
            date,
        });
        const response = await pb.collection('events').create({
            name,
            description,
            capacity: parseInt(capacity),
            cost: parseFloat(cost),
            date,
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error('Error creating event:', error);
        return new Response(JSON.stringify({ error: 'Failed to create event' }), { status: 500 });

    }
}
