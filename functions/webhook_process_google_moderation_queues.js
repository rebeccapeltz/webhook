require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fetch = require('node-fetch');

// use this to call netlify functions
async function processQ(fnURL) {
  // return promise
  return await fetch(fnURL, { method: 'POST'});
}

exports.handler = async function (event, context) {
  // exit if not a post
  if (!event.body || event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        status: 'invalid-method',
      }),
    };
  }

  // setup functions to process Google moderation Qs
  const approvedFn = `${process.env.PROD_FN_PATH}webhook_process_approved_queue`;
  const rejectedFn = `${process.env.PROD_FN_PATH}webhook_process_rejected_queue`;
  console.log(approvedFn);
  console.log(rejectedFn);

  try {
    const approvedResponse = await processQ(approvedFn);
    console.log(approvedResponse);
    const rejectedResponse = await processQ(rejectedFn);
    console.log(rejectedResponse);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Google Moderation Q processing complete',
      }),
    };
  } catch (error) {
    console.error('error', JSON.stringify(error, 0, 2));

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'error processing Google Moderation Q' }),
    };
  }
};
