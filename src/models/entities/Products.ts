import BaseEntity from "../BaseEntity";

export default interface IProducts extends BaseEntity {
  balance?: string; 
	type?: string; 
  number?: string;
	
}

