import IUserDao from "@interfaces/dao/IUserDao";
import { IUserDocument, UserRepository } from "@repository/UserRepository";
import IUser from "@models/entities/User";
import { inject, ProvideSingleton } from '@ioc/ioc';
import BaseDaoImpl from "./BaseDaoImpl";

/**
* Dao UserDaoImpl
*/
@ProvideSingleton(UserDaoImpl)
export default class UserDaoImpl extends BaseDaoImpl<IUser, IUserDocument> implements IUserDao {

  constructor(@inject(UserRepository) userRepository: UserRepository) {
    super(userRepository.repository);
  }
}
