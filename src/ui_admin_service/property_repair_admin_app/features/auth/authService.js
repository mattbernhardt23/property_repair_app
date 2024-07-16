// Exists to make requests to our backend API
import axios from "axios";

// Endpoint for all Auth
const API_URL = "http://127.0.0.1:5000/admin";
// const API_URL = process.env.USER_URL;

//Register User
const register = async (userData) => {
  const request = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    password: userData.password,
    is_admin: 1,
    phone_number: userData.phone_number,
    street_address: userData.street_address,
    city: userData.city,
    state: userData.state,
    zip_code: userData.zip_code,
    email: userData.email,
    admin_access_code: userData.admin_access_code,
  };

  const response = await axios.post(API_URL + "register", request);

  return response.data;
};

const login = async (userData) => {
  console.log("user data", userData);
  const request = {
    email: userData.email,
    password: userData.password,
  };

  const response = await axios.post(API_URL + "/login", request);

  // After successful login
  const token = response.data.token; // Assuming the token is in the response
  sessionStorage.setItem("user", token);

  console.log(response.data);
  return response.data;
};

const getUser = async () => {
  console.log(API_URL);
  try {
    const response = await axios.post(
      API_URL + "/me",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in getUser", error);
    throw error;
  }
};

const getActiveUsers = async () => {
  const response = await axios.get(API_URL + "/users");

  return response.data;
};

const logout = async () => {
  // Remove the "user" item from sessionStorage
  sessionStorage.removeItem("user");

  return;
};

const authService = {
  register,
  logout,
  login,
  getUser,
  getActiveUsers,
};

export default authService;
