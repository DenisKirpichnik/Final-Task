const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
import { auth } from "../middleware/auth";

import { createProject, getProjects, deleteProject, updateProject } from "../controllers/project";

// @route    Post /:clientId/projects/create
// @descr    I. creates a new project
// @access   Private
router.post("/:clientId/projects/create", createProject);

// @route    Get /projects/create
// @descr    II. gets the projects of a client
// @access   Private
router.get("/:clientId/projects/get", getProjects);

// @route    Delete /projects/:projectId/delete
// @descr    III. deletes the project
// @access   Private
router.delete("/projects/:projectId/delete", deleteProject);

// @route    Post /projects/:projectId/update
// @descr    IV. updates the project
// @access   Private
router.post("/projects/:projectId/update", updateProject);

module.exports = router;
