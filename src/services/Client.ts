import { ClientRepository } from "@repositories/Client";
import { ParseOptions } from "querystring";
import { IClient } from "src/@types/ClientInterface";
import { IRepository } from "src/@types/ClientRepositoryInterface";

export class ClientService implements IRepository {
  private repository: IRepository = new ClientRepository();

  async add(client: IClient) {
    const result = this.repository.add(client);
    return result;
  }

  async list(param?: ParseOptions) {
    const result = this.repository.list(param);
    return result;
  }
}
