const fs = require("fs");
const csv = require("csv-parser");
const mataKuliahService = require("../services/silabus.service");
const embeddingService = require("../services/embedding.service");

exports.uploadSilabus = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File wajib diupload",
      });
    }

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        try {
          await mataKuliahService.clearMataKuliah();

          for (const item of results) {
            await mataKuliahService.saveMataKuliah(
              item.kode_mk,
              item.nama_mk,
              item.peminatan,
              item.sks,
              item.semester,
              item.deskripsi,
            );
          }

          await embeddingService.markNeedSync();

          fs.unlinkSync(req.file.path);

          return res.status(200).json({
            success: true,
            message: "Upload silabus berhasil",
            total_data: results.length,
          });
        } catch (error) {
          console.error(error.message);

          return res.status(500).json({
            success: false,
            message: "Gagal menyimpan data ke database",
          });
        }
      });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Upload gagal",
    });
  }
};
