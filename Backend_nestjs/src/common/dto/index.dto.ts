import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  offset: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit: number;
}
