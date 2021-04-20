const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//TypeORM
import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response } from "express";
import { nextTick, send } from "process";
import { userInfo } from "os";
import { addNewUserToDB, findUserbyEmail, findUserbyUUID, findUserbyId } from "../services/auth";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "deniskirpichnik@gmail.com",
    pass: "Ololo32167911",
  },
});

const JWT_SECRET = "mysupersecret";

// I. Registration handler
export const register = async (req: Request, res: Response) => {
  // Validating email & name & password
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Checking if a user already exists in the DB // MOVE DB LOGIC ,THIS CODE TO SERVICE 54-59
    const checkUser = await findUserbyEmail(req.body.email);
    console.log(checkUser);
    if (checkUser) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const postedPassword = req.body.password;
    const encodedPassword = await bcrypt.hash(postedPassword, salt);
    const uuid = uuidv4();
    // if it's a new user => add the user to the DB,
    const addedUser = await addNewUserToDB(req.body, encodedPassword, uuid);
    // async email - sends a letter to confirm the account to the USER email
    const url = `http://localhost:5000/confirmation/${uuid}`;
    transporter.sendMail({
      to: `${req.body.email}`,
      subject: "Confirm Email",
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });
    return res.status(200).send({ msg: "all good" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};

// II. Confirm Email - updates User => confirmed
export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const confirmedUser = await findUserbyUUID(req.params.uuid);
    if (!confirmedUser) {
      res.status(500).send({ msg: "User doesn't exist, sorry" });
    }
    //console.log(confirmedUser);
    confirmedUser.confirmed = true;
    confirmedUser.uuid = "";
    await getRepository(User).save(confirmedUser);
    res.status(200).send("You've successfully confirmed your account. You may log in now.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// III. Log in & Authentication
export const login = async (req: Request, res: Response) => {
  // Validating email & password
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let loginUser = await findUserbyEmail(req.body.email);
    if (!loginUser) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    // Comparing the password with bcrypt
    const isMatch = await bcrypt.compare(req.body.password, loginUser.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    // Checking if the email is confirmed
    if (!loginUser.confirmed) {
      return res.status(400).json({ errors: [{ msg: "Please confirm your email to login" }] });
    }
    // jswebtoken
    const id = loginUser.id;
    const payload = {
      user: { id: loginUser.id },
    };
    console.log(payload);
    jwt.sign(
      payload,
      "mysecrettoken", // move to ENV varaible !!!! important
      { expiresIn: 60 * 60 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, id });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errors: [{ msg: "server error" }] });
  }
};

// IV. Forgot password , user put in his email => receives an email with a link
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const checkUser = await findUserbyEmail(req.body.email);
    //checking if the user exists in the DB
    if (!checkUser) {
      return res.status(400).json({ errors: [{ msg: "User doesnt exist " }] });
    }
    const payload = {
      email: checkUser.email,
      id: checkUser.id,
    };
    const secret = JWT_SECRET + checkUser.email;
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });
    console.log("token1", token);
    const url = `http://localhost:3000/reset-password/${checkUser.id}/${token}`;
    transporter.sendMail({
      to: `${req.body.email}`,
      subject: "Reset your password",
      html: `Please fill in this form to reset your password: <a href="${url}">${url}</a>`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// V  gets new password and token from frontend changes the password
export const resetPassword = async (req: Request, res: Response, next) => {
  const { id, token } = req.params;
  const { password1, password2 } = req.body;
  const existingUser = await findUserbyId(id);
  if (!existingUser) {
    res.status(400).send("oops,invalid id");
  }
  if (password1 !== password2) {
    res.status(400).send("Passwords don't match");
  }
  const secret = JWT_SECRET + existingUser.email;
  try {
    const payload = jwt.verify(token, secret);
    //bcrypt
    const salt = await bcrypt.genSalt(10);
    const postedPassword = password1;
    const encodedPassword = await bcrypt.hash(postedPassword, salt);
    existingUser.password = `${encodedPassword}`;
    await getRepository(User).save(existingUser);
    res.status(200).send({ msg: "reset the password success" });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send({ msg: "server error" });
  }
};

export const checkAuth = async (req: Request, res: Response, next) => {
  const { user } = req;
  try {
    res.status(200).send(user);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send({ msg: "server error" });
  }
};
