import { ParseOptions } from "querystring";

import { IClient } from "./ClientInterface";

export interface IRepository {
  add: (user?: IClient) => {};
  list: (parameter: ParseOptions) => {};
}
