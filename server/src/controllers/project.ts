const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
import { addNewUserToDB, findUserbyEmail, findUserbyUUID, findUserbyId } from "../services/auth";

import { createNewProject, getProjectsByClientId, deleteProjectById, updateProjectById } from "../services/project";
//TypeORM
import { getConnection, getRepository } from "typeorm";
import { Client } from "../entity/Client";
import { Project } from "../entity/Project";
import { Organization } from "../entity/Organization";
import { Request, Response } from "express";
import { Users_organization } from "../entity/Users_organization";

// creates a new client
export const createProject = async (req, res) => {
  try {
    await createNewProject(req.body, req.params);
    res.status(200).send({ msg: "successfully created a new project" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const client = await getProjectsByClientId(req.params);
    res.status(200).send(client.projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await deleteProjectById(req.params);

    res.status(200).send({ msg: "the project was deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    await updateProjectById(req.body, req.params);

    res.status(200).send({ msg: "the project was updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};
