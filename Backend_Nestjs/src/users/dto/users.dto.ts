import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UsersDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  offset: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
}
