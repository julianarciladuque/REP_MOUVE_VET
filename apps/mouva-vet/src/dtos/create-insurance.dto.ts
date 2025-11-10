import { IsNotEmpty, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateInsuranceDto {
  @IsNotEmpty()
  @IsString()
  companyname: string;

  @IsNotEmpty()
  @IsString()
  policynumber: string;

  @IsBoolean()
  isactive: boolean;

  @IsDateString({}, { message: 'La fecha debe tener formato válido (YYYY-MM-DD)' })
  expirationdate: string;
}
