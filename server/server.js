import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    console.log(req.query.code);

    const params = `?client_id=${process.env.VITE_CLIENT_ID}&client_secret=${process.env.VITE_CLIENT_SECRET}&code=${req.query.code}`;

    await fetch('https://github.com/login/oauth/access_token' + params, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        res.json(data);
    });
})

app.get('/getUserData', async function (req, res) {
    req.get("Authorization");
    await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            'Authorization': req.get('Authorization')
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
})

app.listen(4000, function () {
    console.log('Cors server running on port 4000');
})