import express from "express";
import {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  editUser,
  updateUser,
} from "../controller/homeController";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/detail/user/:userId", getDetailPage);
  router.post("/create-new-user", createNewUser);
  router.post("/delete-user", deleteUser);
  router.get("/edit-user/:id", editUser);
  router.post("/update-user", updateUser);
  return app.use("/", router);
};

export default initWebRoute;
