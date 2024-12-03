'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function CreateEvent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [date, setDate] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [eventId, setEventId] = useState(null); // Assuming you have an eventId after creation
    const [error, setError] = useState(""); // State to track validation errors

    const router = useRouter();

    const create = async (e) => {
        e.preventDefault();

        // Check if name or description are empty
        if (!name.trim() || !description.trim() || !capacity.trim() || !date.trim()) {
            setError("All fields are required!");
            return;
        }

        // Reset error if validation passes
        setError("");

        const response = await fetch('https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                capacity,
                date
            }),
        });

        const data = await response.json();
        setEventId(data.id); // Store the ID of the created event
        setName("");
        setDescription("");
        setCapacity("");
        setDate("");
        router.refresh();
    };

    return (
        <form onSubmit={create}>
            <h3>Create an event</h3>
            <TextField
                label="Event Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                error={!!error}
                helperText={error && !name.trim() ? error : ""}
            />
            <TextField
                label="Event Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                error={!!error}
                helperText={error && !description.trim() ? error : ""}
            />
            <TextField
                label="Event Capacity"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                margin="normal"
                error={!!error}
                helperText={error && !capacity.trim() ? error : ""}
            />
            <TextField
                label="Event Date"
                type="date"
                variant="outlined"
                fullWidth
                value={date}
                rows={1}
                onChange={(e) => setDate(e.target.value)}
                margin="normal"
                error={!!error}
                helperText={error && !date.trim() ? error : ""}
                InputLabelProps={{
                    shrink: true,
                  }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '16px' }}
            >
                Create event
            </Button>
        </form>
    );
}
