import { Get, Route ,SuccessResponse,Controller} from "tsoa";

import { StatusCode } from "../util/consts/status.code";
import PostService from "../service/post-service";
import ROUTE_PATHS from "../routes/v1/company.route";
@Route("v1/")
export class PostJob extends Controller {
  @Get(ROUTE_PATHS.POSTING.GET_ALL_POST)
  @SuccessResponse (StatusCode.Found, "Data Found")
  public async GetAllPosts(): Promise<{ message: string; data: any }> {
    try {
      console.log("GetAllPosts method called");
      const postservice = new PostService();
      const post = await postservice.GetAllPost();
      console.log("Posts retrieved:", post);
      return { message: "Success get all post", data: post };
    } catch (error: any) {
      console.error("Error in GetAllPosts:", error);
      throw {
        status: StatusCode.NotFound,
        message: "Can not found ",
        detail: error.message,
      };
    }
  }
}
