"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userProfileRepo_1 = __importDefault(require("../../database/repository/userRepository/userProfileRepo"));
const duplitcate_error_1 = __importDefault(require("../../error/duplitcate-error"));
const api_error_1 = __importDefault(require("../../error/api-error"));
const logger_1 = require("../../utils/logger");
class UserService {
    constructor() {
        this.userRepo = new userProfileRepo_1.default();
    }
    createuser(UserDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield this.userRepo.createuser(UserDetail);
                return User;
            }
            catch (error) {
                console.log(error);
                if (error instanceof duplitcate_error_1.default) {
                    throw new Error("Unable to create user");
                }
            }
        });
    }
    GetAllProfileservice() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepo.GetAllUserRepo();
            }
            catch (error) {
                throw new api_error_1.default("Unable to get user");
            }
        });
    }
    GetByIdService(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                return yield this.userRepo.findById({ id });
            }
            catch (error) {
                console.log(error);
                // return null;
                throw new api_error_1.default("Unable to get user with this ID");
            }
        });
    }
    FindByAuthId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId }) {
            try {
                return yield this.userRepo.FindByAuthID({ userId });
            }
            catch (error) {
                console.log(error);
                // return null;
                throw new api_error_1.default("Unable to get user with this ID");
            }
        });
    }
    // update user
    UpdateProfileService(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, update, }) {
            try {
                return yield this.userRepo.UpdateProfile({ id, update });
            }
            catch (error) {
                // throw error;
                throw new api_error_1.default("Unable to update User profile!");
            }
        });
    }
    // delete user
    DeleteProfileService(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                return yield this.userRepo.deleteUser({ id });
            }
            catch (error) {
                // throw error;
                logger_1.logger.error(`UserProfileService DeleteProfileService() method error: ${error}`);
                throw new api_error_1.default("Unable to delete User profile");
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userProfileService.js.map