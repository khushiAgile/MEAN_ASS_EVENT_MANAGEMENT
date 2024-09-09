import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { PaginationDto } from "src/common/dto/index.dto";

export class EventsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;
}

export class UpdateEventsDto extends EventsDto {}

export class ListEventsDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date: Date;
}
