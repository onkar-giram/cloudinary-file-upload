const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware
fileSchema.post("save", async function (doc) {
  try {
    let transporter = nodemailer.transporter({
      hsot: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "Onkar Giram",
      to: doc.email,
      subject: "New File Uploaded on Cloudinary",
      html: `<h2> Hello </h2> <p>Your File is not Uploaded on Cloudinary </p> View here : <a href="${doc.imageUrl}"> ${doc.imageUrl}</a>`,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = mongoose.model("File", fileSchema);
