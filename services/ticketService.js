require('dotenv').config();

const FRESHDESK_API_TOKEN = process.env.FRESHDESK_API_TOKEN
const TICKET_CREATION_URL = 'https://sendbird2.freshdesk.com/helpdesk/tickets.json';
const { sendRequest } = require("../utils/sendRequest")

/**
 * Prepares ticket data for Freshdesk API.
 *
 * @function
 * @param {string} subject - The ticket subject.
 * @param {string} description - The ticket description.
 * @returns {Object} - The prepared ticket data.
 */
const prepareTicketData = (data) => {
  
    const {description, subject, freshdesk_user_email, priority, status} = data
    
        // Check for required fields
    if (description === undefined) throw new Error('Description is required.');
    if (subject === undefined) throw new Error('Subject is required.');
    if (freshdesk_user_email === undefined) throw new Error('Email is required.');
    if (priority === undefined) throw new Error('Priority is required.');
    if (status === undefined) throw new Error('Status is required.');
    
     return {
        auth: {
            username: FRESHDESK_API_TOKEN,
            password: 'x',
        },
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            helpdesk_ticket: { 
                description,
                subject,
                email: freshdesk_user_email,
                priority,
                status,
            },
        },
        url: TICKET_CREATION_URL
    };
};


/**
 * Creates a ticket using the provided data.
 *
 * @async
 * @param {Object} data - Data required to create the ticket.
 * @returns {Promise<Object>} - Response object from the ticket creation request.
 */
const createTicket = async (data) => {
    const ticketData = prepareTicketData(data);
    return await sendRequest(ticketData.url, ticketData.data, ticketData.headers, ticketData.auth);
};

module.exports = { createTicket }