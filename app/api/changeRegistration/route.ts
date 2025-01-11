import { pb, authenticatePocketBase } from '@/src/lib/pb';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }

    const body = await request.text();
    if (!body) {
        return new Response(JSON.stringify({ error: 'request body is required' }), { status: 400 });
    }
    const { email, eventID } = JSON.parse(body);

    if (session.user.role !== 'admin') {
        if (session.user.email !== email) {
            return new Response(JSON.stringify({ error: 'Cannot change registration for another user' }), { status: 403 });
        }
    }
    console.log("Changing registration for", email, "on event", eventID);

    await authenticatePocketBase();
    const record = await pb.collection('events').getOne(eventID);
    if (!record) {
        return new Response(JSON.stringify({ error: 'Event not found' }), { status: 404 });
    }
    const { capacity, users } = record;
    console.log("event", record);
    console.log("Current registrations:", users);
    
    if (users.length >= capacity) {
        return new Response(JSON.stringify({ error: 'Event is at full capacity' }), { status: 400 });
    }

    if (users.includes(email)) {
        console.log("Removing user from registrations");
        const newUsers = users.filter((user) => user !== email);
        const response = await pb.collection('events').update(eventID, { users: newUsers });
        return new Response(JSON.stringify(response), { status: 200 });
    } else {
        console.log("Adding user to registrations");
        const response = await pb.collection('events').update(eventID, { users: [...users, email] });
        return new Response(JSON.stringify(response), { status: 200 });
    }
}