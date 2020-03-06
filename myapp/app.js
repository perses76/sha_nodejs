const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())


app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf-8', (err, data) => {
        res
        .set('Content-Type', 'text/html')
        .status(200)
        .send(data)
        .end()
    });
});

app.get('/user', (req, res) => {
    fs.readFile('user.json', (err, content) => {
        data = JSON.parse(content);
        res.json(data)
    });
});

app.post('/user', (req, res) => {
    console.log(req.body);
    var content = JSON.stringify(req.body);
    fs.writeFile("user.json", content, (err) => {
        res.sendStatus(201)
    });
});

app.get('/users', (req, res) => {
    fs.readFile('data/users.json', (err, content) => {
        data = JSON.parse(content);
        res.json(data)
    });
});

app.post('/users', (req, res) => {
    let user = req.body
    fs.readFile('data/users.json', (err, content) => {
        let data = JSON.parse(content);
        data.push(user);
        let new_content = JSON.stringify(data);
        fs.writeFile('data/users.json', new_content, (er) => {
            res.sendStatus(201);
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
