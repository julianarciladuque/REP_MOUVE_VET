import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'nurse',
    description: 'Nombre del rol asignado al empleado',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}
