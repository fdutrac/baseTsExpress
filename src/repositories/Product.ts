import { ParseOptions } from "querystring";
import { IProduct } from "src/@types/ProductInterface";
import { IRepository } from "src/@types/ProductRepositoryInterface";
import { getConnection } from "typeorm";

export class ProductRepository implements IRepository {
  async add(product: IProduct) {
    const repository = getConnection().getRepository("Product");
    const result = repository.save(product);
    return result;
  }

  async list(param?: ParseOptions) {
    const repository = getConnection().getRepository("Product");
    const result = repository.find(param);
    return result;
  }
}
