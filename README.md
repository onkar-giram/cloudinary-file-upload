# cloudinary-file-upload
image/video upload [original or compressed] into local directory or cloudinary library folder

cloudinary
express-fileupload

==================================  cloudinary ===================================

cloudinary.url("sample.jpg", {width: 100, height: 150, crop: "fill", fetch_format: "auto"})

//Upload
cloudinary.v2.uploader.upload("/home/my_image.jpg", {upload_preset: "my_preset"}, (error, result)=>{
  console.log(result, error);
});

// Large/Chunked Upload
cloudinary.v2.uploader.upload_large(LARGE_RAW_FILE, {
     chunk_size: 7000000
}, (error, result) => {console.log(error)});


============================ express-fileupload ========================================

app.post('/upload', function(req, res) {
  console.log(req.files.foo); // the uploaded file object
});

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


req.files.foo.name: "car.jpg"
req.files.foo.mv: A function to move the file elsewhere on your server. Can take a callback or return a promise.
req.files.foo.mimetype: The mimetype of your file
req.files.foo.data: A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true.
req.files.foo.tempFilePath: A path to the temporary file in case useTempFiles option was set to true.
req.files.foo.truncated: A boolean that represents if the file is over the size limit
req.files.foo.size: Uploaded size in bytes
req.files.foo.md5: MD5 checksum of the uploaded file
