import { Diagnostic } from 'apps/inventory-service/src/diagnostics/diagnostics.entity';
import { Medication } from 'apps/inventory-service/src/medications/medication.entity';
import { Procedure } from 'apps/inventory-service/src/procedures/procedure.entity';
import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

export type OrderType = 'MEDICATION' | 'PROCEDURE' | 'DIAGNOSTIC';

@Entity({ name: 'orders' })
export class Order {
    @PrimaryColumn({ type: 'varchar', length: 20 })
    orderNumber: string;

    @Column({ length: 20 })
    patientCedula: string;

    @Column({ length: 10 })
    doctorCedula: string;

    @Column({ type: 'varchar', length: 20 })
    type: OrderType;

    @CreateDateColumn()
    createdAt: Date;
    
    @OneToMany(() => OrderItem, item => item.order)
    items: OrderItem[];

}