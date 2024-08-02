const mongoose = require("mongoose");
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
        type: String  
    }
});

module.exports = mongoose.model("file", fileSchema);