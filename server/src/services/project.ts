import { getConnection, getRepository } from "typeorm";
import { Project } from "../entity/Project";
import { Client } from "../entity/Client";
import { User } from "../entity/User";
import { Organization } from "../entity/Organization";

export const createNewProject = async (reqbody, reqparams) => {
  const foundClient = await getConnection()
    .createQueryBuilder()
    .select("client")
    .from(Client, "client")
    .where("id = :id", { id: reqparams.clientId })
    .getOne();

  const newProject = new Project();
  newProject.title = reqbody.title;
  newProject.description = reqbody.description;
  newProject.type = reqbody.type;
  newProject.client = foundClient;

  await getRepository(Project).save(newProject);
  //await getRepository(Client).save(foundClient);
};

export const getProjectsByClientId = async ({ clientId }: any) => {
  const client = getConnection()
    .getRepository(Client)
    .createQueryBuilder("client")
    .leftJoinAndSelect("client.projects", "project")
    .where("client.id = :clientId", { clientId })
    .getOne();
  // const clients = await getConnection()
  //   .getRepository(Client)
  //   .createQueryBuilder("client")
  //   .leftJoinAndSelect("client.projects", "project")
  //   .getMany();

  // const client = clients.find((client) => client.id == reqparams.clientId);
  return client;
};

export const deleteProjectById = async (reqparams) => {
  const deleteProject = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Project)
    .where("id = :id", { id: reqparams.projectId })
    .execute();
};

export const updateProjectById = async (reqbody, reqparams) => {
  const foundProject = await getConnection()
    .createQueryBuilder()
    .select("project")
    .from(Project, "project")
    .where("id = :id", { id: reqparams.projectId })
    .getOne();

  foundProject.title = reqbody.title;
  foundProject.description = reqbody.logo;
  foundProject.type = reqbody.type;

  await getRepository(Project).save(foundProject);
};
