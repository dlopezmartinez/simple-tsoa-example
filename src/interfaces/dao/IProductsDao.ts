import IProducts from "@models/entities/Products";
import BaseDao from "../BaseDao";
/**
* Interface IProductsDao
*/
export default interface IProductsDao extends BaseDao<IProducts> {
  
}
