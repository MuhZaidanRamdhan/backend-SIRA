const db = require("../config/db");

exports.getAllMataKuliahBySemester = async () => {
  const [rows] = await db.execute(`
    SELECT * 
    FROM courses
    ORDER BY semester ASC
  `);

  return rows;
};

exports.getAllCourses = async (search = "", page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  let whereClause = "";
  let values = [];

  if (search) {
    whereClause = `
      WHERE
        kode_mk LIKE ?
        OR nama_mk LIKE ?
        OR peminatan LIKE ?
    `;

    values.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const [courses] = await db.execute(
    `
    SELECT
      id,
      kode_mk,
      nama_mk,
      peminatan,
      sks,
      semester,
      deskripsi
    FROM courses
    ${whereClause}
    ORDER BY semester ASC, nama_mk ASC
    LIMIT ? OFFSET ?
    `,
    [...values, limit, offset],
  );

  const [count] = await db.execute(
    `
    SELECT COUNT(*) as total
    FROM courses
    ${whereClause}
    `,
    values,
  );

  return {
    courses,
    total: count[0].total,
  };
};

exports.getCourseById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM courses
    WHERE id = ?
    `,
    [id],
  );

  return rows[0];
};

exports.createCourse = async (
  kode_mk,
  nama_mk,
  peminatan,
  sks,
  semester,
  deskripsi,
) => {
  await db.execute(
    `
    INSERT INTO courses
    (
      kode_mk,
      nama_mk,
      peminatan,
      sks,
      semester,
      deskripsi
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [kode_mk, nama_mk, peminatan, sks, semester, deskripsi],
  );
};

exports.updateCourse = async (
  id,
  kode_mk,
  nama_mk,
  peminatan,
  sks,
  semester,
  deskripsi,
) => {
  await db.execute(
    `
    UPDATE courses
    SET
      kode_mk=?,
      nama_mk=?,
      peminatan=?,
      sks=?,
      semester=?,
      deskripsi=?
    WHERE id=?
    `,
    [kode_mk, nama_mk, peminatan, sks, semester, deskripsi, id],
  );
};

exports.deleteCourse = async (id) => {
  await db.execute(
    `
    DELETE FROM courses
    WHERE id=?
    `,
    [id],
  );
};
