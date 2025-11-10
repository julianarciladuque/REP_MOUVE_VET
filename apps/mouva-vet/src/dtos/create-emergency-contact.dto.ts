import { IsNotEmpty, IsString, Matches, Length } from 'class-validator';

export class CreateEmergencyContactDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  relationship: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: 'El número de teléfono debe tener exactamente 10 dígitos',
  })
  phonenumber: string;
}
