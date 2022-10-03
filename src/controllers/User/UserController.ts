import IUserService from "@interfaces/service/IUserService";
import IUser from "@models/entities/User";
import { UserServiceImpl } from "@service/UserServiceImpl";
import { Controller, Get, Route, Query, Delete, Put, Body, Post, Response, SuccessResponse, Tags } from 'tsoa';
import { ProvideSingleton, inject } from '@ioc/ioc';
import ServiceError from "@common/exception/ServiceError";


/**
* Controller UserController
*/
@Route('/user')
@ProvideSingleton(UserController)
@Tags("User")
export class UserController extends Controller {

  constructor(@inject(UserServiceImpl) private userService: IUserService) {
		super();
	}


  /**
   * Save a new User. The identifier of the entity isn't mandatory so you can leave it undefined (not written). 
   * If you leave it undefined, the 'DAO' layer will generate and assign an ID to you entity automatically.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Request Success")
  @Post('/save')
  public async save(@Body() user: IUser): Promise<IUser> {
    //Do some business logic...
    try {
			return await this.userService.save(user);
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
   * Return a User by its ID.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Request Success")
  @Get('/getById')
  public async getById(@Query() id: string): Promise<IUser>  {
    //Do some business logic...
    try {
			return await this.userService.getById(id);
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
  * Return a set of User. Page starts at 0.
  */
 @Response<{ message: string }>(400, "Bad request")
 @SuccessResponse("200", "Request Success")
 @Get("/get")
 public async get(@Query() page: number,@Query() size:number): Promise<IUser[]> {
   //Do some business logic...
   try {
     return await this.userService.get(page,size);
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
   * Return all User.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Request Success")
  @Get('/getAll')
  public async getAll(): Promise<IUser[]>  {
    //Do some business logic...
    try {
      return await this.userService.getAll();
    } catch (err) {
      if (err instanceof ServiceError) {
        //Do the business logic error you want...
        return Promise.reject(err.message);
      } else {
        return Promise.reject("Unknown error");
      }
    }
  }

  @Response<{ message: string }>(400, "User not found")
  @SuccessResponse("200", "Request Success")
  @Post('/login')
  public async login(@Body() user: IUser): Promise<Boolean>  {
    //Do some business logic...
    try {
      const allUsers = await this.userService.getAll();

      const { username, password } = user;
      let logged = false;

      allUsers.forEach(async (userItem) => {
        if(username === userItem.username && password === userItem.password ){
          logged = true;
          await this.userService.update(userItem);
        }})

        return logged ? true : Promise.reject('User not found') 
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
   * Delete a User by its ID.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Success")
  @Delete('/deleteById')
  public async deleteById(@Query() id: string): Promise<IUser>  {
    try {
			return await this.userService.deleteById(id);
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
   * Update a User by its ID.
   */
  @Response<{ message: string }>(400, "Bad request")
  @SuccessResponse("200", "Request Success")
  @Put('/update')
  public async update(@Body() user: IUser): Promise<IUser> {

    //Do some business logic...
    try {
			return await this.userService.update(user);
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
