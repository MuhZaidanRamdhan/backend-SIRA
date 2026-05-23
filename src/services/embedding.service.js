const db = require("../config/db");

exports.markNeedSync = async () => {
  await db.execute(`
    UPDATE embedding_status
    SET status = 'perlu_sinkronisasi'
    WHERE id = 1
  `);
};

exports.updateEmbeddingStatus = async () => {
  await db.execute(`
    UPDATE embedding_status
    SET 
      status = 'aktif',
      last_sync = CURRENT_TIMESTAMP
    WHERE id = 1
  `);
};

exports.getEmbeddingStatus = async () => {
  const [rows] = await db.execute(`
    SELECT status, last_sync
    FROM embedding_status
    WHERE id = 1
  `);

  return rows[0];
};
