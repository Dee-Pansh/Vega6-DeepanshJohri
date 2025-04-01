const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    api_key: process.env.api_key,
    cloud_name: process.env.cloud_name,
    api_secret: process.env.api_secret
})

const uploadMediaToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: "auto"
        },
            (error, result) => {
                if (error) {
                    logger.error("Error while uploading media to cloudinary,", error);
                    reject(error)
                }
                else
                    resolve(result);
            }
        );
        uploadStream.end(buffer);
    });
};

module.exports = { uploadMediaToCloudinary };