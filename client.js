const net = require('net');

const options = {
    host: 'localhost',
    port: 3000
};

const client = net.createConnection(options, () => {
    console.log('Conectado ao servidor de chat');

    process.stdin.on('data', (data) => {
        const message = data.toString().trim();
        if (message.length > 0) {
            client.write(message);
        }
    });
});

client.on('data', (data) => {
    console.log(data.toString().trim());
});

client.on('end', () => {
    console.log('Desconectado do servidor');
});

client.on('error', (err) => {
    console.error('Erro no cliente:', err.message);
});
