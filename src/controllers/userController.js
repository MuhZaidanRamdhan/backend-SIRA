const userService = require("../services/user.service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      total_data: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllUsersWithPagination = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { users, total } = await userService.getAllUsersWithPagination(search, page, limit);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      data: users,
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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data user",
    });
  }
};
