import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEmergencyContactDto } from './create-emergency-contact.dto';
import { CreateInsuranceDto } from './create-insurance.dto';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  identificationnumber: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @IsString()
  gender: string;

  @IsString()
  @Length(1, 30)
  address: string;

  @Matches(/^[0-9]{10}$/)
  phonenumber: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @ValidateNested()
  @Type(() => CreateEmergencyContactDto)
  emergencycontact: CreateEmergencyContactDto;

  @ValidateNested()
  @Type(() => CreateInsuranceDto)
  insurance: CreateInsuranceDto;
}
