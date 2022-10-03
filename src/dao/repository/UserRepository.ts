import IUser from "@models/entities/User";
import { ProvideSingleton } from "@ioc/ioc";
import { Document, Schema, model, Model } from "mongoose";
/**
* Repository IUser
*/
interface IUserDocument extends IUser, Document {}

const UserFields: Record<keyof IUser, any> = {

  ID: {
    type: String,
    required: true,
    unique: true,
    index:true
  },
  username: {type: String,required: false}, 
	password: {type: String,required: false}, 
	
};

const UserSchema = new Schema(UserFields, {
  toObject: {
    transform: function (_doc, ret) {

      const userKeysFields = Object.keys(UserFields);
      const mongoKeysFields = Object.keys(ret);
      
      mongoKeysFields.forEach((key) => {
        if(!userKeysFields.includes(key)){
          delete ret[key];
        }
      })
      return ret;
    },
  },
});

@ProvideSingleton(UserRepository)
export class UserRepository {
  public model : Schema = UserSchema;
  public repository : Model<IUserDocument > = model<IUserDocument >("User", UserSchema);
}

export { IUserDocument };