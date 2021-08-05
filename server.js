//Install express server
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/weather-app'));
app.use(cors())

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/weather-app/index.html'));
});

const port = process.env.PORT || 5000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));
