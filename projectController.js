const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');

// @desc    Get user's projects
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.status(200).json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(project);
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, technologies, githubUrl, liveUrl } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Please add title and description');
  }

  const project = await Project.create({
    title,
    description,
    technologies,
    githubUrl,
    liveUrl,
    user: req.user.id,
  });

  res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await project.remove();
  res.status(200).json({ id: req.params.id });
});

// @desc    Upload project images
// @route   POST /api/projects/:id/images
// @access  Private
const uploadProjectImages = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const { images } = req.body;

  if (!images || !Array.isArray(images)) {
    res.status(400);
    throw new Error('Please provide images array');
  }

  project.images = [...project.images, ...images];
  const updatedProject = await project.save();

  res.status(200).json(updatedProject);
});

// @desc    Delete project image
// @route   DELETE /api/projects/:id/images/:imageId
// @access  Private
const deleteProjectImage = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  project.images = project.images.filter(
    (image) => image._id.toString() !== req.params.imageId
  );

  const updatedProject = await project.save();
  res.status(200).json(updatedProject);
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImages,
  deleteProjectImage,
}; 