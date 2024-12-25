import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.POCKETBASE_URL);
pb.autoCancellation(false);

await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL!, process.env.POCKETBASE_ADMIN_PASSWORD!, {
    autoRefreshThreshold: 30 * 60
});

export default pb