import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'Juliana Restrepo',
    description: 'Nombre completo del empleado',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 123456789,
    description: 'Número de identificación del empleado',
  })
  @IsNotEmpty()
  @IsNumber()
  identificationnumber: number;

  @ApiProperty({
    example: 'juliana.restrepo@example.com',
    description: 'Correo electrónico institucional o personal',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '3004567890',
    description: 'Número de celular de contacto',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  cellphone: string;

  @ApiProperty({
    example: '1992-07-15',
    description: 'Fecha de nacimiento del empleado (formato YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty({
    example: 'Calle 45 #67-12, Medellín',
    description: 'Dirección de residencia del empleado',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: 2,
    description: 'ID del rol asignado al empleado (FK hacia la tabla role)',
  })
  @IsNotEmpty()
  @IsNumber()
  role_id: number;

  @ApiProperty({
    example: 'jrestrepo',
    description: 'Nombre de usuario para inicio de sesión',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario (se debe encriptar antes de guardar)',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
