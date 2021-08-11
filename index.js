const express = require("express");
const bodyParse = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { get } = require("http");
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

const path = "./data/data.json";

const SaveData = (data) => {
    let stringify = JSON.stringify(data);
    fs.writeFileSync(path, stringify);
}

const GetData = () => {
    let json = fs.readFileSync(path);
    return JSON.parse(json);
}
const GetById = (id) => {
    let getdata = GetData();
    return getdata[id];
}
app.get('/users/:id?', (req, res) => {
    let id = req.params.id;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        else if (id) {
            let getById = GetById(id);
            res.send(getById);

        }
        else
            res.send(JSON.parse(data));
    })
})


app.post('/users', (req, res) => {
    let getdata = GetData();
    const id = uuidv4();

    getdata[id] = req.body;
    SaveData(getdata);
    res.send({ message: 'ok' })
})

app.put('/users/:id', (req, res) => {
    let getdata = GetData();
    let id = req.params.id;
    getdata[id] = req.body;
    SaveData(getdata);
    res.send({ message: 'ok' })
})

app.delete('/users/:id?', (req, res) => {
    let getdata = GetData();
    let id = req.params.id;
    if (id) {
        delete getdata[id];
    }
    else getdata = JSON.parse("{}");
    SaveData(getdata);
    res.send({ message: 'ok' })
})



app.listen(3000, () => {
    console.log("server start");
})
