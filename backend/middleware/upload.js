const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"goa/avatars",

        allowed_formats:[
            "jpg",
            "png",
            "jpeg",
            "webp"
        ],

        transformation:[
            {
                width:500,
                height:500,
                crop:"fill"
            }
        ]
    }
});


const upload = multer({
    storage
});


module.exports = upload;