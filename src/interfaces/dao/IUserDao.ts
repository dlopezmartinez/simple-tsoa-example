import IUser from "@models/entities/User";
import BaseDao from "../BaseDao";
/**
* Interface IUserDao
*/
export default interface IUserDao extends BaseDao<IUser> {
  
}
