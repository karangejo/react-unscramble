const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const mongoose = require("mongoose");
var spawn = require("child_process").spawn;

const FileMongo = require("./models/file");

const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// connect to mongoDb
mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start app and serve files
// app.use(express.static('uploads'));

const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`App is listening on port ${port}.`));

//save file info to mongoDb
const savePathToMongo = async (path, res) => {
  const mongoFile = new FileMongo({
    date: new Date(),
    path: path,
  });
  try {
    const newMongoFile = await mongoFile.save();
    console.log(newMongoFile);
    return(newMongoFile);
  } catch (err) {
    console.log(err);
  }
};

app.post("/upload-files", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let data = [];

      //loop all files
      _.forEach(_.keysIn(req.files.uploadedFiles), (key) => {
        let file = req.files.uploadedFiles[key];

        //move file to uploads directory
        const filePath = "./images/" + file.name;
        file.mv(filePath);

        // resize and crop image
        const fileInfo = filePath.split("/").pop().split(".");
        const newFileName =
          "./convertedImages/" + fileInfo[0] + "600x600" + fileInfo[1];
        const args = [
          filePath,
          "-resize",
          '"600x600"',
          "-gravity",
          "center",
          "-extent",
          "600x600",
          newFileName,
        ];
        const convert = spawn("convert", args);
        console.log(convert);

        //save to mongoDb
        const mongoFile = savePathToMongo(filePath, res);

        //push file details
        data.push({
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
          mongoInfo: mongoFile,
        });
      });

      //return response
      res.send({
        status: true,
        message: "Files are uploaded",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/upload-file", async (req, res) => {
  console.log(req.files);
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "newPhoto") to retrieve the uploaded file
      let newFile = req.files.uploadedFile;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      const filePath = "./images/" + newFile.name;
      newFile.mv(filePath);

      savePathToMongo(filePath, res);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: newFile.name,
          mimetype: newFile.mimetype,
          size: newFile.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
