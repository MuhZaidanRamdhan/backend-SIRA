const db = require("../config/db");

exports.getAllUsers = async () => {
  const [rows] = await db.execute(`
    SELECT 
      id,
      name,
      username,
      email,
      role,
      created_at
    FROM users
    ORDER BY created_at DESC
  `);

  return rows;
};