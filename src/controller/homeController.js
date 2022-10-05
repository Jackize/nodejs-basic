import connection from "../configs/connectDB";
import multer from "multer";

export let getHomePage = async (req, res) => {
  const [rows, fields] = await connection.execute("SELECT * FROM users");
  return res.render("./index.ejs", { dataUser: rows });
};

export let getDetailPage = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await connection.execute(`SELECT * FROM users WHERE id = ?`, [
    userId,
  ]);
  return res.send(JSON.stringify(user));
};

export let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await connection.execute(
    `INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

export let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await connection.execute(`Delete from users where id = ?`, [userId]);
  return res.redirect("/");
};

export let editUser = async (req, res) => {
  let userId = req.params.id;
  let [user] = await connection.execute("Select * from users where id = ?", [
    userId,
  ]);
  return res.render("update.ejs", { dataUser: user[0] });
};

export let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await connection.execute(
    "update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

export let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

const upload = multer().single("profile_pic");
export let handleUploadFile = async (req, res) => {
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};
