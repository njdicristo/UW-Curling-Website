'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function CreateEvent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();

    const create = async () => {
        await fetch('http://127.0.0.1:8090/api/collections/events/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description
            }),
        });

        setName("");
        setDescription("");
        router.refresh();
    }

    return (
        <form onSubmit={create}>
            <h3>Create an event</h3>
            <input
                type="text"
                placeholder="Event name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div>
                <textarea
                    placeholder="Event description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button type="submit">
                Create event
            </button>
        </form>
    )
}
