
# SendBird Freshdesk Chat Webhook Server

**Version**: 0.1.0

## Description

A simple Node app built on Fastify, instantly up and running. This server handles webhooks and integrates with both SendBird and Freshdesk platforms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)

## Installation

1. Ensure you have Node.js (v14.x) installed.
2. Clone this repository.
3. Navigate to the project directory.
4. Run `npm install` to install the dependencies.
5. Create a `.env` file in the root directory and set the required environment variables (e.g., `APP_ID`, `API_TOKEN`).

## Usage

To start the server, run:

```
npm start
```

This will start the server using the `server.js` entry point.

## Endpoints

### POST /new_ticket

Endpoint to create a new ticket.

**Note**: For detailed payload structure and responses, refer to the respective service modules.

## License

This project is licensed under the MIT License.
