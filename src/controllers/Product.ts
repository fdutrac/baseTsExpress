import { Request, Response } from "express";
import { ProductService } from "@services/Product";

export class ProductController {
  static add = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const productService = new ProductService();
      const product = await productService.add(req.body);
      console.log(product);
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  };

  static list = async (req: Request, res: Response) => {
    try {
      const productService = new ProductService();
      const product = await productService.list(req.query);
      res.json(product);
    } catch (error) {
      res.json(error);
    }
  };
}
