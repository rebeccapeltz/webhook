require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// supply the tag shared by images to be animated
const butterflies = [
  'https://res.cloudinary.com/cloudinary-training/image/upload/v1644359935/multi/garden.jpg',
  'https://res.cloudinary.com/cloudinary-training/image/upload/v1644359935/multi/butterflies.jpg',
  'https://res.cloudinary.com/cloudinary-training/image/upload/v1644359935/multi/butterfly-blue.jpg',
];
cloudinary.uploader
  .multi('multi-nature',
    { delay: 2000 , format: 'mp4', notification_url: 'https://webhook.site/1a0678f1-afc3-4077-8666-e232a5fe8c2d'}
  )
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
