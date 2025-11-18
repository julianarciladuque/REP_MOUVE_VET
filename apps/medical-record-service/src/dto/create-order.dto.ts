import { IsString, IsIn, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsNumber()
  itemNumber: number;

  @IsString()
  itemId: string;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  orderNumber: string; // hasta 6 dígitos según tu spec (valida longitud)

  @IsString()
  patientCedula: string;

  @IsString()
  doctorCedula: string;

  @IsIn(['MEDICATION','PROCEDURE','DIAGNOSTIC'])
  type: 'MEDICATION'|'PROCEDURE'|'DIAGNOSTIC';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
