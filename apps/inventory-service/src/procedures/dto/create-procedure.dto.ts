import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateProcedureDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  cost: number;

  @IsString()
  frequency: string;

  @IsBoolean()
  requiresspecialist: boolean;
}
