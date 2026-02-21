const axios = require('axios');

const registerAdmin = async () => {
    try {
        const res = await axios.post('http://localhost:8080/api/auth/register', {
            fullName: "Shubham Ramani",
            email: "shubham@fleetflow.com",
            password: "password123",
            role: "ADMIN"
        });
        console.log("Admin registered successfully");
    } catch (e) {
        if (e.response && e.response.status === 400) {
            console.log("Admin already exists or bad request");
        } else {
            console.error("Error:", e.message);
        }
    }
};

registerAdmin();
