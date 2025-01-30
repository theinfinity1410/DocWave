const Document = require('./Document');

let connectedClients = {};

exports.setupWebSocket = (server) => {
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const userId = req.url.split('=')[1];

        if (userId) {
            connectedClients[userId] = ws;
        }

        ws.on('message', (message) => {
            const { documentId, content } = JSON.parse(message);

            Document.findByIdAndUpdate(documentId, { content }, { new: true }, (err, updatedDoc) => {
                if (err) {
                    console.error(err);
                } else {
                    Object.values(connectedClients).forEach((client) => {
                        if (client !== ws) {
                            client.send(JSON.stringify(updatedDoc));
                        }
                    });
                }
            });
        });

        ws.on('close', () => {
            delete connectedClients[userId];
        });
    });
};