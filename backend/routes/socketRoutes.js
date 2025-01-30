// webSocketRoutes.js
const { setupWebSocket } = require('./websocket');

module.exports = (server) => {
    setupWebSocket(server);
};
