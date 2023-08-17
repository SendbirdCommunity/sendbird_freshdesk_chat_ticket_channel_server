const axios = require("axios");

/**
 * Sends an HTTP request using axios.
 *
 * @async
 * @function
 * @param {string} url - The endpoint URL.
 * @param {Object} data - The request data.
 * @param {Object} headers - The request headers.
 * @param {Object} [auth=null] - Authentication credentials.
 * @returns {Object} - The response data.
 */
const sendRequest = async (url, data, headers, auth = null) => {
    try {
        const response = await axios.post(url, data, { headers, auth });
        return response.data;
    } catch (error) {
        throw error.response.data //{message: error.response.data};
    }
};

module.exports = { sendRequest }