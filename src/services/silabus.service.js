const db = require("../config/db");

exports.clearMataKuliah = async () => {
  await db.execute("TRUNCATE TABLE courses");
};

exports.saveMataKuliah = async (
  kode_mk,
  nama_mk,
  peminatan,
  sks,
  semester,
  deskripsi,
) => {
  await db.execute(
    `INSERT INTO courses 
    (kode_mk, nama_mk, peminatan, sks, semester, deskripsi)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [kode_mk, nama_mk, peminatan, sks, semester, deskripsi],
  );
};

exports.getAllMataKuliah = async () => {
  const [rows] = await db.execute("SELECT * FROM courses");

  return rows;
};