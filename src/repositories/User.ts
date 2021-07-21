import { ParseOptions } from "querystring";
import { IUser } from "src/@types/IUser";
import { IUserRepository } from "src/@types/IUserRepository";
import { getConnection } from "typeorm";

export class UserRepository implements IUserRepository {
  async add(user: IUser) {
    const repository = getConnection().getRepository("User");
    const result = await repository.save(user);
    return result;
  }

  async list(param?: ParseOptions) {
    const repository = getConnection().getRepository("User");
    const result = await repository.find(param);
    return result;
  }
}
