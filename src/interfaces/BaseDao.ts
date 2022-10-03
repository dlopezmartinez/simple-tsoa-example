import BaseEntity from "@models/BaseEntity";
import { SortOrder } from "mongoose";



export default interface BaseDao<T extends BaseEntity> {
    save(test: T): Promise<T>;
    getById(idToReturn: string): Promise<T>;
    get(page: number, size: number): Promise<T[]>;
    getSorted(page: number, size: number, order: Array<[string, SortOrder]>): Promise<T[]>;
    getAll(): Promise<T[]>;
    update(entityToUpdate: T): Promise<T>;
    deleteById(idToDelete: string): Promise<T>;
}