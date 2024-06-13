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
  Middlewares,
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
import APIError from "../../error/api-error";
import axios from "axios";
import mongoose from "mongoose";
import { authorize } from "../../middleware/authmiddleware";
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
  @Post(ROUTE_PATHS.PROFILE.ADD_TO_FAVORITES)
  @Middlewares(authorize(["seeker"])) // Assuming only logged-in users can add to favorites
  public async AddToFavorite(
    @Path() postId: string,
    @Request() req: any
  ): Promise<{ message: string; data: any }> {
    try {
      const userId = req.userId;
      const userservice = new UserService();

      // Fetch user data
      const user = await userservice.GetByIdService(userId);
      if (!user) {
        throw new APIError("User not found", StatusCode.NotFound);
      }

      // Validate postId
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new APIError("Invalid post ID format", StatusCode.BadRequest);
      }

      // Fetch post data from CompanyService
      const postResponse = await axios.get(
        `http://company-service:4004/v1/posts/${postId}`
      );
      const post = postResponse.data;

      if (!user.favorite) {
        user.favorite = [];
      }

      const existingFavoriteIndex = user.favorite.findIndex((item) =>
        new mongoose.Types.ObjectId(item).equals(post._id)
      );

      if (existingFavoriteIndex !== -1) {
        // Remove post from favorites
        user.favorite.splice(existingFavoriteIndex, 1);
        await user.save();
        return {
          message: "Post removed from favorites successfully",
          data: user,
        };
      }

      // Add post to favorites
      user.favorite.push(post._id);
      await user.save();
      return { message: "Post added to favorites successfully", data: user };
    } catch (error: any) {
      console.error("Error adding/removing favorite:", error);
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        "Error adding/removing favorite",
        StatusCode.BadRequest
      );
    }
  }
}
