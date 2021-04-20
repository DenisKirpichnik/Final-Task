const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
import { auth } from "../middleware/auth";

import { createClient, deleteClient, getClients, updateClient } from "../controllers/client";

// @route    Post /:orgId/clients
// @descr    I. creates a new client
// @access   Private
router.post("/:orgId/clients/create", createClient);

// @route    Get /:orgId/clients
// @descr    II. Gets all the clients of an organization
// @access   Private
router.get("/:orgId/clients/get", getClients);

// @route    Delete /clients/:clientId/delete
// @descr    III. deletes a  client
// @access   Private
router.delete("/clients/:clientId/delete", deleteClient);

// @route    Post /clients/:clientId/update
// @descr    IV. updates a client
// @access   Private
router.post("/clients/:clientId/update", updateClient);

module.exports = router;
