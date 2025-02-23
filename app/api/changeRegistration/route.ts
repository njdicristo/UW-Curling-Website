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
    let { capacity, users } = record;
    users = users || [];

    if (users.includes(email)) {
        console.log("Removing", email, "from registrations");
        const newUsers = users.filter((user) => user !== email);
        console.log("New users:", newUsers);
        await pb.collection('events').update(eventID, { users: newUsers });
        const response = {
            message: "User successfully unregistered",
            isRegistered: false,
        };
        return new Response(JSON.stringify(response), { status: 200 });
    } else {
        if (users.length >= capacity) {
            return new Response(JSON.stringify({ error: 'Event is at full capacity' }), { status: 400 });
        }
        console.log("Adding", email, "to registrations");
        await pb.collection('events').update(eventID, { users: [...users, email] });
        const response = {
            message: "User successfully registered",
            isRegistered: true,
        };
        return new Response(JSON.stringify(response), { status: 200 });
    }
}