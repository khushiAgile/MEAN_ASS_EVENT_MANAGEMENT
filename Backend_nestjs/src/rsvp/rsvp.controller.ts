import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "src/common/guards/user.guard";
import { RsvpDto, RsvpListDto } from "./dto/rsvp.dto";
import { RsvpService } from "./rsvp.service";
import { ResponseMessage } from "src/common/decorators/response.decorator";
import { RESPONSE_SUCCESS } from "src/common/constants/response.constant";
import { PaginationDto } from "src/common/dto/index.dto";
import { AdminGuard } from "src/common/guards/admin.guard";
import { RSVP_DESCRIPTION } from "src/common/constants/api.descriptions";

@Controller("rsvp")
@ApiTags("RSVP Management")
@ApiBearerAuth()
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  // Create rsvp
  @Post()
  @UseGuards(UserGuard) // Only user can create rsvp
  @ResponseMessage(RESPONSE_SUCCESS.RSVP_CREATED)
  @ApiOperation(RSVP_DESCRIPTION.CREATE_RSVP)
  createRsvp(@Body() params: RsvpDto, @Req() req) {
    return this.rsvpService.createRsvp(params, req);
  }

  // Get all rsvp
  @Post("events")
  @UseGuards(UserGuard) // Only user can list rsvp
  @ResponseMessage(RESPONSE_SUCCESS.RSVP_LISTED)
  @ApiOperation(RSVP_DESCRIPTION.LIST_RSVP)
  listRsvp(@Body() rsvpListDto: PaginationDto, @Req() req) {
    return this.rsvpService.listRsvp(rsvpListDto, req);
  }

  // Get all event rsvp
  @Post("users")
  @UseGuards(AdminGuard) // Only admin can list event rsvp
  @ResponseMessage(RESPONSE_SUCCESS.RSVP_LISTED)
  @ApiOperation(RSVP_DESCRIPTION.EVENT_RSVP)
  listEventRsvp(@Body() rsvpListDto: RsvpListDto) {
    return this.rsvpService.listRsvpByEvent(rsvpListDto);
  }
}
