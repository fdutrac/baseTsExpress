import { ParseOptions } from "querystring";

import { IProduct } from "./IProduct";

export interface IProductRepository {
  add: (product?: IProduct) => {};
  list: (parameter: ParseOptions) => {};
}
