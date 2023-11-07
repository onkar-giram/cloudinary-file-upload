const File = require("../models/FileModel");
const { options } = require("../routes/FileUploadRoute");
const cloudinary = require("cloudinary").v2;

function isFileSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not suppported",
      });
    }

    const response = await uploadFileToCloudinary(file, "demo");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      image_url: response.secure_url,
      message: " Image successfully uploaded",
    });
  } catch (error) {
    res.json({
      success: false,
      message: " kuch to hua hai",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;

    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("filetype " + fileType);

    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not suppported",
      });
    }

    const response = await uploadFileToCloudinary(file, "demo");
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      image_url: response.secure_url,
      message: " Video successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: " kuch to hua hai",
    });
  }
};

exports.imageReducerUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not suppported",
      });
    }

    const response = await uploadFileToCloudinary(file, "demo", 30);
    console.log(response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      image_url: response.secure_url,
      message: " Image successfully uploaded",
    });
  } catch (error) {
    res.json({
      success: false,
      message: " kuch to hua hai",
    });
  }
};

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("FILE: " + file);

    let path =
      __dirname + "/files/" + Date.now() + "." + `${file.name.split(".")[1]}`;
    console.log("PATH: " + path);
    file.mv(path, (err) => {
      console.error(err);
    });

    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (err) {
    console.error(err);
  }
};
