import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

var app = express();

app.use(cors());
app.use(bodyParser.json());

/* The implementation below was coded by utilizing the following tutorial: https://www.youtube.com/watch?v=rRn2EisxPl4&t=1792s */
app.get('/getAccessToken', async function (req, res) {
    const params = `?client_id=${process.env.VITE_CLIENT_ID}&client_secret=${process.env.VITE_CLIENT_SECRET}&code=${req.query.code}`;

    if (params) {
        const requestConfig = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        }
        try {
            const response = await fetch('https://github.com/login/oauth/access_token' + params, requestConfig);
            if (!response.ok) {
                alert('An error happened during fetch');
            } else {
                const data = await response.json();
                console.log(data);
                res.json(data);
            }
        } catch (err) {
            console.error(err);
        }
    }
})

app.get('/getUserData', async function (req, res) {
    req.get("Authorization");
    const requestConfig = {
        method: 'GET',
        headers: {
            'Authorization': req.get('Authorization')
        }
    }
    try {
        const response = await fetch('https://api.github.com/user', requestConfig);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
    }
})

app.listen(4000, function () {
    console.log('Cors server running on port 4000');
})