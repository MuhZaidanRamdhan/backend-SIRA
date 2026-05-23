const axios = require("axios");

const RAG_API_URL = "http://127.0.0.1:8000/recommend";

exports.getRecommendation = async (query) => {
  try {
    const response = await axios.post(
      RAG_API_URL,
      { query },
      {
        timeout: 180000,
      },
    );

    return response.data;
  } catch (error) {
    console.error("RAG Service Error:", error.message);
    throw new Error("Failed to connect to RAG service");
  }
};