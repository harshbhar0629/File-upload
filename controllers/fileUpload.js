/** @format */

const File = require("../models/file.js");
const cloudinary = require("cloudinary").v2;

// upload file to cloudinary
async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    console.log(file.tempFilePath)
    options.resource_type = "auto";
    // console.log(options)
    // tempFilePath k liye fileUpload m options set krne pdenge brna error ayega
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


// localFileUpload handler
exports.localFileUpload = async (req, res) => {
	try {
		// file fetch
		const file = req.files.file;
		// console.log(file);
		let path =
			__dirname + "/files/" + Date.now() + "." + file.name.split(".")[1];
		// console.log(path);
		file.mv(path, () => {
			console.log("file save succesfully");
		});

		res.json({
			success: true,
			message: "Local file uploaded successfully",
		});
	} catch (err) {
		console.log("Error in local file uploading");
	}
};

exports.imageUpload = async (req, res) => {
	try {
		// fetch data
		let { name, tags, email } = req.body;

		// retrieve files
        let file = req.files.image;
        // console.log(name);
        // console.log(tags);
        // console.log(email);
        // console.log(file);

		// check validation check file type it is supported or not [".jpeg", ".png", ".jgp"]...so on

		// upload file on cloudinary
		const response = await uploadVideoToCloudinary(file, "fileUpload");
		console.log(response);

		// save details in db
		const data = await File.create({
			name,
			tags,
			email,
			imageUrl: response.url,
        });
        
        console.log(data)

		res.status(200).json({
			success: true,
			message: "Image successfully upload to cloud",
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Error in uploading image on cloud",
		});
	}
};


exports.videoUpload = async (req, res) => {
	try {
		// fetch data
		let { name, tags, email } = req.body;

		// retrieve files
		let video = req.files.video;
		// console.log(name);
		// console.log(tags);
		// console.log(email);
		// console.log(video);

		// check validation check file type it is supported or not ["mp4", "mov"]

        // console.log("first")
		// upload video on cloudinary
		const response = await uploadFileToCloudinary(video, "fileUpload");
        // console.log("Second")
        // console.log(response);

		// save details in db
		const data = await File.create({
			name,
			tags,
			email,
			imageUrl: response.url,
		});

		// console.log(data);

		res.status(200).json({
			success: true,
			message: "Video successfully upload to cloud",
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: "Error in uploading video on cloud",
		});
	}
};

