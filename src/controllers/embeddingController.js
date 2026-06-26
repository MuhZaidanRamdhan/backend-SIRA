const axios = require("axios");
const mataKuliahService = require("../services/silabus.service");
const embeddingService = require("../services/embedding.service");

exports.syncEmbedding = async (req, res) => {
  try {
    const courses = await mataKuliahService.getAllMataKuliah();

    if (!courses.length) {
      return res.status(404).json({
        success: false,
        message: "Data mata kuliah kosong",
      });
    }

    const response = await axios.post("http://127.0.0.1:8000/sync-embedding", {
      courses,
    });

    await embeddingService.updateEmbeddingStatus();

    return res.status(200).json({
      success: true,
      message: "Sinkronisasi embedding berhasil"
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Sinkronisasi embedding gagal",
    });
  }
};

exports.getEmbeddingStatus = async (req, res) => {
  try {
    const status = await embeddingService.getEmbeddingStatus();

    return res.status(200).json(status);
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil status embedding",
    });
  }
};
