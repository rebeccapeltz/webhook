require('dotenv').config();
const cloudinary = require('cloudinary').v2;


const uploadWithTag = (image, tag) => {
  cloudinary.uploader
    .upload(image, {
      use_filename: true,
      unique_filename: false,
      tags: [tag],
      folder: 'multi'
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

uploadWithTag('./assets/butterfly.jpg', 'multi-nature');
uploadWithTag('./assets/butterflies.jpg', 'multi-nature');
uploadWithTag('./assets/garden.jpg', 'multi-nature');


