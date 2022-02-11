require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const urls = [
  'http://res.cloudinary.com/pictures77/image/upload/pg_1/v1644367644/explode/kitten_fighting.png',
  'http://res.cloudinary.com/pictures77/image/upload/pg_25/v1644367644/explode/kitten_fighting.png',
  'http://res.cloudinary.com/pictures77/image/upload/pg_50/v1644367644/explode/kitten_fighting.png',
  'http://res.cloudinary.com/pictures77/image/upload/pg_75/v1644367644/explode/kitten_fighting.png',
  'http://res.cloudinary.com/pictures77/image/upload/pg_100/v1644367644/explode/kitten_fighting.png',
];

// image and css
cloudinary.uploader
  .generate_sprite({
    urls: urls,
    notification_url:
      'https://webhook.site/1a0678f1-afc3-4077-8666-e232a5fe8c2d',
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
