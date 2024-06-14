import { seeker_profile } from "../../models/userprofile/userprofilel-model";
// import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";
import { IUserDocument } from "../../@types/user.interface";
import DuplitcateError from "../../../error/duplitcate-error";
import APIError from "../../../error/api-error";
import { createuser, updateuser } from "../@types/user.repository.type";
import { StatusCode } from "../../../utils/consts/status.code";
class UserRepository {
  // create user
  async createuser(UserDetail: createuser) {
    try {
      const existingUser = await this.FindUserByEmail({
        email: UserDetail.email,
      });

      if (existingUser) {
        throw new DuplitcateError("Email alredy in use");
      }
      const user = new seeker_profile(UserDetail);
      const userresult = await user.save();
      return userresult;
    } catch (error) {
      console.log(error);
      if (error instanceof DuplitcateError) {
        throw new APIError("Enable create user in database");
      }
    }
  }

  // get all user profile
  async GetAllUserRepo(): Promise<IUserDocument[]> {
    try {
      return await seeker_profile.find();
    } catch (error) {
      throw new APIError("Enable to find user");
    }
  }
  // get profile by id
  async findById({ id }: { id: string }) {
    try {
      const existedUser = await seeker_profile.findById(id);
      return existedUser;
    } catch (error) {
      console.log(error);

      throw new APIError("Unable to find user in database ");
    }
  }
  // update profile

  async updateUser({
    id,
    updateData,
  }: {
    id: string;
    updateData: updateuser;
  }) {
    try {
      const isExist = await this.findById({ id });
      if (!isExist) {
        throw new APIError("post  does not exist", StatusCode.NotFound);
      }

      const newuserupdate = await seeker_profile.findByIdAndUpdate(
        id,
        {
          $set:updateData,
        },
        { new: true }
      );
      return newuserupdate;
    } catch (error) {
      if (error instanceof APIError) {
        throw new APIError("Unable to update user in database");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  // delete profile
  async deleteUser({ id }: { id: string }) {
    try {
      const existedID = await this.findById({ id });
      if (!existedID) {
        throw new APIError("Unable to find iin database", StatusCode.NoContent);
      }
      return await seeker_profile.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
  async FindUserByEmail({ email }: { email: string }) {
    try {
      const existinguser = await seeker_profile.findOne({ email: email });
      return existinguser;
    } catch (error) {
      // console.log(error);
      if (error instanceof APIError) {
        throw new APIError("Unable to Delete User in database");
      }
    }
  }
}

export default UserRepository;
