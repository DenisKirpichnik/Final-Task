//Express stuff
const express = require("express");
import { Request, Response } from "express";
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const clientRoutes = require("./routes/client");
const projectRoutes = require("./routes/project");
const cors = require("cors");
const jwt = require("jwt-simple");
//TypeORM stuff
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(express.json({ extended: false }));

    // Routing
    app.use(authRoutes);
    app.use(profileRoutes);
    app.use(clientRoutes);
    app.use(projectRoutes);

    // start express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.log(error));
