import IUser from "@models/entities/User";

/**
* Interface IUserService
*/
export default interface IUserService {
  save(user: IUser): Promise<IUser>;
  getById(id: string): Promise<IUser>;
  get(page: number, size: number): Promise<IUser[]>;
  getAll(): Promise<IUser[]>;
  deleteById(id: string): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
}
