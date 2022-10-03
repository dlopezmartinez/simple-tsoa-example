import BaseEntity from "../BaseEntity";

export default interface IUser extends BaseEntity {
  username?: string; 
	password?: string; 
}

