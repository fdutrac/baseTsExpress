import { ParseOptions } from "querystring";

import { IProduct } from "./ProductInterface";

export interface IRepository {
  add: (product?: IProduct) => {};
  list: (parameter: ParseOptions) => {};
}
