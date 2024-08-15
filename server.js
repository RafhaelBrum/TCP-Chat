const net = require('net');
const chalk = require('chalk'); // Biblioteca pra estilizacao de texto no terminal

let clients = [];
let clientCount = 0;
const colors = [
    chalk.green,
    chalk.blue,
    chalk.magenta,
    chalk.cyan,
    chalk.yellow,
    chalk.red,
    chalk.gray,
    chalk.white,
];

// Criação do servidor TCP
const server = net.createServer((socket) => {
    clientCount++;
    const clientName = `Cliente ${clientCount}`;
    const clientColor = colors[(clientCount - 1) % colors.length];

    socket.clientName = clientName;
    socket.clientColor = clientColor;
    clients.push(socket);

    const connectMessage = `>> ${clientName} conectado`;
    console.log(clientColor(connectMessage));

    clients.forEach((client) => {
        client.write(clientColor(`${connectMessage}`));
    });

    socket.on('data', (data) => {
        const message = data.toString().trim();

        if (message.length === 0) {
            return;
        }

        const formattedMessage = `${clientName}: ${message}`;
        console.log(clientColor(formattedMessage));

        clients.forEach((client) => {
            if (client !== socket) {
                client.write(clientColor(`${formattedMessage}`));
            }
        });
    });


    socket.on('end', () => {
        const disconnectMessage = `>> ${clientName} desconectado`;
        console.log(clientColor(disconnectMessage));

        clients = clients.filter(client => client !== socket);

        clients.forEach((client) => {
            client.write(clientColor(`${disconnectMessage}`));
        });
    });
    socket.on('error', (err) => {
        console.error(clientColor(`Erro no ${clientName}:`), err.message);
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
});
