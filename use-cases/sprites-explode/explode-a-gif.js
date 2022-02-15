require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.uploader
  .explode('explode/kitten_fighting', {
    format: 'png',
    page: 'all',
    notification_url:
      'https://webhook.site/1a0678f1-afc3-4077-8666-e232a5fe8c2d',
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
