require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// give time to go look at Q in the DAM
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// get all the approved videos in the Google moderation Q
async function getApprovedQ() {
  try {
    const approvedQ = await cloudinary.api.resources_by_moderation(
      'google_video_moderation',
      'approved',
      {
        resource_type: 'video',
      }
    );

    console.log(JSON.stringify(approvedQ, null, 2));
    // return the promise
    return approvedQ;
  } catch (error) {
    console.log('get approved Q error', JSON.stringify(error, null, 2));
    return { resources: [] };
  }
}

// make video accessible using access_control with access_type anon
async function makeVideoAccessible(video) {
  try {
    const updateResponse = await cloudinary.api.update(video.public_id, {
      resource_type: 'video',
      access_control: [{ access_type: 'anonymous' }],
      invalidate: true,
    });
    console.log('update response', JSON.stringify(updateResponse, null, 2));
    return updateResponse;
  } catch (error) {
    console.log('make accessible error', JSON.stringify(error, null, 2));
    return { video_accessible_error: JSON.stringify(error, null, 2) };
  }
}

exports.handler = async function (event, context) {
  // exit if not a post
  if (event.httpMethod !== 'POST') {
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

  // wait 30 seconds before approving
  await sleep(500);

  try {
    const approvedQ = await getApprovedQ();
    console.log('q', approvedQ);
    for (let i = 0; i < approvedQ.resources.length; i++) {
      let video = approvedQ.resources[i];
      let updateResponse = await makeVideoAccessible(video);
      console.log('made accessible', JSON.stringify(updateResponse, null, 2));
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "accepted Q processed" }),
    };
  } catch (error) {
    console.error('error', JSON.stringify(error, 0, 2));

    return {
      statusCode: 500,
      body: JSON.stringify({error: "error processing accepted Q"}),
    };
  }
};
