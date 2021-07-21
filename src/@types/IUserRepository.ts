import { ParseOptions } from "querystring";

import { IUser } from "./IUser";

export interface IUserRepository {
  add: (user?: IUser) => {};
  list: (parameter: ParseOptions) => {};
}
