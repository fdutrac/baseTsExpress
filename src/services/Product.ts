import { ProductRepository } from "@repositories/Product";
import { ParseOptions } from "querystring";
import { IProduct } from "src/@types/ProductInterface";
import { IRepository } from "src/@types/ProductRepositoryInterface";

export class ProductService implements IRepository {
  repository: IRepository = new ProductRepository();
  product: IProduct;

  // constructor() {
  //   this.repository = new UserRepository();
  // }

  async add(product: IProduct) {
    const result = this.repository.add(product);
    return result;
  }

  async list(param?: ParseOptions) {
    const result = this.repository.list(param);
    return result;
  }
}
