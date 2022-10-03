import IProductsService from "@interfaces/service/IProductsService";
import IProducts from "@models/entities/Products";
import { ProductsServiceImpl } from "@service/ProductsServiceImpl";
import { Controller, Get, Route, Query, Delete, Put, Body, Post, Response, SuccessResponse, Tags } from 'tsoa';
import { ProvideSingleton, inject } from '@ioc/ioc';
import ServiceError from "@common/exception/ServiceError";


/**
* Controller ProductsController
*/
@Route('/products')
@ProvideSingleton(ProductsController)
@Tags("Products")
export class ProductsController extends Controller {

  constructor(@inject(ProductsServiceImpl) private productsService: IProductsService) {
		super();
	}


  /**
   * Save a new Products. The identifier of the entity isn't mandatory so you can leave it undefined (not written). 
   * If you leave it undefined, the 'DAO' layer will generate and assign an ID to you entity automatically.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Request Success")
  @Post('/save')
  public async save(@Body() products: IProducts): Promise<IProducts> {
    //Do some business logic...
    try {
			return await this.productsService.save(products);
		} catch (err) {
      if (err instanceof ServiceError) {
        //Do the business logic error you want...
        return Promise.reject(err.message);
      } else {
        return Promise.reject("Unknown error");
      }
    }
  }




  /**
   * Return a Products by its ID.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Request Success")
  @Get('/getById')
  public async getById(@Query() id: string): Promise<IProducts>  {
    //Do some business logic...
    try {
			return await this.productsService.getById(id);
		} catch (err) {
      if (err instanceof ServiceError) {
        //Do the business logic error you want...
        return Promise.reject(err.message);
      } else {
        return Promise.reject("Unknown error");
      }
    }
  }

  /**
  * Return a set of Products. Page starts at 0.
  */
 @Response<{ message: string }>(400, "Bad request")
 @SuccessResponse("200", "Request Success")
 @Get("/get")
 public async get(@Query() page: number,@Query() size:number): Promise<IProducts[]> {
   //Do some business logic...
   try {
     return await this.productsService.get(page,size);
   } catch (err) {
     if (err instanceof ServiceError) {
       //Do the business logic error you want...
       return Promise.reject(err.message);
     } else {
       return Promise.reject("Unknown error");
     }
   }
 }


  /**
   * Return all Products.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Request Success")
  @Get('/getAll')
  public async getAll(): Promise<IProducts[]>  {
    //Do some business logic...
    try {
      return await this.productsService.getAll();
    } catch (err) {
      if (err instanceof ServiceError) {
        //Do the business logic error you want...
        return Promise.reject(err.message);
      } else {
        return Promise.reject("Unknown error");
      }
    }
  }


  /**
   * Delete a Products by its ID.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Success")
  @Delete('/deleteById')
  public async deleteById(@Query() id: string): Promise<IProducts>  {
    try {
			return await this.productsService.deleteById(id);
		} catch (err) {
      if (err instanceof ServiceError) {
        //Do the business logic error you want...
        return Promise.reject(err.message);
      } else {
        return Promise.reject("Unknown error");
      }
    }
  }



  /**
   * Update a Products by its ID.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Request Success")
  @Put('/update')
  public async update(@Body() products: IProducts): Promise<IProducts> {

    //Do some business logic...
    try {
			return await this.productsService.update(products);
		} catch (err) {
      if (err instanceof ServiceError) {
        //Do the business logic error you want...
        return Promise.reject(err.message);
      } else {
        return Promise.reject("Unknown error");
      }
    }
  }
}
