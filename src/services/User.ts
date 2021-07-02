import { UserRepository } from "@repositories/User";
import { ParseOptions } from "querystring";
import { IUser } from "src/@types/UserInterface";
import { IRepository } from "src/@types/UserRepositoryInterface";

export class UserService implements IRepository {
  private repository: IRepository = new UserRepository();

  public async add(user: IUser) {
    const result = this.repository.add(user);
    return result;
  }

  public async list(param?: ParseOptions) {
    const result = this.repository.list(param);
    return result;
  }
}
