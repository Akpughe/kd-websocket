const PORT = process.env.PORT || 6000;
const INDEX = '/index.html';
const WebSocket = require('ws');
const app = require('express')();

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const { Server } = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });
const wss = new Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
        console.log('data', data.toString());
        // client.send(new Date().toTimeString());
      }
    });
  });
});
