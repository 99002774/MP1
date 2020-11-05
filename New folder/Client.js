const express = require("express");
const app = express();
// const app2 = require("express")();
// const app3 = require("express")();
// const app4 = require("express")();
app.use(express.static('css'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})


app.get("/signup.html", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})


app.get("/menu.html", (req, res) => {
    res.sendFile(__dirname + "/Views/menu.html");
})

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/Views/index.html");
})


app.get("/add.html", (req, res) => {
    res.sendFile(__dirname + "/Views/add.html");
})



app.get("/edit.html", (req, res) => {
    res.sendFile(__dirname + "/Views/edit.html");
})



app.get("/search.html", (req, res) => {
    res.sendFile(__dirname + "/Views/search.html");
})


app.listen(1235, () => {
    console.log("Client App running at 1235");
})