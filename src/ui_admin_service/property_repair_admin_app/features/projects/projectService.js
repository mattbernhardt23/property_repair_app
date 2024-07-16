import axios from "axios";
import data from "@content/project";

const API_URL = "http://127.0.0.1:8080/";
// const API_URL = process.env.DATABASE_URL;

const getProjects = () => {
  console.log(data);
  return data;
};

const getProject = (index) => {
  return data[index];
};

const addProject = async (data) => {
  console.log(data);
  const response = await axios.post(API_URL + "add", data);
  console.log(response.data);
  return response.data;
};

const projectService = {
  getProjects,
  getProject,
  addProject,
};

export default projectService;
