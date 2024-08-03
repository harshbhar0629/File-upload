/** @format */

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Schema = mongoose.Schema;

const fileSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	tags: {
		type: String,
	},
	imageUrl: {
		type: String,
	},
});

// post middleware
fileSchema.post("save", async (doc) => {
	try {
		console.log(doc);

		// transporter create

		let transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		// send mail
		let info = await transporter.sendMail({
			from: `Harsh Bhardwaj`,
			to: doc.email,
			subject: "New file uploaded on cloudinary",
			html: `<h4>Your File Uploaded Successfully on Cloudinary: ${doc.imageUrl}</h4>`,
		})


		console.log(info);
	} catch (err) {
		console.log("Error in sending mail");
	}
});

module.exports = mongoose.model("file", fileSchema);
