import { ParseOptions } from "querystring";
import { IProduct } from "src/@types/IProduct";
import { IProductRepository } from "src/@types/IProductRepository";
import { getConnection } from "typeorm";

export class ProductRepository implements IProductRepository {
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
