const logService = require("../services/log.service");

exports.getLogs = async (req, res) => {
  try {
    const logs = await logService.getLogs(req.user);

    return res.status(200).json({
      success: true,
      total_data: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
