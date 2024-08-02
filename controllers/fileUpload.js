const File = require("../models/file.js");

// localFileUpload handler
exports.localFileUpload = async (req, res) => {
    try {
        // file fetch 
        const file = req.files.file;
        console.log(file)
        let path = __dirname + "/files/" + Date.now() + "." + file.name.split('.')[1];
        console.log(path)
        file.mv(path, () => {
            console.log("file save succesfully");
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully"
        });
        
    } catch (err) {
        console.log("Error in local file uploading");
    }
}