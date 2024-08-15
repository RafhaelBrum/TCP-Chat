
# TCP Chat Application

💬 **A simple command-line TCP chat application built using Node.js.**

## Features

- **Multi-client support**: Multiple clients can connect to the server and chat in real-time.
- **Color-coded messages**: Each client’s messages are displayed in a unique color, making it easy to differentiate between users.
- **Input preservation**: If someone sends a message while you're typing, your input won't be interrupted.

## Requirements

- **Node.js** installed on your machine.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RafhaelBrum/TCP-Chat.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd TCP-Chat
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   ```

## Usage

### Starting the Server

To start the server, run the following command:

```bash
node server.js
```

The server will start listening on port 3000.

### Connecting as a Client

To connect to the chat server as a client, open a new terminal and run:

```bash
node client.js
```

You can open multiple terminals and run the above command in each to simulate multiple clients.

## Notes

- Make sure the server is running before trying to connect as a client.
- Each client is assigned a unique color to differentiate their messages in the chat.
- The application preserves your input while you're typing, even if someone else sends a message.
