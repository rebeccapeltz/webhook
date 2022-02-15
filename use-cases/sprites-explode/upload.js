require('dotenv').config();
const cloudinary = require('cloudinary').v2;


cloudinary.uploader
    .upload('./assets/kitten_fighting.gif', {
      use_filename: true,
      unique_filename: false,
      folder: 'explode'
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

