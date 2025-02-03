import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const login = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling login API: ", error);
  }
};

export const signup = async (signupData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, signupData);
    return response.data;
  } catch (error) {
    console.log("Error while calling signup API: ", error);
  }
};
