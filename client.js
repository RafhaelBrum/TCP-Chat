const net = require('net');

const options = {
    host: 'localhost',
    port: 3000
};

// Creating TCP client
const client = net.createConnection(options, () => {
    console.log('Connected to the chat server');

    // Captures user input to send messages
    process.stdin.on('data', (data) => {
        const message = data.toString().trim();

        if (message.length > 0) {
            client.write(message);
        }
    });
});

// Handles data received from the server
client.on('data', (data) => {
    console.log(data.toString().trim());
});

// Handles server disconnection
client.on('end', () => {
    console.log('Disconnected from the server');
});

// Handles connection errors
client.on('error', (err) => {
    console.error('Client error:', err.message);
});
