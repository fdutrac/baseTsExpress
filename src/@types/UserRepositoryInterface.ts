import { ParseOptions } from "querystring";

import { IUser } from "./UserInterface";

export interface IRepository {
  add: (user?: IUser) => {};
  list: (parameter: ParseOptions) => {};
}
