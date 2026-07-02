require("dotenv").config();

const app = require("./src/app");
const pool = require("./src/config/db");

const PORT = process.env.PORT || 3000;

pool.connect()
    .then(client => {
        console.log("PostgreSQL Connected");
        client.release();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Database connection failed:", err);
    });