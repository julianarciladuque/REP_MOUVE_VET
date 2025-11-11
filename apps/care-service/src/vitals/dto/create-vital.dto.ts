import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, Max } from 'class-validator';

export class CreateVitalDto {
  @ApiProperty({
    example: 101,
    description: 'ID del paciente al que pertenecen los signos vitales',
  })
  @IsNotEmpty()
  @IsNumber()
  patientid: number;

  @ApiProperty({
    example: 202,
    description: 'ID de la enfermera que registra los signos vitales',
  })
  @IsNotEmpty()
  @IsNumber()
  nurseid: number;

  @ApiProperty({
    example: '120/80',
    description: 'Presión arterial en formato sistólica/diastólica',
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  bloodpressure: string;

  @ApiProperty({
    example: 36.7,
    description: 'Temperatura corporal en grados Celsius',
    minimum: 30,
    maximum: 45,
  })
  @IsNumber()
  @Min(30)
  @Max(45)
  temperature: number;

  @ApiProperty({
    example: 75,
    description: 'Frecuencia cardíaca (pulso) en latidos por minuto',
    minimum: 30,
    maximum: 200,
  })
  @IsNumber()
  @Min(30)
  @Max(200)
  pulse: number;

  @ApiProperty({
    example: 98,
    description: 'Nivel de oxígeno en sangre (SpO2) en porcentaje',
    minimum: 50,
    maximum: 100,
  })
  @IsNumber()
  @Min(50)
  @Max(100)
  oxygenlevel: number;
}
