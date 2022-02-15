require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const getURLs = (publicId) => {
  const urls = [];
  for (let i = 0; i <= 100; i +=25) {
    // console.log(cloudinary.url('explode/kitten_fighting', { page: `${i}` }))
    urls.push(cloudinary.url('explode/kitten_fighting', { page: `${i}` }));
  }
  return urls;
};

const urls = getURLs('explode/kitten_fighting');

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


