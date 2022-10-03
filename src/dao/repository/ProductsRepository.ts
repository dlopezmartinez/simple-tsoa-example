import IProducts from "@models/entities/Products";
import { ProvideSingleton } from "@ioc/ioc";
import { Document, Schema, model, Model } from "mongoose";
/**
* Repository IProducts
*/
interface IProductsDocument extends IProducts, Document {}

const ProductsFields: Record<keyof IProducts, any> = {

  ID: {
    type: String,
    required: true,
    unique: true,
    index:true
  },
  balance: {type: String,required: false}, 
	type: {type: String,required: false}, 
  number : {type: String, required : false}
	
};

const ProductsSchema = new Schema(ProductsFields, {
  toObject: {
    transform: function (_doc, ret) {

      const productsKeysFields = Object.keys(ProductsFields);
      const mongoKeysFields = Object.keys(ret);
      
      mongoKeysFields.forEach((key) => {
        if(!productsKeysFields.includes(key)){
          delete ret[key];
        }
      })
      return ret;
    },
  },
});

@ProvideSingleton(ProductsRepository)
export class ProductsRepository {
  public model : Schema = ProductsSchema;
  public repository : Model<IProductsDocument > = model<IProductsDocument >("Products", ProductsSchema);
}

export { IProductsDocument };