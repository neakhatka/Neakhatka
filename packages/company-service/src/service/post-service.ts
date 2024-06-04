import APIError from "../controller/error/api-error";
import {
  postcreateschema,
  postupdateschema,
} from "../database/repository/@types/post.repo.type";
import PostJob from "../database/repository/post.repository";
class PostService {
  private postrepo: PostJob;
  constructor() {
    this.postrepo = new PostJob();
  }
  async Create(postdetail: postcreateschema) {
    try {
      const create = await this.postrepo.Create(postdetail);
      return create;
    } catch (error) {
      console.log(error);
    }
  }
  async GetAllPost(): Promise<any> {
    try {
      return await this.postrepo.GetAll();
    } catch (error) {
      throw new Error("Unable to find user");
    }
  }
  async FindById({ id }: { id: string }) {
    try {
      return await this.postrepo.FindById({ id });
    } catch (error) {
      console.log(error);
      throw new APIError("Unable to get post card with this ID");
    }
  }

  async Updatepost({ id, update }: { id: string; update: postupdateschema }) {
    try {
      return await this.postrepo.Update({ id, update });
    } catch (error) {
      console.log(error);
      throw new APIError("Unable to update User profile!");
    }
  }
  async DeletePost({ id }: { id: string }) {
    try {
      return await this.postrepo.Delete({ id });
    } catch (error) {
      console.log(error);
      throw new APIError("Unable to delete User profile");
    }
  }
}
export default PostService;

// }

// export default PostService;
