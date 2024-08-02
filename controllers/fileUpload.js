const File = require("../models/file.js");

// localFileUpload handler
exports.localFileUpload = async (req, res) => {
    try {
        // file fetch 
        const file = req.files.file;
        const path = __dirname + "/files/" + Date.now();
        
    } catch (err) {
        console.log("Error in local file uploading");
    }
}