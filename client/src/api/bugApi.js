import axios from "axios";

const BASE_URL = "http://localhost:5000/api/bugs";

export const createBug = async (bugData, token) => {
  try {
    const response = await axios.post(BASE_URL, bugData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling createBug API: ", error);
  }
};

export const getBugs = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling getBugs API: ", error);
  }
};

export const getBugById = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling getBugById API: ", error);
  }
};

export const updateBug = async (id, updatedData, token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling updateBug API: ", error);
  }
};

export const deleteBug = async (id, token) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("Bug deleted successfully!");
  } catch (error) {
    console.log("Error while calling deleteBug API: ", error);
  }
};

export const commentOnBug = async (id, commentText, token) => {
  try {
    // console.log("Sending Comment Text:", commentText);

    const response = await axios.post(
      `${BASE_URL}/${id}/comments`,
      { commentText }, // Use the correct field name.
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error while calling commentOnBug API: ",
      error.response?.data || error.message
    );
  }
};
