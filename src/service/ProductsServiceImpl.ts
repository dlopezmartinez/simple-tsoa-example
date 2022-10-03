import IProductsService from "@interfaces/service/IProductsService";
import IProductsDao from "@interfaces/dao/IProductsDao";
import ProductsDaoImpl from "@dao/ProductsDaoImpl";
import IProducts from "@models/entities/Products";
import { ProvideSingleton, inject } from '@ioc/ioc';
import DaoError from "@common/exception/DaoError";
import ServiceError from "@common/exception/ServiceError";

/**
* Service ProductsServiceImpl
*/
@ProvideSingleton(ProductsServiceImpl)
export class ProductsServiceImpl implements IProductsService {
  constructor(@inject(ProductsDaoImpl) private productsDao: IProductsDao) {}

  public async deleteById(id: string): Promise<IProducts> {
    //Do some business logic...
    try {
      return await this.productsDao
        .deleteById(id);
    } catch (err) {
      if (err instanceof DaoError) {
        //Do the business logic error you want...
        const error = new ServiceError(err.message, err.stack);
        return Promise.reject(error);
      } else {
        return Promise.reject(new ServiceError("Unknown error"));
      }
    }
  }

  public async get(page: number, size: number): Promise<IProducts[]>  {
    //Do some business logic...
    try {
      return await this.productsDao.get(page, size);
    } catch (err) {
      if (err instanceof DaoError) {
        //Do the business logic error you want...
        const error = new ServiceError(err.message, err.stack);
        return Promise.reject(error);
      } else {
        return Promise.reject(new ServiceError("Unknown error"));
      }
    }
  }


  public async getAll(): Promise<IProducts[]> {
    //Do some business logic...
    try {
      return await this.productsDao
        .getAll();
    } catch (err) {
      if (err instanceof DaoError) {
        //Do the business logic error you want...
        const error = new ServiceError(err.message, err.stack);
        return Promise.reject(error);
      } else {
        return Promise.reject(new ServiceError("Unknown error"));
      }
    }
  }

  public async update(products: IProducts): Promise<IProducts> {
    //Do some business logic...
    try {
      return await this.productsDao
        .update(products);
    } catch (err) {
      if (err instanceof DaoError) {
        //Do the business logic error you want...
        const error = new ServiceError(err.message, err.stack);
        return Promise.reject(error);
      } else {
        return Promise.reject(new ServiceError("Unknown error"));
      }
    }
  }

  public async getById(id: string): Promise<IProducts> {
    //Do some business logic...
    try {
      return await this.productsDao
        .getById(id);
    } catch (err) {
      if (err instanceof DaoError) {
        //Do the business logic error you want...
        const error = new ServiceError(err.message, err.stack);
        return Promise.reject(error);
      } else {
        return Promise.reject(new ServiceError("Unknown error"));
      }
    }
  }

  public async save(products: IProducts): Promise<IProducts> {
    //Do some business logic...
    try {
      return await this.productsDao
        .save(products);
    } catch (err) {
      if (err instanceof DaoError) {
        //Do the business logic error you want...
        const error = new ServiceError(err.message, err.stack);
        return Promise.reject(error);
      } else {
        return Promise.reject(new ServiceError("Unknown error"));
      }
    }
  }
}
