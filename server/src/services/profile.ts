import { getConnection, getRepository, getManager } from "typeorm";
import { User } from "../entity/User";
import { Organization } from "../entity/Organization";
import { Client } from "../entity/Client";
import { Users_organization } from "../entity/Users_organization";
import { Organizations_clients } from "../entity/Organizations_clients";

// CREATE ORG
export const createNewOrganization = async (reqbody: any, reqparams: any) => {
  const newOrg = new Organization();
  newOrg.title = reqbody.title;
  newOrg.logo = reqbody.logo;
  newOrg.details = reqbody.details;
  await getRepository(Organization).save(newOrg);

  const addToTheIntermediateTable = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Users_organization)
    .values({ userId: reqparams.accountId, organizationId: newOrg.id })
    .execute();
};

// export const addNewOrganization = async (reqbody: any) => {
//   await getConnection()
//     .createQueryBuilder()
//     .insert()
//     .into(Organization)
//     .values({ title: reqbody.title, logo: reqbody.logo, details: reqbody.details })
//     .execute();
// };

export const findOrg = async (reqbody) => {
  const foundOrg = await getConnection()
    .createQueryBuilder()
    .select("organization")
    .from(Organization, "organization")
    .where("organization.title = :title", { title: reqbody.title })
    .getOne();
  return foundOrg;
};

export const writeUserAndOrgInTable = async (reqparams, foundOrgId) => {
  const addedtable = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Users_organization)
    .values({ userId: reqparams.accountId, organizationId: foundOrgId })
    .execute();
};
// GET ORGS

export const getOrgsForUser = async (reqparams) => {
  const query = getRepository(Users_organization)
    .createQueryBuilder("users_org")
    .leftJoinAndSelect("users_org.organization", "org")
    .where("users_org.userId = :userId", { userId: reqparams.accountId });

  // console.log("organizations query:", query.getSql());

  const organizations = await query.getMany();
  console.log(organizations);
  return organizations;
};

export const deleteOrg = async (reqparams) => {
  let arrDelete = []; //6
  // Finds the clients of soon-to-be-deleted organization
  const clientsIdsOfOrgBeforeDeletion = await getRepository(Organizations_clients)
    .createQueryBuilder("orgs_clients")
    .select("orgs_clients.clientId")
    .where("orgs_clients.organizationId = :organizationId", { organizationId: reqparams.orgId })
    .getRawMany();

  const Ids = clientsIdsOfOrgBeforeDeletion.map((el: any) => el.orgs_clients_clientId); //[3,6]
  // Deletes the organization
  const deleteOrganization = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Organization)
    .where("id = :id", { id: reqparams.orgId })
    .execute();
  // Checks if the clients after deletion have some relations left
  const foundClientsAfterDelete = await getRepository(Organizations_clients)
    .createQueryBuilder("orgs_clients")
    .select("orgs_clients")
    .where("orgs_clients.clientId IN (:...ids)", { ids: Ids }) //{ ids: [ 3, 6]}
    .getMany();
  const IdsToKeep = foundClientsAfterDelete.map((el: any) => el.clientId); //3

  const PickIdsToDelete = Ids.forEach((el) => {
    if (!IdsToKeep.includes(el)) {
      arrDelete.push(el);
    }
  });

  //Delete orphaned clients, clients with no relations will be deleted
  const deleteClients = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Client)
    .where("id  IN (:...ids)", { ids: arrDelete })
    .execute();
};

export const updateOrg = async (reqparams, reqbody) => {
  const updateOrg = await getConnection()
    .createQueryBuilder()
    .select("organization")
    .from(Organization, "organization")
    .where("id = :id", { id: reqparams.orgId })
    .getOne();

  updateOrg.title = reqbody.title;
  updateOrg.logo = reqbody.logo;
  updateOrg.details = reqbody.details;

  await getRepository(Organization).save(updateOrg);
};
