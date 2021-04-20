import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Organization } from "../entity/Organization";

export const addNewUserToDB = async (reqbody, encodedpassword, uuid) => {
  const addedUser = await getConnection() //to SErvices
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      firstname: reqbody.firstname,
      lastname: reqbody.lastname,
      email: reqbody.email,
      password: encodedpassword,
      confirmed: false,
      uuid: uuid,
    })
    .execute();
};

export const findUserbyEmail = async (reqbodyemail) => {
  const founduser = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.email = :email", { email: reqbodyemail })
    .getOne();
  return founduser;
};

export const findUserbyUUID = async (reqparamsuuid) => {
  const founduser = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.uuid = :uuid", { uuid: reqparamsuuid })
    .getOne();
  return founduser;
};

export const findUserbyId = async (reqbodyid) => {
  const founduser = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: reqbodyid })
    .getOne();
  return founduser;
};
