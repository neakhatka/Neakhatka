import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import CompanyRepo from "../repository/company.repository";
import DuplicateError from "../../error/duplicate-error";
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
      const foundcompany = await companyrepo.FindById({
        id: newcompany._id.toString(),
      });
      expect(foundcompany).toBeDefined();
      expect(foundcompany?.companyName).toEqual(MOCK_DATA.companyName);
    });

    test("should throw DuplicateError if email has been used", async () => {
      const MOCK_DATA = {
        companyName: "name_test",
        contactEmail: "test@gmail.com",
      };

      // await companyrepo.Create(MOCK_DATA);
      jest.spyOn(companyrepo, "Find_Email").mockResolvedValue({});
      await expect(companyrepo.Create(MOCK_DATA)).rejects.toThrow(
        DuplicateError
      );
    });
    test("should update existed company ", async () => {
      const MOCK_DATA = {
        companyName: "name_test",
        contactEmail: "test@gmail.com",
      };

      const newcompany = await companyrepo.Create(MOCK_DATA);
      const UPDATE_DATE = {
        companyName: "updated_name",
        contactEmail: "test@gmail.com",
      };

      await expect(companyrepo.Update({
        id: newcompany._id.toString(),
        update: UPDATE_DATE
      })).resolves.not.toThrow();

      const updatedata = await companyrepo.FindById(newcompany.id.toString());
      expect(updatedata).toBeDefined();
      expect(updatedata?.companyName).toEqual(UPDATE_DATE.companyName)
      expect(updatedata?.contactEmail).toEqual(UPDATE_DATE.contactEmail)
    });
  });
});
