const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

// Database
const pool = new Pool({
    host: "dpg-cj5650oeba7s73dq4t1g-a",
    user: "ts",
    password: "lfmXMcGvOGijK6TcLCKZI3hEVFNndbW1",
    database: "user_details_abap",
    port: 5432,
});

// Server
const app = express();

app.use(express.static(path.join(__dirname, "login-page/build")));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
    const loginData = req.body;
    const responseData = { success: "No" };
    // Checking Username with password
    const query = `select data from users where username="${loginData.username}" and password="${loginData.password}";`;
    console.log(query);
    pool.query(query, (err, result) => {
        if (err) {
            console.log("DataBase Query Error: " + err);
            res.json(responseData);
        } else {
            if (result.length == 0) {
                console.log("Username Password Mismatch");
                responseData["success"] = "Mismatch";
                res.json(responseData);
            } else if (result.length != 1) {
                console.log("Something went wrong in database");
                responseData["success"] = "DataBase Error";
                res.json(responseData);
            } else {
                console.log("Success");
                responseData["message"] = result[0].data;
                responseData["success"] = "Yes";
                res.json(responseData);
            }
        }
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login-page/build/index.html"));
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log("server Started at " + PORT);
});
