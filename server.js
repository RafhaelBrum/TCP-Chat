const net = require("net");
const chalk = require("chalk");

let clients = [];
let clientCount = 0;
const colors = [
  chalk.green,
  chalk.blue,
  chalk.magenta,
  chalk.cyan,
  chalk.yellow,
  chalk.red,
];

const server = net.createServer((socket) => {
  clientCount++;
  const clientName = `Client ${ clientCount }`;
  const clientColor = colors[(clientCount - 1) % colors.length];

  socket.clientName = clientName;
  socket.clientColor = clientColor;
  clients.push(socket);

  const connectMessage = `>> ${ clientName } connected`;
  console.log(clientColor(connectMessage));

  clients.forEach((client) => {
    client.write(clientColor(`${ connectMessage }`));
  });

  socket.on("data", (data) => {
    const message = data.toString().trim();

    if (message.length === 0) {
      return;
    }

    const formattedMessage = `${ clientName }: ${ message }`;
    console.log(clientColor(formattedMessage));

    clients.forEach((client) => {
      if (client !== socket) {
        client.write(message);
      }
    });
  });

  socket.on("end", () => {
    const disconnectMessage = `>> ${ clientName } disconnected`;
    console.log(clientColor(disconnectMessage));

    clients = clients.filter((client) => client !== socket);

    clients.forEach((client) => {
      client.write(clientColor(`${ disconnectMessage }`));
    });
  });

  socket.on("error", (err) => {
    console.error(clientColor(`Error in ${ clientName }:`), err.message);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${ PORT }`);
});
