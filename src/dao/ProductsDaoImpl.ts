import IProductsDao from "@interfaces/dao/IProductsDao";
import { IProductsDocument, ProductsRepository } from "@repository/ProductsRepository";
import IProducts from "@models/entities/Products";
import { inject, ProvideSingleton } from '@ioc/ioc';
import BaseDaoImpl from "./BaseDaoImpl";

/**
* Dao ProductsDaoImpl
*/
@ProvideSingleton(ProductsDaoImpl)
export default class ProductsDaoImpl extends BaseDaoImpl<IProducts, IProductsDocument> implements IProductsDao {

  constructor(@inject(ProductsRepository) productsRepository: ProductsRepository) {
    super(productsRepository.repository);
  }
}
