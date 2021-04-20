const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
import { addNewUserToDB, findUserbyEmail, findUserbyUUID, findUserbyId } from "../services/auth";
import {
  createNewOrganization,
  findOrg,
  writeUserAndOrgInTable,
  deleteOrg,
  updateOrg,
  getOrgsForUser,
} from "../services/profile";

//TypeORM
import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Organization } from "../entity/Organization";
import { Request, Response } from "express";
import { Users_organization } from "../entity/Users_organization";

/// it's just for testing
export const getUsers = async (req, res) => {
  const users = await getRepository(User).find();
  return res.json(users);
};

// creates a new organization and connects it to the user in the intermediate table
export const createOrganization = async (req, res) => {
  try {
    const addedOrganization = await createNewOrganization(req.body, req.params);
    res.status(200).send({ msg: "successfully created an organization" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error, can't get a user" });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const orgs = await getOrgsForUser(req.params);
    res.status(200).send(orgs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
};

//deletes an account using accountId from re.params
export const deleteOrganization = async (req, res) => {
  try {
    const deleted = await deleteOrg(req.params);
    res.status(200).send({ msg: "the org was deleted" }); //{ msg: "the org was deleted" }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error,something is wrong" });
  }
};

//updating an account using accountId from re.params
export const updateOrganization = async (req, res) => {
  try {
    const updateOrgan = await updateOrg(req.params, req.body);
    res.status(200).send({ msg: "the org was updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error,something is wrong" });
  }
};

export const test = async (req, res) => {
  try {
    //await getRepository(Organizations_clients)

    res.status(200).send({ msg: "the org was updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error,something is wrong" });
  }
};
