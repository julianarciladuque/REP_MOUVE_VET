import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, Max } from 'class-validator';

export class CreateVitalDto {
  @IsNotEmpty()
  @IsNumber()
  patientid: number;

  @IsNotEmpty()
  @IsNumber()
  nurseid: number;

  @IsString()
  @MaxLength(20)
  bloodpressure: string;

  @IsNumber()
  @Min(30)
  @Max(45)
  temperature: number;

  @IsNumber()
  @Min(30)
  @Max(200)
  pulse: number;

  @IsNumber()
  @Min(50)
  @Max(100)
  oxygenlevel: number;
}
