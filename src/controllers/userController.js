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
