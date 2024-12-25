import PocketBase from 'pocketbase';
import fetchAdminToken from './fetchAdminToken'; 

const pb = new PocketBase(process.env.POCKETBASE_URL);

const createUserAsAdmin = async (user) => {
  try {
    const adminToken = await fetchAdminToken();

    pb.authStore.save(adminToken) 

    const newUser = await pb.collection('users').create({
      username: "user",
      password: "abc1234567",
      passwordConfirm: "abc1234567",
      email: user.email,
      name: user.name,
    });

    console.log('User created:', newUser);
    return newUser;

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default createUserAsAdmin;
