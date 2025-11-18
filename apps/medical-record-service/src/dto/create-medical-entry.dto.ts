import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

// ------------------------------------
// MEDICAMENTOS
// ------------------------------------
export class MedicamentoDto {
  @IsInt()
  numeroitem: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  dosis: string;

  @IsString()
  @IsNotEmpty()
  duracion: string;

  @IsInt()
  costo: number;
}

export class ProcedimientoDto {
  @IsInt()
  numeroitem: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  frecuencia: string;

  @IsInt()
  costo: number;

  @IsBoolean()
  requiereEspecialista: boolean;

  @IsOptional()
  @IsInt()
  idEspecialista?: number;
}
export class AyudaDiagnosticaDto {
  @IsInt()
  numeroitem: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  cantidad: number;

  @IsInt()
  costo: number;

  @IsBoolean()
  requiereespecialista: boolean;

  @IsOptional()
  @IsInt()
  idespecialista?: number;
}

export class CreateMedicalEntryDto {
  @IsDateString()
  fechaatencion: string;

  @IsString()
  @MaxLength(10)
  cedulaMedico: string;

  @IsString()
  @IsNotEmpty()
  motivoconsulta: string;

  @IsString()
  @IsNotEmpty()
  sintomatologia: string;

  @IsOptional()
  @IsString()
  diagnostico?: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicamentoDto)
  medicamentos?: MedicamentoDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProcedimientoDto)
  procedimientos?: ProcedimientoDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AyudaDiagnosticaDto)
  ayudasdiagnosticas?: AyudaDiagnosticaDto[];
}
