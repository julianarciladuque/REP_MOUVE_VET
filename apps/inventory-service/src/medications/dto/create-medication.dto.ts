import { IsNotEmpty, IsNumber, IsString, Min, MaxLength } from 'class-validator';

export class CreateMedicationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  cost: number;

  @IsString()
  @MaxLength(50)
  standarddose: string;
}
