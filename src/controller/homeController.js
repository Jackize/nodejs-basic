import connection from "../configs/connectDB";

export let getHomePage = async (req, res) => {
  const [rows, fields] = await connection.execute("SELECT * FROM users");
  return res.render("./index.ejs", { dataUser: rows });
};

export let getDetailPage = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await connection.execute(`SELECT * FROM users WHERE id = ?`, [
    userId,
  ]);
  console.log(user);
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
