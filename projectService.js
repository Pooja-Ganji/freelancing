import axios from 'axios';
import authService from '../auth/authService';

const API_URL = 'http://localhost:5000/api/projects/';

// Get user projects
const getProjects = async () => {
  const response = await axios.get(API_URL, authService.createAuthHeader());
  return response.data;
};

// Create new project
const createProject = async (projectData) => {
  const response = await axios.post(API_URL, projectData, authService.createAuthHeader());
  return response.data;
};

// Delete project
const deleteProject = async (projectId) => {
  const response = await axios.delete(API_URL + projectId, authService.createAuthHeader());
  return response.data;
};

const projectService = {
  getProjects,
  createProject,
  deleteProject,
};

export default projectService; 