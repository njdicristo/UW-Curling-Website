const fetchAdminToken = async () => {
    try {
      const response = await fetch(`${process.env.POCKETBASE_URL}/api/admins/auth-with-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: process.env.POCKETBASE_ADMIN_EMAIL,  
          password: process.env.POCKETBASE_ADMIN_PASSWORD,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to authenticate as admin');
      }
  
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error during admin login:', error);
      throw error;
    }
  };
  
  export default fetchAdminToken;
  