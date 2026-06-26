const embeddingService = require("../services/embedding.service");
const mataKuliahService = require("../services/matkul.service");

exports.getRoadmap = async (req, res) => {
  try {
    const courses = await mataKuliahService.getAllMataKuliahBySemester();

    const groupedSemester = {};

    courses.forEach((course) => {
      const semester = course.semester;

      if (!groupedSemester[semester]) {
        groupedSemester[semester] = [];
      }

      groupedSemester[semester].push({
        kode_mk: course.kode_mk,
        nama_mk: course.nama_mk,
        sks: course.sks,
        peminatan: course.peminatan,
        deskripsi: course.deskripsi,
      });
    });

    const roadmap = Object.keys(groupedSemester).map((semester) => ({
      semester: Number(semester),
      courses: groupedSemester[semester],
    }));

    return res.status(200).json({
      success: true,
      total_semester: roadmap.length,
      data: roadmap,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { courses, total } = await mataKuliahService.getAllCourses(
      search,
      page,
      limit,
    );

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      data: courses,
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
      message: "Gagal mengambil data mata kuliah",
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await mataKuliahService.getCourseById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Mata kuliah tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data",
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { kode_mk, nama_mk, peminatan, sks, semester, deskripsi } = req.body;

    await mataKuliahService.createCourse(
      kode_mk,
      nama_mk,
      peminatan,
      sks,
      semester,
      deskripsi,
    );

    await embeddingService.markNeedSync();

    return res.status(201).json({
      success: true,
      message: "Mata kuliah berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error); // <--- penting

    return res.status(500).json({
      success: false,
      message: error.message, // sementara untuk debug
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const { kode_mk, nama_mk, peminatan, sks, semester, deskripsi } = req.body;

    await mataKuliahService.updateCourse(
      id,
      kode_mk,
      nama_mk,
      peminatan,
      sks,
      semester,
      deskripsi,
    );

    await embeddingService.markNeedSync();

    return res.status(200).json({
      success: true,
      message: "Mata kuliah berhasil diubah. Silakan sinkronisasi embedding.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengubah mata kuliah",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    await mataKuliahService.deleteCourse(id);

    await embeddingService.markNeedSync();

    return res.status(200).json({
      success: true,
      message: "Mata kuliah berhasil dihapus. Silakan sinkronisasi embedding.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal menghapus mata kuliah",
    });
  }
};
