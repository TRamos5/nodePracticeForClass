const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send(`Hello World!`);
});

app.get('/cats', (req, res) => {
    res.send(`Meow!`);
});

app.get('/dogs', (req, res) => {
    res.send(`Woof!`);
});

app.get('/cats_and_dogs', (req, res) => {
    res.send(`Dogs and cats living together...mass hysteria!!`);
});

app.get('/greet/:handle', (req, res) => {
    const { handle } = req.params;
    res.send(`<h1>Hello, ${handle}!</h1>`);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});