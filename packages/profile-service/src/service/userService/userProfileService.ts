import UserRepository from "../../database/repository/userRepository/userProfileRepo";
import { IUserDocument } from "../../database/@types/user.interface";
import DuplitcateError from "../../error/duplitcate-error";
import APIError from "../../error/api-error";
import {
  createuser,
  updateuser,
} from "../../database/repository/@types/user.repository.type";
export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }
  async createuser(UserDetail: createuser) {
    try {
      const User = await this.userRepo.createuser(UserDetail);
      return User;
    } catch (error) {
      console.log(error);
      if (error instanceof DuplitcateError) {
        throw new Error("Unable to create user");
      }
    }
  }

  async GetAllProfileservice(): Promise<IUserDocument[]> {
    try {
      return await this.userRepo.GetAllUserRepo();
    } catch (error) {
      throw new APIError("Unable to get user");
    }
  }

  async GetByIdService({ id }: { id: string }) {
    try {
      return await this.userRepo.findById({ id });
    } catch (error) {
      console.log(error);
      // return null;
      throw new APIError("Unable to get user with this ID");
    }
  }
  async FindByAuthId({ userId }: { userId: string }): Promise<any> {
    try {
      return await this.userRepo.FindByAuthID({ userId });
    } catch (error) {
      console.log(error);
      // return null;
      throw new APIError("Unable to get user with this ID");
    }
  }

  // update user

  async updateProfileService({
    id,
    updateData,
  }: {
    id: string;
    updateData: updateuser;
  }): Promise<any> {
    try {
      return await this.userRepo.updateUser({ id, updateData });
    } catch (error) {
      // throw error;
      throw new APIError("Unable to update User profile!");
    }
  }

  // delete user
  async DeleteProfileService({ id }: { id: string }) {
    try {
      return await this.userRepo.deleteUser({ id });
    } catch (error) {
      // throw error;
      throw new APIError("Unable to delete User profile");
    }
  }
}
