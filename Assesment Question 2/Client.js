const app = require("express")();
const app2 = require("express")();
const app3 = require("express")();
const app4 = require("express")();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Views/index.html");
})

app.listen(1235, () => {
    console.log("Client App running at 1235");
})

app2.get("/", (req, res) => {
    res.sendFile(__dirname + "/Views/add.html");
})

app2.listen(1236, () => {
    console.log("Client App running at 1236");
})

app3.get("/", (req, res) => {
    res.sendFile(__dirname + "/Views/edit.html");
})

app3.listen(1237, () => {
    console.log("Client App running at 1237");
})

app4.get("/", (req, res) => {
    res.sendFile(__dirname + "/Views/search.html");
})

app4.listen(1238, () => {
    console.log("Client App running at 1238");
})