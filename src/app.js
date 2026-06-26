require("dotenv").config();
const express = require("express");
const cors = require("cors");

const recommendationRoutes = require("./routes/recommendation");
const uploadRoutes = require("./routes/uploadSilabus");

const authRoutes = require("./routes/auth");
const embeddingRoutes = require("./routes/embedding");

const mataKuliahRoutes = require("./routes/matkul");

const logRoutes = require("./routes/log");

const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", recommendationRoutes);

app.use("/api", uploadRoutes);

app.use("/api", embeddingRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/courses", mataKuliahRoutes);

app.use("/api", logRoutes);

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Express running on http://localhost:${PORT}`);
});
