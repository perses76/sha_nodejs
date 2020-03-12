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
        let users = JSON.parse(content);
        var last_user = users.reduce((a, b) => Math.max(a.id, b.id));
        let new_id = last_user.id + 1;
        user.id = new_id;
        users.push(user);
        let new_content = JSON.stringify(users);
        fs.writeFile('data/users.json', new_content, (er) => {
            res.sendStatus(201);
        });
    });
});

app.get('/users/:id', (req, res) => {
    fs.readFile('data/users.json', (err, content) => {
        let users = JSON.parse(content);
        var user = users.find(user => user.id == req.params.id);
        res.json(user);
    });
});

app.delete('/users/:id', (req, res) => {
    fs.readFile('data/users.json', (err, content) => {
        const users = JSON.parse(content);
        const new_users = users.filter(user => user.id != req.params.id)
        const new_content = JSON.stringify(new_users);
        fs.writeFile('data/users.json', new_content, (er) => {
            res.sendStatus(204);
        });
    });
});

app.put('/users/:id', (req, res) => {
    fs.readFile('data/users.json', (err, content) => {
        const users = JSON.parse(content);
        let user = users.find(user => user.id == req.params.id);
        Object.assign(user, req.body);
        const new_content = JSON.stringify(users);
        fs.writeFile('data/users.json', new_content, (er) => {
            res.sendStatus(200);
        });
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
