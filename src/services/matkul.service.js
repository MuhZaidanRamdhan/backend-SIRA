const db = require("../config/db");

exports.getAllMataKuliahBySemester = async () => {
  const [rows] = await db.execute(`
    SELECT * 
    FROM mata_kuliah
    ORDER BY semester ASC
  `);

  return rows;
};