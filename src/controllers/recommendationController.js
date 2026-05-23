const ragService = require("../services/rag.service");
const logService = require("../services/log.service");

exports.recommendCourse = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }
    // const user_id = req.user.id;

    const result = await ragService.getRecommendation(query);

    await logService.saveLog(req.user.id, query, result);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
