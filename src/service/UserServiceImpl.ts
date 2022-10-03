import IUserService from "@interfaces/service/IUserService";
import IUserDao from "@interfaces/dao/IUserDao";
import UserDaoImpl from "@dao/UserDaoImpl";
import IUser from "@models/entities/User";
import { ProvideSingleton, inject } from '@ioc/ioc';
import DaoError from "@common/exception/DaoError";
import ServiceError from "@common/exception/ServiceError";

/**
* Service UserServiceImpl
*/
@ProvideSingleton(UserServiceImpl)
export class UserServiceImpl implements IUserService {
  constructor(@inject(UserDaoImpl) private userDao: IUserDao) {}

  public async deleteById(id: string): Promise<IUser> {
    //Do some business logic...
    try {
      return await this.userDao
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

  public async get(page: number, size: number): Promise<IUser[]>  {
    //Do some business logic...
    try {
      return await this.userDao.get(page, size);
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


  public async getAll(): Promise<IUser[]> {
    //Do some business logic...
    try {
      return await this.userDao
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

  public async update(user: IUser): Promise<IUser> {
    //Do some business logic...
    try {
      return await this.userDao
        .update(user);
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

  public async getById(id: string): Promise<IUser> {
    //Do some business logic...
    try {
      return await this.userDao
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

  public async save(user: IUser): Promise<IUser> {
    //Do some business logic...
    try {
      return await this.userDao
        .save(user);
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
