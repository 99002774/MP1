const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;


app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

qat = require("./Data/data.json");

let Querys = [];
let flag = 1;

function readData() {
    const filename = "Data/data.json";
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    Querys = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "Data/data.json";
    const jsonData = JSON.stringify(Querys);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/Querys", (req, res) => {
    readData();
    res.send(JSON.stringify(Querys));
})






app.get("/Querys/:id", (req, res) => {
    const queryid = req.params.id;
    if (Querys.length == 0) {
        readData();
    }
    let foundRec = Querys.find((e) => e.queryId == queryid);
    if (foundRec == null)
        throw "Query not found";
    res.send(JSON.stringify(foundRec))
})


app.get("/searchByQueryName", function (req, res) {
    keyword = req.Querys.queryName;
  
    searchQuery = [];
    qat.forEach(element => {
        if (keyword == element.queryName) {
            searchQuery.push(element); 
        }
    });
    res.send(searchQuery);
})

app.put("/Querys", (req, res) => {
    if (Querys.length == 0)
        readData();
    let body = req.body;
    let flag=0;
    for (let index = 0; index < Querys.length; index++) {
        let element = Querys[index];
        if (element.queryId == body.queryId) {
            element.queryName = body.queryName;
            element.projectName = body.projectName;
            element.businessUnit = body.businessUnit;
            element.status = body.status;
            element.assignedTo = body.assignedTo;
            element.suggestion = body.suggestion;
            element.createdBy = body.createdBy;
            saveData();
            flag=1;
            res.send("Query updated successfully");
        }
    }
    if(flag==0){
        res.send("error in updating");
    }

})

app.post('/Querys', (req, res) => {
    if (Querys.length == 0)
        readData();
    let body = req.body;



    for (let index = 0; index < Querys.length; index++) {
        let element = Querys[index];
        if (element.queryName == body.queryName) {
            res.send("Query name already exists");
            flag = 0;
        }

    }


    if (flag >= 1) {
        Querys.push(body);
        saveData();
        res.send("Query added successfully");
    }

})




app.delete("/Querys/:id", (req, res) => {
    if (Querys.length == 0)
        readData();
    //let body = req.body; 
    var flag = 1;
    const queryid = req.params.id;
    for (let index = 0; index < Querys.length; index++) {
        let element = Querys[index];
        if (element.queryId == queryid) {
            Querys.splice(index, 1);
            res.send("query Deleted Successfully");
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