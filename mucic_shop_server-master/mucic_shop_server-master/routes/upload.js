const express = require("express");
const router = express.Router();
const { config } = require("../config/secret");
const { auth } = require("../middlewares/auth");
const { UserModel } = require("../models/userModel");
const cloudinary = require("cloudinary").v2


cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_APIKEY,
    api_secret: config.CLOUDINARY_SECRET,
    secure: true
});

router.post("/",auth,  async (req, res) => {
    try {
        let fileInfo = req.files?.my_file;
        if (!fileInfo) {
            return res.status(400).json({ err_msg: "You need to send file" })
        }
        const uploadResponse = await cloudinary.uploader.upload(fileInfo.tempFilePath, {
            upload_preset: 'vh42yphd'
        }) 
        let data = await UserModel.updateOne({ _id: req.tokenData._id }, { img_user: uploadResponse.url });
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})
module.exports = router;



