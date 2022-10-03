import express from "express";
import { getHomePage, getDetailPage } from "../controller/homeController";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/about", (req, res) => {
    res.send(`I'm Eric!`);
  });
  router.get("/detail/user/:userId", getDetailPage);
  return app.use("/", router);
};

export default initWebRoute;
