import { CompanyProfile } from "../model/company.repository.model";
import {
  // DeleteCompanyRequest,
  companycreateschema,
  companyupdateschema,
} from "./@types/company.repo.type";
import { StatusCode } from "../../util/consts/status.code";
import APIError from "../../controller/error/api-error";
import DuplicateError from "../../controller/error/duplicate-error";

class CompanyRepo {
  async Create(companydetail: companycreateschema) {
    try {
      const existedemail = await this.Find_Email({
        contactEmail: companydetail.contactemail,
      });
      if (existedemail) {
        throw new DuplicateError("This email has been used!");
      }
      const company = new CompanyProfile(companydetail);
      const result = await company.save();
      return result;
    } catch (error) {
      console.log("error", error);
      if (error instanceof DuplicateError) {
        throw error;
      }
      throw new Error("Database error");
    }
  }
  async GetAll(): Promise<any> {
    try {
      const allcompany = await CompanyProfile.find();
      if (!allcompany) {
        return { message: "can not user" };
      }
      return allcompany;
    } catch (error: any) {
      return {
        message: "An error occurred while fetching companies",
        error: error.message,
      };
    }
  }

  async Find_Email({ contactEmail }: { contactEmail: string }): Promise<any> {
    try {
      const existed = await CompanyProfile.findOne({
        contactEmail: contactEmail,
      });
      return existed;
    } catch (error) {
      throw new APIError("Unable to Find User in Database ");
    }
  }

  async FindByAuthID({userId }: { userId: string}): Promise<any> {
    try {
      const existed = await CompanyProfile.findOne({
        userId: userId,
      });
      return existed;
    } catch (error) {
      throw new APIError("Unable to Find User in Database ");
    }
  }

  async FindById({ id }: { id: string }) {
    try {
      const existed = await CompanyProfile.findById(id);
      return existed;
    } catch (error) {
      // console.log(error);
      throw new APIError("Unable To Find in Database");
    }
  }

  async Update({ id, update }: { id: string; update: companyupdateschema }) {
    try {
      const existed = await this.FindById({ id });
      if (!existed) {
        throw new APIError("User does not exist", StatusCode.NotFound);
      }
      const companyupdate = (await CompanyProfile.findByIdAndUpdate(
        id,
        { $set:  update },
        {
          new: true,
        }
      )) as companyupdateschema;
      return companyupdate;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError("Unble to Update User in Database");
    }
  }

  async Delete({ id }: { id: string }) {
    try {
      const existed = await this.FindById({ id });
      if (!existed) {
        throw new APIError("Unable to find in database", StatusCode.NoContent);
      }
      return await CompanyProfile.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
export default CompanyRepo;
