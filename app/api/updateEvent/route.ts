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
    const body = await request.text();
    if (!body) {
        return new Response(JSON.stringify({ error: 'request body is required' }), { status: 400 });
    }

    const { id, name, description, capacity, cost, date } = JSON.parse(body);
    await authenticatePocketBase();
    try {
        const response = await pb.collection('events').update(id, {
            name,
            description,
            capacity,
            cost,
            date,
        });
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.error('Failed to update event:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to update event' }),
            { status: 500 }
        );
    }
}