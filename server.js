//Install express server
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');

const app = express();

const whitelist = ['https://dataservice.accuweather.com/']; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

app.use(cors(corsOptions));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/weather-app'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/weather-app/index.html'));
});

const port = process.env.PORT || 5000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));
