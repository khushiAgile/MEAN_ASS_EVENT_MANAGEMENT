import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { EVENT_DESCRIPTION } from "src/common/constants/api.descriptions";
import { AdminGuard } from "src/common/guards/admin.guard";
import { RESPONSE_SUCCESS } from "../common/constants/response.constant";
import { ResponseMessage } from "../common/decorators/response.decorator";
import { EventsDto, ListEventsDto, UpdateEventsDto } from "./dto/events.dto";
import { EventsService } from "./events.service";

@Controller("events")
@ApiTags("Events Management")
@ApiBearerAuth()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Create new events
  @UseGuards(AdminGuard) // Only admin can create events
  @Post()
  @ResponseMessage(RESPONSE_SUCCESS.EVENTS_CREATED)
  @ApiOperation(EVENT_DESCRIPTION.CREATE_EVENTS)
  createEvents(@Body() createEventsDto: EventsDto, @Req() req) {
    return this.eventsService.createEvents(createEventsDto, req);
  }

  // Get all events
  @Post("list")
  @ResponseMessage(RESPONSE_SUCCESS.EVENTS_LISTED)
  @ApiOperation(EVENT_DESCRIPTION.LIST_EVENTS)
  listEvents(@Body() listEventsDto: ListEventsDto, @Req() req) {
    return this.eventsService.listEvents(listEventsDto, req);
  }

  // Get event detail
  @Get("/:id")
  @ResponseMessage(RESPONSE_SUCCESS.EVENTS_DETAILS)
  @ApiOperation(EVENT_DESCRIPTION.DETAIL_EVENT)
  findOne(@Param("id") id: string, @Req() req) {
    return this.eventsService.eventDetail(id, req);
  }

  // Update events
  @UseGuards(AdminGuard) // Only admin can update events
  @Patch("/:id")
  @ResponseMessage(RESPONSE_SUCCESS.EVENTS_UPDATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation(EVENT_DESCRIPTION.UPDATE_EVENTS)
  updateEvent(@Param("id") id: string, @Body() updateUserDto: UpdateEventsDto) {
    return this.eventsService.updateEvent(id, updateUserDto);
  }

  // Delete events
  @UseGuards(AdminGuard) // Only admin can delete events
  @Delete("/:id")
  @ResponseMessage(RESPONSE_SUCCESS.EVENTS_DELETED)
  @ApiOperation(EVENT_DESCRIPTION.DELETE_EVENTS)
  removeEvent(@Param("id") id: string) {
    return this.eventsService.removeEvent(id);
  }
}
