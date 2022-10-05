import express from "express";
import {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  editUser,
  updateUser,
  getUploadFilePage,
  handleUploadFile,
} from "../controller/homeController";
import multer from "multer";
import path from "path";
const appRoot = require("app-root-path");
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(appRoot);
    cb(null, appRoot + "/src/public/img/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
const initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/detail/user/:userId", getDetailPage);
  router.post("/create-new-user", createNewUser);
  router.post("/delete-user", deleteUser);
  router.get("/edit-user/:id", editUser);
  router.post("/update-user", updateUser);
  router.get("/upload", getUploadFilePage);
  router.post(
    "/uploadProfilePicture",
    upload.single("profile_pic"),
    handleUploadFile
  );
  return app.use("/", router);
};

export default initWebRoute;
