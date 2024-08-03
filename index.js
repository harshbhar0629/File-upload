/** @format */

const express = require("express");
const app = express();

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware for file upload
const fileUpload = require("express-fileupload");
app.use(fileUpload({
	useTempFiles: true,
}));

// connect db and cloudinary
require("./config/database.js").dbConnect();
require("./config/cloudinary.js").cloudinaryConnect();

// routes
const Upload = require("./routes/FileUpload.js");
app.use("/api/v1/upload", Upload);

// server created
require("dotenv").config();
app.listen(process.env.PORT, () => {
	console.log("Server started at port 3000");
});
