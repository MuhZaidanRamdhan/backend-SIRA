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
    ORDER BY created_at ASC
  `);

  return rows;
};

exports.getAllUsersWithPagination = async (
  search = "",
  page = 1,
  limit = 10
) => {
  const offset = (page - 1) * limit;

  let whereClause = "";
  let values = [];

  if (search) {
    whereClause = `
      WHERE
        name LIKE ?
        OR email LIKE ?
        OR username LIKE ?
    `;

    values.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    );
  }

  const [users] = await db.execute(
    `
      SELECT
        id,
        username,
        name,
        email,
        role,
        created_at
      FROM users
      ${whereClause}
      ORDER BY created_at ASC
      LIMIT ? OFFSET ?
    `,
    [...values, limit, offset]
  );

  const [count] = await db.execute(
    `
      SELECT COUNT(*) as total
      FROM users
      ${whereClause}
    `,
    values
  );

  return {
    users,
    total: count[0].total,
  };
};