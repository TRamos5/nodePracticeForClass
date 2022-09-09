const http = require('http');
const db = require('./db.js');
const cds = require('./app');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);

// app.get('/', (req, res) => {
//     let htmlString = `
//         <h1>Lil Wayne</h1>
//         <p>The Old Goat</p>
//         <a href='/cds'>Checkout my cd's</a>
//     `
//     res.send(htmlString);
// });

// app.get('/cds', (req, res) => {
//     let htmlString = ``;
//     htmlString += '';
//     for (let cd of cds.firstArray) {

//         htmlString += `
//             <a href=/cd/${cds.firstArray.indexOf(cd)}>${cd.name}</a>
//             <p>${cd.publishDate}</p>
//             <ul>
//         `

//         for (let song of cd.songTitles) {
//             htmlString += `
//                 <li>${song}</li>
//             `
//         }
//         htmlString += '</ul>'
//     }

//     res.send(htmlString);
// })

// app.get('/cd/:cdNum', (req, res) => {
//     const { cdNum } = req.params;
//     const cd = cds.firstArray[cdNum];
//     let htmlString = ``;
//         htmlString += `<h1>${cd.name}</h1>`;
//         htmlString += `<h3>${cd.publishDate}</h1>`;

//         htmlString += '<ul>'
//         for (let song of cd.songTitles) {
//             htmlString += `<li>${song}</li>`
//         }
//         htmlString += '</ul>'
//     res.send(htmlString);

// })

app.get('/', (req, res) => {
    console.log('hello');
    res.render('home', {
        locals: {
            title: 'Address Book App'
        },
        partials: {
            head: '/partials/head'
        }
    });
});

app.get('/friends', (req, res) => {
    res.render('friends-list', {
        locals: {
            title: 'Friends List',
            friends: db,
            path: req.path
        },
        partials: {
            head: '/partials/head'
        }
    });
});

app.get('/friends/:handle', (req, res) => {
    const { handle } = req.params;
    console.log(req.params)
    const friend = db.find(f => f.handle === handle);
    if (friend) {
        res.render('friend', {
            locals: {
                title: `${friend.name}'s info`,
                friend
            },
            partials: {
                head: '/partials/head'
            }
        });
    } else {
        res.status(404).send(`no friends with that handle`);
    }
    
});

app.get('/name/:firstname/:lastname', (req, res) => {
    const { firstname, lastname } = req.params;
    res.json({
        "fullname": `${firstname}, ${lastname}`
    })
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


