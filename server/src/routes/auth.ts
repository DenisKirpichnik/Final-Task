const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
import { auth } from "../middleware/auth";

import { register, login, confirmEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth";

// @route    POST /register
// @descr     I. Register a new user
// @access   Public
router.post(
  "/register",
  check("firstname", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  register
);

// @route    Post /confirmation
// @descr    II. confirm your email by following the email a user receives
// @access   Private
router.get("/confirmation/:uuid", confirmEmail);

// @route    Post /auth
// @descr    III. Login with email & password
// @access   Public
router.post(
  "/auth",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  login
);

// @route    Post /forgot-password
// @descr    IV. Reset your email by following the link in an email => frontend form
// @access   Private
router.post("/forgot-password", forgotPassword);

// @route    Post /reset-password
// @descr    V.  new password is saved in User
// @access   Private
router.post("/reset-password/:id/:token", resetPassword);

// @route    Post /reset-password
// @descr    VI.  new password is saved in User
// @access   Private
router.post("/check-auth/:token", auth, checkAuth);

module.exports = router;
