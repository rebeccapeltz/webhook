require('dotenv').config();
const sgMail = require('@sendgrid/mail');

exports.handler = async function (event, context) {
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

  // get data
  const data = JSON.parse(event.body);
  console.log(JSON.stringify(data, null, 2));

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.TO_RECIPIENT,
    from: process.env.FROM_VERIFIED_SENDER,
    subject: 'Webhook Notification',
    text: JSON.stringify(data, null, 2),
  };
  console.log('msg', msg);

  try {
    const response = await sgMail.send(msg);
    console.log('success', response[0].statusCode);
    console.log('success-response',response[0]);

    return {
      statusCode: response[0].statusCode,
      body: JSON.stringify({ message: response[0] }),
    };
  } catch (error) {
    console.error('error', JSON.stringify(error, 0, 2));
    // const errorMsg = error.response.body.errors[0].message;
    // console.log(errorMsg);

    return {
      statusCode: error.code,
      body: error.response.body.errors[0].message,
    };
  }
};
