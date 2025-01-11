'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function CreateEvent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [cost, setCost] = useState("0");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    const createEvent = async (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim() || !capacity.trim() || !cost.trim() || !date.trim()) {
            setError("All fields are required!");
            return;
        }
        try {
            const response = await fetch('/api/createEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    capacity,
                    cost,
                    date
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            const event = await response.json();

            const router = useRouter();
            router.refresh();
            console.log('Event created:', event);
        } catch (err) {
            console.error('Failed to create event:', err);
            setError(err.message || 'An error occurred');
        }
        setName("");
        setDescription("");
        setCapacity("");
        setCost("0");
        setDate("");
    };

    return (
        <form onSubmit={createEvent}>
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
                label="Event Cost"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                margin="normal"
                error={!!error}
                helperText={error && !cost.trim() ? error : ""}
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
