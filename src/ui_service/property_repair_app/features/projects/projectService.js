import axios from "axios";
import data from "@content/project";

const API_URL = "http://127.0.0.1:8080";
// const API_URL = process.env.DATABASE_URL;

// const getProjects = () => {
//   console.log(data);
//   return data;
// };

const getProjects = async (id) => {
  const request = {
    tech_id: id,
  };

  const response = await axios.post(API_URL + "/user_projects", request);

  return response.data;
};

const getProject = (index) => {
  return data[index];
};

const projectService = {
  getProjects,
  getProject,
};

export default projectService;
