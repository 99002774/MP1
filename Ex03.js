//Example for creating JSON Rest server....
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;

//middleware....
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

qat = require("./data.json");

//GET(Reading), POST(Adding), PUT(Updating), DELETE(Deleting) data....
let query = []; //blank array...
let flag = 1;

function readData() {
    const filename = "data.json"; //new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    query = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "data.json";
    const jsonData = JSON.stringify(query);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/query", (req, res) => {
    readData();
    res.send(JSON.stringify(query));
})

app.get("/query/:id", (req, res) => {
    const queryid = req.params.id;
    if (query.length == 0) {
        readData();
    }
    let foundRec = query.find((e) => e.queryId == queryid);
    if (foundRec == null)
        throw "query not found";
    res.send(JSON.stringify(foundRec))
})

app.get("/searchByQueryName", function (req, res) {
    keyword = req.query.queryName;
    searchQuery = [];
    qat.forEach(element => {
        if (keyword == element.queryName) {
            searchQuery.push(element); // this will only send name of the hotel, for full detail use push(element)
        }
    });
    res.send(searchQuery);
})

app.put("/query", (req, res) => {
    if (query.length == 0)
        readData(); //Fill the array if it is not loaded....
    let body = req.body;
    //iterate thro the collection
    for (let index = 0; index < query.length; index++) {
        let element = query[index];
        if (element.queryId == body.queryId) { //find the matching record
            element.queryName = body.queryName;
            element.projectName = body.projectName;
            element.businessUnit = body.businessUnit;
            element.createdBy = body.createdBy;
            saveData();
            res.send("Query updated successfully");
        }
    }
    //update the data
    //exit the function....
})

app.post('/query', (req, res) => {
    if (query.length == 0)
        readData(); //Fill the array if it is not loaded....
    let body = req.body; //parsed data from the POST...



    for (let index = 0; index < query.length; index++) {
        let element = query[index];
        if (element.queryName == body.queryName) { //find the matching record
            res.send("Query name already exists");
            flag = 0;
        }

    }


    if (flag >= 1) {
        query.push(body);
        saveData(); //updating to the JSON file...
        res.send("Query added successfully");
    }

})
app.delete("/query/:id", (req, res) => {
    if (query.length == 0)
        readData();
    //let body = req.body; 
    var flag = 1;
    const queryid = req.params.id;
    for (let index = 0; index < query.length; index++) {
        let element = query[index];
        if (element.queryId == queryid) {
            query.splice(index, 1);
            res.send("queryDeleted Successfully");
            saveData();
            readData();
            flag = 0;
        }
    }
    if (flag >= 1) {
        res.send("Error in Deleting");
    }

})



app.listen(1234, () => {
    console.log("Server available at 1234");
})