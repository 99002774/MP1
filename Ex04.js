const app = require("express")();
const app2 = require("express")();
const app3= require("express")();
const app4 = require("express")();
const app5 = require("express")();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Client.html");
})

app.listen(3333, () => {
    console.log("Client App running at 3333");
})

app2.get("/", (req, res) => {
    res.sendFile(__dirname + "/CreateQuery.html");
})

app2.listen(3334, () => {
    console.log("Client App running at 3333");
})

app3.get("/", (req, res) => {
    res.sendFile(__dirname + "/EditQuery.html");
})

app3.listen(3335, () => {
    console.log("Client App running at 3333");
})

app4.get("/", (req, res) => {
    res.sendFile(__dirname + "/ExistingQuery.html");
})

app4.listen(3336, () => {
    console.log("Client App running at 3333");
})

app5.get("/", (req, res) => {
    res.sendFile(__dirname + "/SearchQuery.html");
})

app5.listen(3337, () => {
    console.log("Client App running at 3333");
})