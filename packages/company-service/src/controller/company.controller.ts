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
} from "tsoa";
import { StatusCode } from "../util/consts/status.code";
@Route("v1/company")
export class CompanyController extends Controller {
  @SuccessResponse(StatusCode.Created, "Created")
  @Post(ROUTE_PATHS.COMPANY.CREATE)
  public async Create(@Body() requestBody: companycreateschema): Promise<any> {
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
  @Get(ROUTE_PATHS.COMPANY.GET_BY_ID)
  @SuccessResponse(StatusCode.OK,"Successfully retrieved profile")
  public async GetByid(@Path() id: string): Promise<any> {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.FindById({ id });
      return result;
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

  @SuccessResponse(StatusCode.Found,"Successfully Update profile")
  @Put(ROUTE_PATHS.COMPANY.UPDATE)
  public async Update(@Path() id: string, @Body() update: companyupdateschema):Promise<any> {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.update({ id, update });
      if(!result){
        this.setStatus(404);
        return {message:"Profile not found"}
      }
      return result;
    } catch (error:any) {
      // throw error;
      this.setStatus(500); // Set HTTP status code to 500 for server errors
      return { message: error.message || "Internal Server Error" };
    }
  }

  @SuccessResponse(StatusCode.NoContent,"Successfully Delete  profile")
  @Delete(ROUTE_PATHS.COMPANY.DELETE)
  public async Delete(@Path() id: string): Promise<any> {
    try {
      const companyservice = new CompanyService();
      const deleterequest = await companyservice.Delete({id})
     if(deleterequest){
      return deleterequest;
     }else{
      return {message:"profile not found"}
     }
    } catch (error: any) {
      throw {
        status: StatusCode.NoContent,
        message: "Can not delete that company ",
        detail: error.message,
      };
    }
  }
}

// export default CompanyController;
