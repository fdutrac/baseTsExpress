import { ParseOptions } from "querystring";

import { IClient } from "./ClientInterface";

export interface IRepository {
  add: (client?: IClient) => {};
  list: (parameter: ParseOptions) => {};
}
