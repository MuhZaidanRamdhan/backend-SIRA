const db = require("../config/db");

exports.findUserByEmailOrUsername = async (loginInput) => {
  const [rows] = await db.execute(
    `SELECT * FROM users 
     WHERE email = ? OR username = ?`,
    [loginInput, loginInput],
  );

  return rows[0];
};

exports.createUser = async (name, username, email, password, role) => {
  await db.execute(
    `INSERT INTO users 
    (name, username, email, password, role) 
    VALUES (?, ?, ?, ?, ?)`,
    [name, username, email, password, role],
  );
};
