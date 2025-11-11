import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttentionDto {
  @IsNotEmpty()
  @IsNumber()
  patientid: number;

  @IsNotEmpty()
  @IsNumber()
  nurseid: number;

  @IsNotEmpty()
  @IsNumber()
  orderid: number;

  @IsOptional()
  @IsString()
  medicationname?: string;

  @IsOptional()
  @IsString()
  procedurename?: string;

  @IsOptional()
  @IsString()
  dose?: string;

  @IsOptional()
  @IsString()
  frequency?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
