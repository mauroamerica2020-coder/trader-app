const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log("Servidor WebSocket rodando na porta 8080...");

wss.on('connection', (ws) => {
    console.log("Novo dispositivo conectado");

    ws.on('message', (message) => {
        const command = message.toString();
        
        // Transmite o comando imediatamente para todos os outros conectados
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(command);
            }
        });
    });
});
