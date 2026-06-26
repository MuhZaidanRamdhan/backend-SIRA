const logService = require("../services/log.service");

exports.getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const { logs, total } = await logService.getLogs(req.user, page, limit);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        current_page: page,
        per_page: limit,
        total_data: total,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1,
      },
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data log",
    });
  }
};
