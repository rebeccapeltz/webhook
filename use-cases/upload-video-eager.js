require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// eager async upload to create derived optimization transformations
// asynchronously to avoid delays with on the fly transformations

cloudinary.uploader
  .upload("./assets/roller-skating.mp4", {
    // public_id: "roller-skating",
    type: "upload",
    overwrite: true,
    invalidate: true,
    resource_type: "video",
    tags: "cust-training-2022",
    eager: [
      { raw_transformation: "f_webm,vc_vp9,q_auto/mp4" },
      { raw_transformation: "f_mp4,vc_h265,q_auto/mp4" },
      { raw_transformation: "f_mp4,vc_h264,q_auto/mp4" },
    ],
    eager_async: true,
    eager_notification_url:"https://rpeltz-webhook.netlify.app/.netlify/functions/webhook_notify_email",
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
