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

exports.getLogs = async (user, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  let query = "";
  let countQuery = "";
  let values = [];
  let countValues = [];

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
      LIMIT ? OFFSET ?
    `;

    countQuery = `
      SELECT COUNT(*) as total
      FROM recommendation_logs
      JOIN users
      ON users.id = recommendation_logs.user_id
      WHERE users.role = 'mahasiswa'
    `;

    values = [limit, offset];
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
      LIMIT ? OFFSET ?
    `;

    countQuery = `
      SELECT COUNT(*) as total
      FROM recommendation_logs
      WHERE user_id = ?
    `;

    values = [user.id, limit, offset];
    countValues = [user.id];
  }

  const [rows] = await db.execute(query, values);
  const [count] = await db.execute(countQuery, countValues);

  return {
    logs: rows,
    total: count[0].total,
  };
};
