const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const auth = require("../middleware/auth");
import { auth } from "../middleware/auth";
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

import {
  createOrganization,
  getOrganizations,
  deleteOrganization,
  updateOrganization,
  test,
} from "../controllers/profile";

// @route    Post /user/organizations
// @descr    II. create a new organization
// @access   Private

router.post("/:accountId/organizations", auth, createOrganization);

// @route    Get /:accountId/organizations
// @descr    III. create a new organization
// @access   Private

router.get("/:accountId/organizations", auth, getOrganizations);

// @route    Delete /:orgId/organizations/delete
// @descr    IV. deletes an organization
// @access   Private
router.delete("/:orgId/organizations/delete", deleteOrganization);

// @route    Post /:orgId/organizations/update
// @descr    IV. updates an organization
// @access   Private
router.post("/:orgId/organizations/update", auth, updateOrganization);

// @route    Post /:orgId/organizations/update
// @descr    IV. updates an organization
// @access   Private
router.post("/:orgId/test", test);

module.exports = router;
