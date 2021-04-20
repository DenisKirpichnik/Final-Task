import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Organization } from "../entity/Organization";
import { Client } from "../entity/Client";
import { Project } from "../entity/Project";
import { query } from "express-validator";
import { Organizations_clients } from "../entity/Organizations_clients";
// CREATE ORG
export const createNewClient = async (reqbody: any, reqparams: any) => {
  const client = new Client();
  client.title = reqbody.title;
  client.email = reqbody.email;
  client.details = reqbody.details;
  await getConnection().manager.save(client);

  const foundOrg = await getConnection()
    .createQueryBuilder()
    .select("organization")
    .from(Organization, "organization")
    .where("id = :id", { id: reqparams.orgId })
    .getOne();

  const newIntermediateRecord = await getConnection() //to SErvices
    .createQueryBuilder()
    .insert()
    .into(Organizations_clients)
    .values({ clientId: client.id, organizationId: foundOrg.id })
    .execute();

  //client.organizations = [foundOrg];
};

export const getClientsForOrg = async (reqparams) => {
  //console.log("checking the reqparams", reqparams.orgId);
  const query = getRepository(Organizations_clients)
    .createQueryBuilder("orgs_clients")
    .leftJoinAndSelect("orgs_clients.client", "cli")
    .where("orgs_clients.organizationId = :organizationId", { organizationId: reqparams.orgId }); //reqparams.ordId

  const clients = await query.getMany();

  return clients;

  /*/////////////////// old
const query = getConnection()
    .getRepository(Organization)
    .createQueryBuilder("organization")
    .leftJoinAndSelect("organization.clients", "client")
    .where("organization.id = :orgId", { orgId });
  const org = await query.getOne();
  return org;
  //////////////////////////
  
  */
};

export const deleteClientById = async (reqparams: any) => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Client, "client")
    .where("id = :id", { id: reqparams.clientId })
    .execute();
};

export const updateClientById = async (reqbody: any, reqparams: any) => {
  await getConnection()
    .createQueryBuilder()
    .update(Client)
    .set({ title: reqbody.title, email: reqbody.email, details: reqbody.details })
    .where("id = :id", { id: reqparams.clientId })
    .execute();
};
