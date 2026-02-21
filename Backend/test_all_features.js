const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api';
let token = '';

const testRunner = async () => {
    try {
        console.log("--- 1. Auth & Login ---");
        // Register Admin
        try {
            await axios.post(`${BASE_URL}/auth/register`, {
                fullName: "Test Admin",
                email: "test@fleetflow.com",
                password: "password123",
                role: "ADMIN"
            });
            console.log("Admin registered.");
        } catch (e) {
            console.log("Admin registration skipped (likely already exists).");
        }

        // Login
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: "test@fleetflow.com",
            password: "password123"
        });
        token = loginRes.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log("Login successful. Token acquired.");

        console.log("\n--- 2. Digital Garage (Vehicles) ---");
        const vehicleRes = await axios.post(`${BASE_URL}/vehicles`, {
            name: "Test Truck",
            model: "Tata Prima",
            licensePlate: "TEST-" + Math.random().toString(36).substring(7).toUpperCase(),
            vehicleType: "TRUCK",
            maxLoadCapacity: 1000.0,
            odometer: 100.0,
            acquisitionCost: 50000.0
        }, config);
        const vehicleId = vehicleRes.data.id;
        console.log(`Vehicle created: ${vehicleId}`);

        console.log("\n--- 3. Driver Management ---");
        const driverRes = await axios.post(`${BASE_URL}/drivers`, {
            fullName: "Flash Gordon",
            email: "flash" + Math.random().toString(36).substring(7) + "@speed.com",
            phone: "9876543210",
            licenseNumber: "LIC-" + Math.random().toString(36).substring(7).toUpperCase(),
            licenseCategory: "HEAVY_DUTY",
            licenseExpiry: "2028-12-31"
        }, config);
        const driverId = driverRes.data.id;
        console.log(`Driver created: ${driverId}`);

        console.log("\n--- 4. Trip Management (The Brain) ---");
        // Test "Too heavy!"
        try {
            await axios.post(`${BASE_URL}/trips`, {
                origin: "Warehouse A",
                destination: "Shop B",
                cargoDescription: "Heavy Lead",
                cargoWeight: 5000.0, // Exceeds 1000.0 limit
                vehicleId: vehicleId,
                driverId: driverId,
                scheduledAt: "2026-03-01T10:00:00"
            }, config);
        } catch (e) {
            console.log(`Safety Lock Test: Recieved expected error: "${e.response.data.message}"`);
        }

        // Create valid trip
        const tripRes = await axios.post(`${BASE_URL}/trips`, {
            origin: "Warehouse A",
            destination: "Shop B",
            cargoDescription: "Feathers",
            cargoWeight: 100.0,
            vehicleId: vehicleId,
            driverId: driverId,
            scheduledAt: "2026-03-01T10:00:00"
        }, config);
        const tripId = tripRes.data.id;
        console.log(`Valid trip created (DRAFT): ${tripId}`);

        console.log("\n--- 5. Maintenance (Auto-Hide Rule) ---");
        const maintRes = await axios.post(`${BASE_URL}/maintenance`, {
            vehicleId: vehicleId,
            description: "Oil Change",
            serviceType: "PREVENTIVE",
            serviceDate: "2026-02-21",
            cost: 200.0,
            status: "IN_PROGRESS"
        }, config);
        const maintId = maintRes.data.id;
        console.log(`Maintenance log created. Status: ${maintRes.data.status}`);

        // Check if vehicle is hidden from available list
        const availRes = await axios.get(`${BASE_URL}/vehicles/available`, config);
        const isHidden = !availRes.data.some(v => v.id === vehicleId);
        console.log(`Is vehicle hidden from available list? ${isHidden}`);

        // Finish Maintenance
        await axios.patch(`${BASE_URL}/maintenance/${maintId}/status?status=COMPLETED`, {}, config);
        console.log("Maintenance marked COMPLETED. Vehicle should be back.");

        console.log("\n--- 6. Dispatch & Complete Trip ---");
        await axios.patch(`${BASE_URL}/trips/${tripId}/dispatch`, {}, config);
        console.log("Trip DISPATCHED.");

        await axios.patch(`${BASE_URL}/trips/${tripId}/complete?endOdometer=150.0`, {}, config);
        console.log("Trip COMPLETED.");

        console.log("\n--- 7. Digital Wallet (Fuel) ---");
        await axios.post(`${BASE_URL}/fuel`, {
            vehicleId: vehicleId,
            fuelDate: "2026-02-21",
            liters: 20.0,
            cost: 2000.0,
            odometerReading: 155.0,
            station: "Gas Station X"
        }, config);
        console.log("Fuel record added.");

        console.log("\n--- 8. Analytics (The Big Picture) ---");
        const dashRes = await axios.get(`${BASE_URL}/analytics/dashboard`, config);
        console.log("Dashboard KPIs:", JSON.stringify(dashRes.data, null, 2));

        const deadStockRes = await axios.get(`${BASE_URL}/analytics/dead-stock`, config);
        console.log(`Dead Stock Count: ${deadStockRes.data.length}`);

        const reportRes = await axios.get(`${BASE_URL}/analytics/report`, config);
        console.log(`Report data received (first 50 chars): ${reportRes.data.substring(0, 50)}...`);

        console.log("\n--- ALL TESTS PASSED SUCCESSFULLY! ---");

    } catch (e) {
        console.error("TEST FAILED!");
        if (e.response) {
            console.error(`Status: ${e.response.status}`);
            console.error(`Message: ${JSON.stringify(e.response.data)}`);
        } else {
            console.error(e.message);
        }
        process.exit(1);
    }
};

testRunner();
