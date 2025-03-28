'use client';
import { Box } from "@mui/material"
import CreateEvent from "../events/createEvent/page"
import { useSession } from "next-auth/react"

const Admin = () => {
    const { data: session } = useSession();

    return (
        session?.user?.role === "admin" ? (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: 0 }}>
                <CreateEvent />
            </Box>
        ) : (<div>Access Denied</div>)
    )
}

export default Admin;