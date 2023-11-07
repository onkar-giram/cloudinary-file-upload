const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const fileUpload = require("express-fileupload");

// import database and cloudinary
const connectDB = require("./config/database");
const cloudinary = require("./config/cloudinary");

//middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// mount api routes
FileUpload = require("./routes/FileUploadRoute");
app.use("/api/v1/upload", FileUpload);

app.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`);
});

// database and cloudinary
connectDB();
cloudinary.cloudinaryConnect();
