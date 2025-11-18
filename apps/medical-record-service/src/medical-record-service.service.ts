import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientInfo } from './schemas/patientInfo.schema';
import { Order } from './entity/order.entityt';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Medication } from 'apps/inventory-service/src/medications/medication.entity';
import { CreateMedicalEntryDto } from './dto/create-medical-entry.dto';
import { Procedure } from 'apps/inventory-service/src/procedures/procedure.entity';
import { Diagnostic } from 'apps/inventory-service/src/diagnostics/diagnostics.entity';
import { InventoryClient } from './inventory/inventory.client';
import { PatientClient } from './clients/patient-client';
import { OrderItem } from './entity/order-item.entity';

@Injectable()
export class MedicalRecordServiceService {
  constructor(@InjectModel(PatientInfo.name) private patientInfo: Model<PatientInfo>,
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    private connection: Connection,
    private readonly inventoryClient: InventoryClient,
    private readonly patientClient: PatientClient) { }

  async getPatients(token: string) {
    return this.patientClient.getPatients(token);
  }

  async getPatientByCedula(cedula: string, token: string) {
    return this.patientClient.getPatientByCedula(cedula, token);
  }

  async getPatientById(id: string, token: string) {
    return this.patientClient.getPatientById(id, token);
  }


  async createOrder(createOrderDto: CreateOrderDto, token: string) {
    const existing = await this.ordersRepo.findOne({ where: { orderNumber: createOrderDto.orderNumber } });
    if (existing) throw new BadRequestException('Order number already exists');

    const medsInv = await this.inventoryClient.getMedicamentos(token);
    const procsInv = await this.inventoryClient.getProcedimientos(token);
    const diagInv = await this.inventoryClient.getAyudasDiagnosticas(token);

    console.log('Medicamentos disponibles:', medsInv);
    console.log('Procedimientos disponibles:', procsInv);
    console.log('Ayudas diagnósticas:', diagInv);

    if (createOrderDto.type === 'MEDICATION') {
      createOrderDto.items.forEach(item => {
        const exists = medsInv.find(m => m.id === Number(item.itemId));
        if (!exists) {
          throw new BadRequestException(`Medicamento inválido: ${item.itemId}`);
        }
      });
    }   

    if (createOrderDto.type === 'PROCEDURE') {
      createOrderDto.items.forEach(item => {
        if (!procsInv.find(p => p.id === Number(item.itemId))) {
          throw new BadRequestException(`Procedimiento inválido: ${item.itemId}`);
        }
      });
    }

    if (createOrderDto.type === 'DIAGNOSTIC') {
      createOrderDto.items.forEach(item => {
        if (!diagInv.find(a => a.id === Number(item.itemId))) {
          throw new BadRequestException(`Ayuda diagnóstica inválida: ${item.itemId}`);
        }
      });
    }

    await this.connection.transaction(async manager => {
      const order = manager.create(Order, {
        orderNumber: createOrderDto.orderNumber,
        patientCedula: createOrderDto.patientCedula,
        doctorCedula: createOrderDto.doctorCedula,
        type: createOrderDto.type
      });
      await manager.save(order);

      let itemNum = 1;

      for (const item of createOrderDto.items) {
        const orderItem = manager.create(OrderItem, {
          order: order,
          itemNumber: itemNum++,
          type: createOrderDto.type,
          itemId: item.itemId,
          description: item.itemId,
        });

        await manager.save(orderItem);
      }

    });

    const fechaNow = new Date().toISOString();
    const patient = await this.patientInfo.findOne({ cedula: createOrderDto.patientCedula }).exec();

    const entry = {
      orderNumber: createOrderDto.orderNumber,
      type: createOrderDto.type,
      items: createOrderDto.items,
      createdAt: new Date()
    };

    if (!patient) {
      await this.patientInfo.create({
        cedula: createOrderDto.patientCedula,
        records: { [fechaNow]: entry }
      });
    } else {
      patient.records.set(fechaNow, entry);
      await patient.save();
    }

    return { ok: true, orderNumber: createOrderDto.orderNumber };
  }


  async addMedicalEntry(cedula: string, dto: CreateMedicalEntryDto, token: string) {

    const hasDiagnostic = Array.isArray(dto.ayudasdiagnosticas) && dto.ayudasdiagnosticas.length > 0;
    const hasMedication = Array.isArray(dto.medicamentos) && dto.medicamentos.length > 0;
    const hasProcedure = Array.isArray(dto.procedimientos) && dto.procedimientos.length > 0;
    
  
    if (hasDiagnostic && (hasMedication || hasProcedure)) {
      throw new BadRequestException('No se pueden recetar medicamentos o procedimientos al mismo tiempo que una ayuda diagnóstica.');
    }
  
    const patientPostgres = await this.patientClient.getPatientByCedula(cedula, token);
    console.log("patientPostgres",patientPostgres);
  
    // Buscar en Mongo
    let patientMongo = await this.patientInfo.findOne({ cedula });
    if(patientMongo)
      { 
        await this.patientInfo.deleteOne({ cedula });
        patientMongo = null;
        await this.patientInfo.create({
          cedula,
          records: new Map([[dto.fechaatencion, dto]])
        });
    
        return { ok: true, created: true };
      }
  
    if (!patientMongo) {
      await this.patientInfo.create({
        cedula,
        records: new Map([[dto.fechaatencion, dto]])
      });
  
      return { ok: true, created: true };
    }
  
    return { ok: true, updated: true };
  }
  
}
