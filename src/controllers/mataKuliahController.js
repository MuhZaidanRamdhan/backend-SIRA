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
