import { ParseOptions } from "querystring";

import { IClient } from "./IClient";

export interface IClientRepository {
  add: (client?: IClient) => {};
  list: (parameter: ParseOptions) => {};
  delete: (id: string) => {};
}
