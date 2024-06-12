import APIError from "../database/error/api-error";
import { Post } from "../database/model/post.repo.model";
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
      const posts = await this.postrepo.GetAll();

      return posts;
    } catch (error) {
      throw new Error("Unable to retrieve posts");
    }
  }
  async FindById({ id }: { id: string }) {
    try {
      return await this.postrepo.FindById({ id });
    } catch (error) {
      console.log(error);
      throw new APIError("Unable to get post job with this ID");
    }
  }
  async FindByCidAndJobId(companyid:string, jobid:string){
    try{
      return await this.postrepo.FindByCidAndJobId(companyid, jobid); //

    }catch(error){
      throw new APIError("Unable to get post job with this ID");
    }
  }

  async UpdatePost({ id, update }: { id: string; update: postupdateschema }) {
    try {
      return await this.postrepo.Update({ id, update });
    } catch (error) {
      console.log(error);
      throw new APIError("Unable to update job!");
    }
  }
  async DeletePost(companyid:string, jobid:string) {
    try {
      return await this.postrepo.Delete(companyid , jobid);
    } catch (error) {
      console.log(error);
      throw new APIError("Unable to delete Job");
    }
  }
  //  implementation for get all post job that company posted
  async getPostsByCompanyId(companyId: string): Promise<any[]> {
    try {
      const posts = await Post.find({ companyId });
      return posts;
    } catch (error) {
      console.error("Error retrieving posts by company ID:", error);
      throw new Error("Unable to retrieve posts");
    }
  }
}
export default PostService;

// }

// export default PostService;
