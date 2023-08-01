const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// Database
const connection = mysql.createConnection({
    host: "sql304.infinityfree.com",
    user: "if0_34731891",
    password: "@InfinityFree",
    database: "if0_34731891_user_details",
});

// Server
const app = express();

app.use(express.static(path.join(__dirname, "login-page/build")));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
    const loginData = req.body;
    const clientIp = req.ip;
    const responseData = { success: "No" };
    // Checking Username with password
    const query = `select data from users where username="${loginData.username}" and password="${loginData.password}";`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(displayInfo(clientIp) + "DataBase Query Error: " + err);
            res.json(responseData);
        } else {
            if (result.length == 0) {
                console.log(
                    displayInfo(clientIp) + "Username Password Mismatch"
                );
                responseData["success"] = "Mismatch";
                res.json(responseData);
            } else if (result.length != 1) {
                console.log(
                    displayInfo(clientIp) + "Something went wrong in database"
                );
                responseData["success"] = "DataBase Error";
                res.json(responseData);
            } else {
                console.log(displayInfo(clientIp) + "Success");
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
    console.log(displayInfo("") + "server Started at " + PORT);
});

// Others

function displayInfo(ip) {
    const today = new Date();
    const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time + " " + ip + "  ";
}
