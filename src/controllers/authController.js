const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    const existingUser = await authService.findUserByEmailOrUsername(email);

    // if (existingUser) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email atau username sudah digunakan",
    //   });
    // }

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email tidak valid",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 6 karakter",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await authService.createUser(
      name,
      username,
      email,
      hashedPassword,
      role || "mahasiswa",
    );

    return res.status(201).json({
      success: true,
      message: "Register berhasil",
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === "ER_DUP_ENTRY") {
      if (error.message.includes("email")) {
        return res.status(400).json({
          success: false,
          message: "Email sudah digunakan",
        });
      }

      if (error.message.includes("username")) {
        return res.status(400).json({
          success: false,
          message: "Username sudah digunakan",
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    console.log(req.body);

    const user = await authService.findUserByEmailOrUsername(login);

    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email/Username atau password salah, silakan coba lagi.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email/Username atau password salah, silakan coba lagi.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout berhasil",
  });
};
