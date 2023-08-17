require('dotenv').config();
const { sendRequest } = require("../utils/sendRequest")

const APP_ID = process.env.APP_ID;
const API_TOKEN = process.env.API_TOKEN;


/**
 * Prepares message data for Sendbird API.
 *
 * @function
 * @param {string} message - The message content.
 * @param {string} channelUrl - The Sendbird channel URL.
 * @returns {Object} - The prepared message data.
 */
const prepareMessageData = (message, channelUrl, sendbird_user_id) => {
    return {
        headers: {
            'Api-Token': API_TOKEN,
            'Content-Type': 'application/json',
        },
        data: {
            message_type: 'MESG',
            message: message,
            user_id: sendbird_user_id,
        },
        url: `https://api-${APP_ID}.sendbird.com/v3/group_channels/${channelUrl}/messages`
    };
};

/**
 * Prepares channel data for Sendbird API.
 *
 * @function
 * @param {number} ticketId - The Freshdesk ticket ID.
 * @param {string} subject - The ticket subject.
 * @returns {Object} - The prepared channel data.
 */
const prepareSendbirdChannelData = (ticketId, data) => {
  
    const {sendbird_user_id, subject} = data
    return {
        headers: {
            'Api-Token': API_TOKEN,
            'Content-Type': 'application/json',
        },
        data: {
            channel_url: `freshdesk_${ticketId}`,
            name: `#${ticketId} ${subject}`,
            user_ids: ['jason_4'],
        },
        url: `https://api-${APP_ID}.sendbird.com/v3/group_channels`
    };
};


/**
 * Creates a Sendbird channel using the provided ticket display ID and data.
 *
 * @async
 * @param {string|number} ticketDisplayId - The display ID of the ticket.
 * @param {Object} data - Data required to create the channel.
 * @returns {Promise<Object>} - Response object from the channel creation request.
 */
const createSendbirdChannel = async (ticketDisplayId, data) => {
    const sendbirdChannelData = prepareSendbirdChannelData(ticketDisplayId, data);
    return await sendRequest(sendbirdChannelData.url, sendbirdChannelData.data, sendbirdChannelData.headers);
};

/**
 * Sends a message in a Sendbird channel.
 *
 * @async
 * @param {string} subject - Subject of the message.
 * @param {string} description - Description or content of the message.
 * @param {string} channelUrl - URL of the Sendbird channel.
 * @param {string} sendbirdUserId - ID of the Sendbird user.
 * @returns {Promise<Object>} - Response object from the message sending request.
 */
const sendMessageInChannel = async (subject, description, channelUrl, sendbirdUserId) => {
    const messageText = `Hi. I'm having trouble with ${subject}. Can you help? Let me say that ${description}.`;
    const messageData = prepareMessageData(messageText, channelUrl, sendbirdUserId);
    return await sendRequest(messageData.url, messageData.data, messageData.headers);
};

module.exports = {createSendbirdChannel, sendMessageInChannel}