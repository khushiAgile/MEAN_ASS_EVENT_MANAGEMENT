import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./auth.decorator";
import { ResponseMessage } from "../../common/decorators/response.decorator";
import { RESPONSE_SUCCESS } from "../../common/constants/response.constant";
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "./dto/auth.dto";
import { AUTH_DESCRIPTION } from "src/common/constants/api.descriptions";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // login api
  @Public() // public route
  @ResponseMessage(RESPONSE_SUCCESS.USER_LOGIN)
  @ApiOperation(AUTH_DESCRIPTION.LOGIN)
  @Post("/login")
  async login(@Body() params: LoginDto) {
    return await this.authService.login(params);
  }

  // register api
  @Public() // public route
  @ResponseMessage(RESPONSE_SUCCESS.USER_REGISTER)
  @ApiOperation(AUTH_DESCRIPTION.REGISTER)
  @Post("/register")
  async register(@Body() params: RegisterDto) {
    return await this.authService.register(params);
  }

  // forgot password api
  @Post("/forgot-password")
  @Public() // public route
  @ResponseMessage(RESPONSE_SUCCESS.FORGOT_PASSWORD)
  @ApiOperation(AUTH_DESCRIPTION.FORGOT_PASSWORD)
  async forgotPassword(@Body() params: ForgotPasswordDto) {
    return await this.authService.forgotPassword(params);
  }

  // reset password api
  @Post("/reset-password")
  @Public() // public route
  @ResponseMessage(RESPONSE_SUCCESS.PASSWORD_CHANGED)
  @ApiOperation(AUTH_DESCRIPTION.RESET_PASSWORD)
  async resetPassword(@Body() params: ResetPasswordDto) {
    return await this.authService.resetPassword(params);
  }
}
