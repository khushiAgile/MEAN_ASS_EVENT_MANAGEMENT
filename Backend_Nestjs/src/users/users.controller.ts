import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/common/guards/admin.guard";
import { RESPONSE_SUCCESS } from "../common/constants/response.constant";
import { ResponseMessage } from "../common/decorators/response.decorator";
import { UsersDto } from "./dto/users.dto";
import { UsersService } from "./users.service";
import { USER_DESCRIPTION } from "src/common/constants/api.descriptions";

@Controller("users")
@ApiTags("User Management")
@ApiBearerAuth()
@UseGuards(AdminGuard) // Only admin can list users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all user
  @Post("list")
  @ResponseMessage(RESPONSE_SUCCESS.USER_LISTED)
  @ApiOperation(USER_DESCRIPTION.LIST_USER)
  listUsers(@Body() listUsersDto: UsersDto) {
    return this.usersService.listUser(listUsersDto);
  }

  // Get user detail
  @Get("/:id")
  @ResponseMessage(RESPONSE_SUCCESS.USER_DETAILS)
  @ApiOperation(USER_DESCRIPTION.USER_DETAIL)
  findOne(@Param("id") id: string) {
    return this.usersService.userDetail(id);
  }

  // Delete user
  @Delete("/:id")
  @ResponseMessage(RESPONSE_SUCCESS.USER_DELETED)
  @ApiOperation(USER_DESCRIPTION.DELETE_USER)
  removeUser(@Param("id") id: string) {
    return this.usersService.removeUser(id);
  }

  // Update user status
  @Get("status/:id")
  @ResponseMessage(RESPONSE_SUCCESS.USER_STATUS)
  @ApiOperation(USER_DESCRIPTION.USER_STATUS)
  userStatus(@Param("id") id: string) {
    return this.usersService.updateUserStatus(id);
  }
}
