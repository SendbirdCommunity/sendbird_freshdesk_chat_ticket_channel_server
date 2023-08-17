require('dotenv').config();
const express = require("express");
const axios = require("axios");
const { isAuthenticated } = require("./middleware/isAuthenticated")
const { createTicket } = require("./services/ticketService")
const { sendRequest } = require("./utils/sendRequest")
const { createSendbirdChannel, sendMessageInChannel } = require("./services/sendbirdService")
//
const app = express();
app.use(express.json());
const APP_ID = process.env.APP_ID;
const API_TOKEN = process.env.API_TOKEN;
const FRESHDESK_API_TOKEN = process.env.FRESHDESK_API_TOKEN
const TICKET_CREATION_URL = 'https://sendbird2.freshdesk.com/helpdesk/tickets.json';




/**
 * Processes the creation of a new ticket on Freshdesk and sends a corresponding message on Sendbird.
 *
 * @async
 * @param {Object} data - Data required to process the new ticket.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const processNewTicket = async (data, res) => {
    try {
        const createdTicketResponse = await createTicket(data);
        const ticketDisplayId = createdTicketResponse.helpdesk_ticket.display_id;

        const channel = await createSendbirdChannel(ticketDisplayId, data);
        const message = await sendMessageInChannel(data.subject, data.description, channel.channel_url, data.sendbird_user_id);

        res.status(200).send({ ticket: createdTicketResponse, channel, message });
    } catch (error) {
        res.status(400).send("Error! " + error.message);
        console.error('Error occurred during new ticket process:', error.message);
    }
};


app.post("/new_ticket", isAuthenticated, async (req, res) => {
  try {
    // const parsedData = parsePayload(req.body);
    processNewTicket(req.body, res)
    // res.send("Received and parsed your request!");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request.");
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
