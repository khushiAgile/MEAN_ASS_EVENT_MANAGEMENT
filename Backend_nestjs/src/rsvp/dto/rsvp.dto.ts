import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PaginationDto } from "src/common/dto/index.dto";

export class RsvpDto {
  @ApiProperty()
  @IsNotEmpty()
  eventId: string;
}

export class RsvpListDto extends PaginationDto {
  @ApiProperty()
  @IsNotEmpty()
  eventId: string;
}
