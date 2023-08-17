require('dotenv').config();
const axios = require("axios");
const APP_ID = process.env.APP_ID;


// Authentication middleware
async function isAuthenticated(req, res, next) {
  const data = req.body
  const headers = req.headers
  try {
    const response = await axios.post(
      `https://api-${APP_ID}.sendbird.com/v3/users/${data.sendbird_user_id}/login`,
      {
        app_id: APP_ID,
      },
      {
        headers: {
          "access-token": headers['session-token']
        },
      }
    );

    if (response.status === 200) {
      next(); // User is authenticated, continue to the next middleware
    } else {
      console.log(response.status)
      res.status(401).send("User not authenticated.");
    }
  } catch (error) {
    console.error("Error checking authentication:", error.message);
    res.status(500).send("Error! Not authenticated.");
  }
}

module.exports = {isAuthenticated}