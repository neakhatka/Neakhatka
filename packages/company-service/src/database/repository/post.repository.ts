import APIError from "../../controller/error/api-error";
import { StatusCode } from "../../util/consts/status.code";
import { Post } from "../model/post.repo.model";
import { postcreateschema, postupdateschema } from "./@types/post.repo.type";
// import { postcreateschema, postupdateschema } from "./@types/post.repo.type";

class PostJob {
  async Create(postdetail: postcreateschema) {
    try {
      const create = new Post(postdetail);
      const post = await create.save();
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  async GetAll(): Promise<any> {
    try {
      const allpost = await Post.find();
      if (!allpost) {
        return { message: "can not get user" };
      }
      return allpost;
    } catch (error: any) {
      return {
        message: "An error occurred while fetching posting",
        error: error.message,
      };
    }
  }

  async FindById({ id }: { id: string }) {
    try {
      const existed = await Post.findById(id);
      return existed;
    } catch (error) {
      console.log(error);
      throw new APIError("Unable to That Post Card");
    }
  }

  async Update({ id, update }: { id: string; update: postupdateschema }) {
    try {
      const existed = await this.FindById({ id });
      if (!existed) {
        // console.log("Unable to Update this post");
        return "Post Card Not Exsite";
      }
      const updatepost = await Post.findByIdAndUpdate(id, update, {
        new: true,
      });
      return updatepost;
    } catch (error) {
      console.log(error);
      if (error instanceof APIError) {
        throw new APIError("Unable to update that post");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async Delete({ id }: { id: string }) {
    try {
      const existed = await this.FindById({ id });
      if (!existed) {
        throw new APIError("Unable to find iin database", StatusCode.NoContent);
      }
      return await Post.findByIdAndDelete(id);
    } catch (error) {
      // console.log(error);
      if (error instanceof APIError) {
        throw new APIError("Unable to Delete User in database");
      }
    }
  }
}
export default PostJob;
// }
// export default PostJob;
