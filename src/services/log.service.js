const db = require("../config/db");

exports.saveLog = async (user_id, query, result) => {
  try {
    await db.execute(
      "INSERT INTO recommendation_logs (user_id, query, result) VALUES (?, ?, ?)",
      [user_id, query, JSON.stringify(result)],
    );
  } catch (error) {
    console.error("Log Save Error:", error.message);
  }
};

exports.getLogs = async (user) => {
  let query = "";
  let values = [];

  if (user.role === "admin") {
    query = `
      SELECT
        recommendation_logs.id,
        recommendation_logs.user_id,
        users.username,
        users.name,
        users.email,
        recommendation_logs.query,
        recommendation_logs.result,
        recommendation_logs.created_at
      FROM recommendation_logs
      JOIN users
      ON users.id = recommendation_logs.user_id
      WHERE users.role = 'mahasiswa'
      ORDER BY recommendation_logs.created_at DESC
    `;
  } else {
    query = `
      SELECT
        recommendation_logs.id,
        recommendation_logs.user_id,
        users.username,
        users.name,
        users.email,
        recommendation_logs.query,
        recommendation_logs.result,
        recommendation_logs.created_at
      FROM recommendation_logs
      JOIN users
      ON users.id = recommendation_logs.user_id
      WHERE recommendation_logs.user_id = ?
      ORDER BY recommendation_logs.created_at DESC
    `;

    values = [user.id];
  }

  const [rows] = await db.execute(query, values);

  return rows;
};
