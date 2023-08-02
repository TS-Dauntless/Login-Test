const { Pool } = require("pg");

const pool = new Pool({
    host: "dpg-cj5650oeba7s73dq4t1g-a",
    user: "ts",
    password: "lfmXMcGvOGijK6TcLCKZI3hEVFNndbW1",
    database: "user_details_abap",
    port: 5432,
});

const deleteTableQuery = "DROP TABLE IF EXISTS users;";
const createTableQuery = "CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, data VARCHAR(255));";
const insertQuery = `INSERT INTO users (username, password, data) VALUES ('aswath', 'aswathpass', 'vanakam da aswathe...');`;
const selectQuery = "SELECT * FROM users;";

(async () => {
    try {
        // Delete table if exists
        await pool.query(deleteTableQuery);
        console.log("Table deleted successfully!");

        // Create table
        await pool.query(createTableQuery);
        console.log("Table created successfully!");

        // Insert data
        await pool.query(insertQuery);
        console.log("Data inserted successfully!");

        // Select and display data
        const result = await pool.query(selectQuery);
        console.log(result.rows);
        console.log("Data displayed successfully!");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        // Release the pool when done
        pool.end();
    }
})();
