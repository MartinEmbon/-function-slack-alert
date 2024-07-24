
const fetch = require('node-fetch');

const SLACK_WEBHOOK_URL = 'https://slack.com/api/chat.postMessage';
const SLACK_BEARER_TOKEN = 'x';

exports.slackFunction = async (req, res) => {
  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SLACK_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: 'C06SC4LMPSR', 
        text: 'test error webhook'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Slack API response error:', data);
      res.status(response.status).send(data);
    } else {
      console.log('Slack notification sent successfully:', data);
      res.status(200).send('Notification sent');
    }
  } catch (error) {
    console.error('Error sending notification to Slack:', error);
    res.status(500).send('Failed to send notification');
  }
};
