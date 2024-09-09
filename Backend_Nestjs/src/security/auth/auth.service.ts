import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { AuthExceptions, CustomError } from "src/common/helpers/exceptions";
import { JwtPayload } from "../../common/interfaces/jwt.interface";
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "./dto/auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "../../common/schemas/user.schema";
import { Role } from "src/common/constants/enum.constant";
import { defaultAdmin } from "src/common/constants/seederData";
import { EmailService } from "src/common/services/email.service";
import { UsersExceptions } from "src/common/helpers/exceptions/user.exception";

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private jwtService: JwtService,
    @InjectModel(Users.name) private userModel: Model<UsersDocument>
  ) {}

  // Get user by email
  async getUserByEmail(email: string) {
    return await this.userModel.findOne({
      email: email,
    },"+password");
  }

  //  Login for admin and user
  async login(params: LoginDto) {
    try {
      // Get user
      const user = await this.getUserByEmail(params.email);

      // Check account exist
      if (!user) {
        throw AuthExceptions.AccountNotExist();
      }

      // Check account is active
      if (!user.isActive) {
        throw AuthExceptions.AccountNotActive();
      }

      // Check password
      if (!bcrypt.compareSync(params.password, user.password)) {
        throw AuthExceptions.InvalidPassword();
      }

      // Generate access token
      const accessToken = await this.generateAuthToken(user);

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
      };
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Register for admin and user
  async register(params: RegisterDto) {
    try {
      // get user
      const user = await this.getUserByEmail(params.email);

      // Check account exist
      if (!user) {
        const createUser = {
          name: params.name,
          role: Role.USER,
          email: params.email,
          password: "",
        };

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(params.password, salt);

        createUser.password = hash;

        await this.userModel.create(createUser);
        return {};
      } else {
        throw AuthExceptions.AccountAlreadyExist();
      }
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Seed admin user
  async seedAdmin() {
    try {
      const isAdminExists = await this.getUserByEmail(defaultAdmin.email);
      if (isAdminExists) {
        return;
      }

      const adminObj = defaultAdmin;

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminObj.password, salt);

      adminObj.password = hash;

      await this.userModel.create(adminObj);

      return {};
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Generate access token
  async generateAuthToken(user) {
    const payload: JwtPayload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  // Forgot password
  async forgotPassword(params: ForgotPasswordDto) {
    try {
      const user = await this.getUserByEmail(params.email);
      // Check account exist
      if (!user) {
        throw AuthExceptions.AccountNotExist();
      }
      // Check account is deleted
      if (user.isDeleted) {
        throw UsersExceptions.UserDeleted();
      }
      // Check account is deactivated
      if (!user.isActive) {
        throw UsersExceptions.UserNotActive();
      }
      const frontUrl = process.env.FRONT_ADMIN_URL;
      user.resetPasswordToken = await this.generateAuthToken(user);

      this.emailService.forgotPasswordMail(
        user.email,
        "Forgot Password",
        user.resetPasswordToken,
        frontUrl
      );

      await user.save();

      return {};
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Reset password
  async resetPassword(params: ResetPasswordDto) {
    try {
      const user = await this.userModel.findOne({
        resetPasswordToken: params.token,
      });
      // Check account exist
      if (!user) {
        throw AuthExceptions.AccountNotExist();
      }
      // Check account is deleted
      if (user.isDeleted) {
        throw AuthExceptions.AccountNotExist();
      }
      // Check account is deactivated
      if (!user.isActive) {
        throw AuthExceptions.AccountNotActive();
      }

      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(params.password, salt);

      user.password = hash;
      user.resetPasswordToken = null;
      await user.save();

      return {};
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }
}
