import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.POCKETBASE_URL);
pb.autoCancellation(false);

async function authenticatePocketBase() {
        if (!pb.authStore.isValid) {
        try {
            await pb.admins.authWithPassword(
                process.env.POCKETBASE_ADMIN_EMAIL!,
                process.env.POCKETBASE_ADMIN_PASSWORD!,
                { autoRefreshThreshold: 30 * 60 }
            );
            console.log("Authentication successful!");
        console.log("pb is authenticated",pb.authStore.isValid);

        } catch (error) {
            console.error("Failed to authenticate with PocketBase:", error);
        }
    }
}

export {pb, authenticatePocketBase};