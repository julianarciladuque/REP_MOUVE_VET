import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttentionDto {
  @ApiProperty({
    example: 101,
    description: 'ID del paciente al que pertenece la atención',
  })
  @IsNotEmpty()
  @IsNumber()
  patientid: number;

  @ApiProperty({
    example: 202,
    description: 'ID de la enfermera que realiza la atención',
  })
  @IsNotEmpty()
  @IsNumber()
  nurseid: number;

  @ApiProperty({
    example: 5001,
    description: 'ID de la orden médica asociada (medicamento o procedimiento)',
  })
  @IsNotEmpty()
  @IsNumber()
  orderid: number;

  @ApiProperty({
    example: 'Amoxicilina',
    description: 'Nombre del medicamento administrado',
    required: false,
  })
  @IsOptional()
  @IsString()
  medicationname?: string;

  @ApiProperty({
    example: 'Curación de herida',
    description: 'Nombre del procedimiento realizado',
    required: false,
  })
  @IsOptional()
  @IsString()
  procedurename?: string;

  @ApiProperty({
    example: '500 mg',
    description: 'Dosis aplicada del medicamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  dose?: string;

  @ApiProperty({
    example: 'Cada 8 horas',
    description: 'Frecuencia de administración',
    required: false,
  })
  @IsOptional()
  @IsString()
  frequency?: string;

  @ApiProperty({
    example: 'Paciente toleró bien el medicamento, sin reacciones adversas.',
    description: 'Notas adicionales sobre la atención',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
