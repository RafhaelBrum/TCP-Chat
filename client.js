const net = require('net');
const readline = require('readline'); // Handles terminal lines

const options = {
    host: 'localhost',
    port: 3000
};

// Creating the TCP client
const client = net.createConnection(options, () => {
    console.log('Connected to the chat server');
});

// Creating chatbox/prompt
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to re-display the current input after a message is received
// *Fixes a bug ^ (it was messing your text if someone sent a message while you was typing)
function refreshInput(input) {
    process.stdout.write('\r\x1b[K');
    process.stdout.write(input);
}

// Reads user input to send messages in a prompt
rl.on('line', (input) => {
    if (input.trim().length > 0) {
        client.write(input);
    }
    rl.prompt();
});

// Handles data received from the server
client.on('data', (data) => {
    const currentInput = rl.line;

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);

    console.log(data.toString().trim());

    refreshInput(currentInput);
    rl.prompt(true);
});

// Handles server disconnection
client.on('end', () => {
    console.log('Disconnected from the server');
    rl.close();
});

// Handles connection errors
client.on('error', (err) => {
    console.error('Client error:', err.message);
    rl.close();
});
