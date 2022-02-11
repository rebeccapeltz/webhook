require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// give time to go look at Q in the DAM
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  

// get all the rejected videos in the Google moderation Q
async function getRejectedQ() {
  try {
    const rejectedQ = await cloudinary.api.resources_by_moderation(
      'google_video_moderation',
      'rejected',
      {
        resource_type: 'video',
      }
    );
    // return the promise
    return rejectedQ;
  } catch (error) {
    // if error log and return empty resources
    console.log('get rejected Q error', JSON.stringify(error, null, 2));
    return {"resources": []};
  }
}

// destroy rejected videos
async function destroyVideo(video) {
  console.log('in destroy video', video.public_id);
  try {
    const destroyResponse = cloudinary.uploader.destroy(video.public_id, {
      invalidate: true,
      resource_type: 'video',
    });
    return destroyResponse;
  } catch (error) {
    console.log('destroy error', JSON.stringify(error, null, 2));
    return {"destroy_error": JSON.stringify(error,null,2)}
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

  // wait 30 seconds before destroying for demo purposes
  await sleep(500);

  try {
    const rejectedQ = await getRejectedQ();

    console.log('q', rejectedQ);
    console.log('q resources', rejectedQ.resources);
    for (let i = 0; i < rejectedQ.resources.length; i++) {
      let video = rejectedQ.resources[i];
      let destroyResponse = await destroyVideo(video);
      console.log('destroy response', JSON.stringify(destroyResponse, null, 2));
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "rejected Q processed" }),
    };
  } catch (error) {
    console.error('error', JSON.stringify(error, 0, 2));

    return {
      statusCode: 500,
      body: JSON.stringify({error: "error processing rejected Q"}),
    };
  }
};
