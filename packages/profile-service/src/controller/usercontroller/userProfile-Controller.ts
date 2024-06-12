import {
  Body,
  Controller,
  Get,
  Route,
  Path,
  SuccessResponse,
  Post,
  Put,
  Request,
  Delete,
} from "tsoa";
import { UserService } from "../../service/userService/userProfileService";
// import { IUserDocument } from "../../database/@types/user.interface";
import ROUTE_PATHS from "../../routes/v1/useProfile.Route";
import { StatusCode } from "../../utils/consts/status.code";
import {
  createuser,
  updateuser,
} from "../../database/repository/@types/user.repository.type";
import { IUserDocument } from "../../database/@types/user.interface";
// import APIError from "../../error/api-error";
// import mongoose from "mongoose";
// import axios from "axios";

@Route("/v1/users")
export class UserController extends Controller {
  @Post(ROUTE_PATHS.PROFILE.CREATE)
  public async CreateUser(@Body() requestBody: createuser): Promise<any> {
    console.log("Recived data", requestBody);
    try {
      const userService = new UserService();

      const userProfile = await userService.createuser(requestBody);

      return userProfile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(ROUTE_PATHS.PROFILE.GET_ALL)
  //   @Get("/all-profile")
  public async GetAllUserController(): Promise<IUserDocument[]> {
    const userService = new UserService();
    return await userService.GetAllProfileservice();
  }

  @Get(ROUTE_PATHS.PROFILE.GET_BY_ID)
  @SuccessResponse(StatusCode.OK, "Successfully retrieved profile")
  // @Response("404", "Card not found")
  public async GetCardById(@Path() id: string): Promise<any> {
    try {
      const userservice = new UserService();
      const User = await userservice.GetByIdService({ id });
      if (User) {
        return User;
      } else {
        return { message: "Profile Not Found" };
      }
    } catch (error) {
      throw error;
      // console.log(error);
    }
  }

  // update user
  @Put(ROUTE_PATHS.PROFILE.UPDATE)
  @SuccessResponse(StatusCode.OK, "Successfully Update profile")
  public async updateUserController(
    @Path() id: string,
    @Body() updateData: Partial<updateuser>
  ): Promise<any> {
    try {
      const userservice = new UserService();
      const updateuser = await userservice.updateProfileService({
        id,
        updateData,
      });
      if (!updateuser) {
        this.setStatus(404); // Set HTTP status code to 404
        return { message: "Profile Not Found" };
      }
      return updateuser;
    } catch (error: any) {
      this.setStatus(500); // Set HTTP status code to 500 for server errors
      return { message: error.message || "Internal Server Error" };
    }
  }
  // delete USER by id
  @SuccessResponse(StatusCode.NoContent, "Successfully Delete  profile")
  @Delete(ROUTE_PATHS.PROFILE.DELETE)
  public async DeleteUserContrioller(@Path() id: string): Promise<any> {
    try {
      const userservice = new UserService();
      const deleteuser = await userservice.DeleteProfileService({ id });
      if (deleteuser) {
        return deleteuser;
      } else {
        return { message: "Profile Not Found" };
      }
    } catch (error) {
      throw error;
    }
  }
}
  // Add a card to favorites
//   @Post(ROUTE_PATHS.PROFILE.ADD_TO_FAVORITES)
//   public async AddToFavorite(
//     @Path() postId: string,
//     @Request() requestBody: any
//   ): Promise<any> {
//     try {
//       const userservice = new UserService();

//       console.log("Post /:id");
//       const user = await userservice.GetByIdService(requestBody.id);

//       // Validate objectId
//       if (!mongoose.Types.ObjectId.isValid(postId)) {
//         throw new Error("Invalid event ID format");
//       }
//       if (!user) {
//         throw new Error("User not found");
//       }
//       const post = await axios.get(
//         `http://event:4004/v1/company/posting?id=${postId}`
//       ); // fetch event data from event service
//       if (!user.favoriteCards) {
//         user.favoriteCards = [];
//       }
//       // Check for existing favorite using findIndex
//       const existingFavoriteIndex = user.favoriteCards.findIndex((item) =>
//         new mongoose.Types.ObjectId(item).equals(post.data[0]._id)
//       );

//       if (existingFavoriteIndex !== -1) {
//         // Remove event from favorites
//         user?.favoriteCards.splice(existingFavoriteIndex!, 1);
//         await user?.save();

//         return {
//           message: "Post removed from favorites successfully",
//           data: user,
//         };
//       }

//       // Add event to favorites
//       user?.favoriteCards.push(post.data[0]._id);
//       await user?.save();

//       return {
//         message: "Post added to favorites successfully",
//         data: user,
//       };
//     } catch (error) {
//       console.error("Error adding/removing favorite:", error);
//       // You can customize the error response here based on error type
//       throw new APIError(
//         "Error adding/removing favorite",
//         StatusCode.BadRequest
//       );
//     }
//   }
// }
