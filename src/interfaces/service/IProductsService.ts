import IProducts from "@models/entities/Products";

/**
* Interface IProductsService
*/
export default interface IProductsService {
  save(products: IProducts): Promise<IProducts>;
  getById(id: string): Promise<IProducts>;
  get(page: number, size: number): Promise<IProducts[]>;
  getAll(): Promise<IProducts[]>;
  deleteById(id: string): Promise<IProducts>;
  update(products: IProducts): Promise<IProducts>;
}
