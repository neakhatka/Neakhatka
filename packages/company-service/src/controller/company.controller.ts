import {
  // DeleteCompanyRequest,
  companycreateschema,
  companyupdateschema,
} from "../database/repository/@types/company.repo.type";
import CompanyService from "../service/company-servive";
import ROUTE_PATHS from "../routes/v1/company.route";
import {
  Body,
  Controller,
  Post,
  Get,
  Path,
  Route,
  Put,
  SuccessResponse,
  Delete,
  Middlewares,
  Request,
} from "tsoa";
import { StatusCode } from "../util/consts/status.code";
import {
  postcreateschema,
  postupdateschema,
} from "../database/repository/@types/post.repo.type";
import PostService from "../service/post-service";
import { AuthRequest, authorize } from "../middleware/authMiddleware";
import { logger } from "../util/logger";

@Route("v1/companies")
export class CompanyController extends Controller {
  // ===================================================
  // ============= COMPANY RESOURCE =======================
  // ===================================================
  @SuccessResponse(StatusCode.Found, "Data Found")
  @Get(ROUTE_PATHS.COMPANY.GETALL)
  public async GetAll(): Promise<{ message: string; data: any }> {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.GetAll();
      return { message: "Success retrieved!", data: result };
    } catch (error: any) {
      throw {
        status: StatusCode.NotFound,
        message: "Can not found",
        detail: error.message,
      };
    }
  }

  @Get(ROUTE_PATHS.COMPANY.GET_BY_ID)
  @SuccessResponse(StatusCode.OK, "Successfully retrieved profile")
  public async GetById(
    @Path() id: string
  ): Promise<{ message: string; data: any }> {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.FindById({ id });
      if (!result) {
        return { message: "Could not find", data: null };
      }
      return { message: "Company had found ", data: result };
    } catch (error: any) {
      console.log(error);
      // throw error;
      throw {
        status: StatusCode.NotFound,
        message: "Can not found with that id",
        detail: error.message,
      };
    }
  }

  @SuccessResponse(StatusCode.Created, "Created")
  @Post(ROUTE_PATHS.COMPANY.CREATE)
  public async CreateCompany(
    @Body() requestBody: companycreateschema
  ): Promise<any> {
    try {
      const company = new CompanyService();
      const result = await company.Create(requestBody);
      return result;
    } catch (error: any) {
      console.log(error);
      throw {
        status: StatusCode.BadRequest,
        message: "Can not create that User!",
        detail: error.message,
      };
      // throw error;
    }
  }

  @SuccessResponse(StatusCode.Found, "Successfully Update profile")
  @Put(ROUTE_PATHS.COMPANY.UPDATE)
  public async UpdateCompany(
    @Path() id: string,
    @Body() update: companyupdateschema
  ): Promise<{ message: string; data: any }> {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.update({ id, update });
      if (!result) {
        this.setStatus(404);
        return { message: "Profile not found", data: null };
      }
      return { message: "Profile updated", data: result };
    } catch (error: any) {
      // throw error;
      this.setStatus(500); // Set HTTP status code to 500 for server errors
      return { message: error.message || "Internal Server Error", data: null };
    }
  }

  @SuccessResponse(StatusCode.NoContent, "Successfully Delete  profile")
  @Delete(ROUTE_PATHS.COMPANY.DELETE)
  public async DeleteCompany(@Path() id: string): Promise<any> {
    try {
      const companyservice = new CompanyService();
      const deleterequest = await companyservice.Delete({ id });
      if (deleterequest) {
        return deleterequest;
      } else {
        return { message: "profile not found" };
      }
    } catch (error: any) {
      throw {
        status: StatusCode.NoContent,
        message: "Can not delete that company ",
        detail: error.message,
      };
    }
  }

  // ===================================================
  // ============= JOBS RESOURCE =======================
  // ===================================================

  // @Get(ROUTE_PATHS.POSTING.GET_ALL_POST)
  // @SuccessResponse(StatusCode.Found, "Data Found")
  // public async GetAllPosts(): Promise<{ message: string; data: any }> {
  //   try {
  //     console.log("GetAllPosts method called");
  //     const postservice = new PostService();
  //     const post = await postservice.GetAllPost();
  //     console.log("Posts retrieved:", post);
  //     return { message: "Success get all post", data: post };
  //   } catch (error: any) {
  //     console.error("Error in GetAllPosts:", error);
  //     throw {
  //       status: StatusCode.NotFound,
  //       message: "Can not found ",
  //       detail: error.message,
  //     };
  //   }
  // }

  @Get(ROUTE_PATHS.POSTING.GET_BY_ID)
  @SuccessResponse(StatusCode.Found, "Post Card Found")
  public async GetPost(
    @Path() companyid: string,
    @Path() id: string
  ): Promise<{ message: string; data: any }> {
    try {
      const postservice = new PostService();
      const getcard = await postservice.FindByCidAndJobId(companyid, id);
      console.log("getcard", getcard);
      return { message: "Found!", data: getcard };
    } catch (error) {
      throw error;
    }
  }

  @Middlewares(authorize(["employer"]))
  @Post(ROUTE_PATHS.POSTING.POST)
  @SuccessResponse(StatusCode.OK, "Posting Successfully")
  public async CreatePost(
    @Body() requestBody: postcreateschema,
    @Path() companyid: string,
    @Request() req: Express.Request
  ): Promise<{ message: string; data: any }> {
    try {
      const userId = (req as AuthRequest).employer.id;
      console.log("Auth ID:", userId);
      const companyservice = new CompanyService();
      const company = await companyservice.FindByAuthId({ userId });
      const companyId = company?.id;
      console.log("company ID:", companyid);
      // Check if the provided companyid matches the authenticated user's companyId
      if (companyId === companyid) {
        const postData = { companyId, ...requestBody };
        const postservice = new PostService();
        const post = await postservice.Create(postData);
        console.log("post Data", post);
        return { message: "Success post job", data: post };
      } else {
        return {
          // status: 403,
          message: "You are not authorized to post for this company",
          data: null,
        };
      }
    } catch (error) {
      console.log("post error:", error);
      throw error;
    }
  }
  @Middlewares(authorize(["employer"]))
  @Put(ROUTE_PATHS.POSTING.UPDATE)
  @SuccessResponse(StatusCode.OK, "Update Successfully")
  public async UpdatePost(
    @Path() companyid: string,
    @Path() id: string,
    @Body() update: postupdateschema,
    @Request() req: Express.Request
  ): Promise<{ message: string; data: any }> {
    try {
      const userId = (req as AuthRequest).employer.id;
      console.log("Auth ID:", userId);
      const companyservice = new CompanyService();
      const company = await companyservice.FindByAuthId({ userId });
      const companyId = company?.id;
      if (companyId === companyid) {
        const postservice = new PostService();
        const updatepost = await postservice.UpdatePost({ id, update });
        return { message: "Update successfully", data: updatepost };
      } else {
        this.setStatus(404); // Set HTTP status code to 404
        return { message: "Job  Not Found", data: null };
      }
    } catch (error: any) {
      console.log(error);
      this.setStatus(500); // Set HTTP status code to 500 for server errors
      return { message: error.message || "Internal Server Error", data: null };
    }
  }
  @Middlewares(authorize(["employer"]))
  @Delete(ROUTE_PATHS.POSTING.DELETE)
  @SuccessResponse(StatusCode.OK, "Delete Successfully")
  public async DeletePost(
    @Path() companyid: string,
    @Path() id: string
  ): Promise<{ message: string; data: string[] }> {
    try {
      const postservice = new PostService();
      await postservice.DeletePost(companyid, id);
      console.log("delete success ...");
      return { message: "Delete successfully", data: [] };
    } catch (error: any) {
      logger.error(`CompanyController DeletePost() method error: ${error}`);
      throw error;
    }
  }

  @Get(ROUTE_PATHS.POSTING.GET_JOBS_BY_CID)
  @SuccessResponse(StatusCode.OK, "Successfully retrieved posts")
  public async GetPostByCID(
    @Path() companyid: string
  ): Promise<{ message: string; data: any[] }> {
    try {
      const postService = new PostService();
      const posts = await postService.getPostsByCompanyId(companyid);
      return { message: "Successfully retrieved posts", data: posts };
    } catch (error: any) {
      this.setStatus(500);
      return { message: error.message || "Internal Server Error", data: [] };
    }
  }
}
