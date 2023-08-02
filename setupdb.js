const { Pool } = require("pg");

const pool = new Pool({
    host: "dpg-cj5650oeba7s73dq4t1g-a",
    user: "ts",
    password: "lfmXMcGvOGijK6TcLCKZI3hEVFNndbW1",
    database: "user_details_abap",
    port: 5432,
});

let query =
    "CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, data VARCHAR(255));";

pool.query(query, (err, result) => {
    if (err) {
        console.error("Error executing Table query:", err);
    } else {
        console.log("Table Created successfully!");
    }
});

query = `INSERT INTO users (username, password, data) VALUES ('aswath', 'aswathpass', 'vanakam da aswathe...');`;

pool.query(query, (err, result) => {
    if (err) {
        console.error("Error executing insert query:", err);
    } else {
        console.log("Data inserted successfully!");
    }
});
