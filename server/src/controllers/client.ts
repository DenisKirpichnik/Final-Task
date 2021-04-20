const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
import { addNewUserToDB, findUserbyEmail, findUserbyUUID, findUserbyId } from "../services/auth";
//import { addNewOrganization } from "../services/profile";
import { createNewClient, getClientsForOrg, deleteClientById, updateClientById } from "../services/client";

//TypeORM
import { getConnection, getRepository, getManager } from "typeorm";
import { Client } from "../entity/Client";
import { Organization } from "../entity/Organization";
import { Request, Response } from "express";
import { Users_organization } from "../entity/Users_organization";

// creates a new client
export const createClient = async (req, res) => {
  try {
    await createNewClient(req.body, req.params);

    res.status(200).send({ msg: "successfully created a new client" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};

export const getClients = async (req, res) => {
  console.log(req.params.orgId);
  try {
    const clients = await getClientsForOrg(req.params);

    res.status(200).send(clients); //.clients
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};
//work on this
export const deleteClient = async (req, res) => {
  try {
    const deleteClient = await deleteClientById(req.params);

    res.status(200).send({ msg: "successfully deleted client" }); //
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    await updateClientById(req.body, req.params);
    res.status(200).send({ msg: "all good" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "server error" });
  }
};
