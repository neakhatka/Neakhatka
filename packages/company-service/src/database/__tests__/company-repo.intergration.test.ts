import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import CompanyRepo from "../repository/company.repository";
import DuplitcateError from "../../error/duplicate-error";
import { CompanyModel } from "../model/company.repository.model";
// import APIError from "../../error/api-error";
// import { companyupdateschema } from "../repository/@types/company.repo.type";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri(); // Using getUri for the latest version
  await mongoose.connect(mongoURL);
}, 1000000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Company repositorty intergrate test", () => {
  let companyrepo: CompanyRepo;
  beforeEach(() => {
    companyrepo = new CompanyRepo();
  });
  describe("Create company profile", () => {
    test("should be add new company profile to database!", async () => {
      const MOCK_DATA = {
        companyName: "name_test",
        contactEmail: "test@gmail.com",
      };

      const newcompany = await companyrepo.Create(MOCK_DATA);
      expect(newcompany).toBeDefined();
      expect(newcompany.companyName).toEqual(MOCK_DATA.companyName);
      expect(newcompany.contactEmail).toEqual(MOCK_DATA.contactEmail);
      // check if comopany profile have in database
      const foundcompany = await companyrepo.Find_By_id({
        id: newcompany._id as string,
      });
      expect(foundcompany).toBeDefined();
      expect(foundcompany?.companyName).toEqual(MOCK_DATA.companyName);
    });

    test("should be throw Duplicate error if email have used", async () => {
      const MOCK_DATA = {
        companyName: "name_test",
        contactEmail: "test@gmail.com",
      };
      await expect(companyrepo.Create(MOCK_DATA)).rejects.toThrow(
        DuplitcateError
      );
      // Test for APIError
    });
    
    test("should throw APIerror when create failse", async () => {
      const save = jest.spyOn(CompanyModel.prototype, "save");
      save.mockRejectedValue(new DuplitcateError("Data base error"));

      const MOCK_DATA = {
        companyName: "name_test",
        contactEmail: "test@gmail.com",
      };

      await expect(companyrepo.Create(MOCK_DATA)).rejects.toThrow(
        DuplitcateError
      );
    });

    // test("Should be update company profile from database", async () => {
    //     const MOCK_DATA = new CompanyModel({
    //       companyName: "name_test",
    //       contactEmail: "test@gmail.com",
    //     });
    //     const savedata = await MOCK_DATA.save();
    //     const update: companyupdateschema = {
    //       companyName: "company name test",
    //     };
    //     const updatecompany = await companyrepo.Update({
    //       id:savedata._id as string,
    //       update
    //     })
    //     expect(updatecompany).toBeTruthy();
    //     expect(updatecompany.companyName).toBe(update.companyName);

    //   });

    //   test("Should throw error if update data fail",async()=>{
    //     const nonexsitedID = new mongoose.Types.ObjectId().toString();
    //     const update: companyupdateschema = {
    //         companyName: 'Updated Company Name',
    //       };

    //       // Perform the update and expect an error
    //       await expect(
    //         companyrepo.Update({
    //           id: nonexsitedID,
    //           update,
    //         })
    //       ).rejects.toThrow(APIError);
    //     });
  });
});
