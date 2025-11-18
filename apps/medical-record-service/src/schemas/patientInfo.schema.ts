import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientInfoDocument = PatientInfo & Document;

@Schema({ collection: 'patient_infos', timestamps: true })
export class PatientInfo {
  @Prop({ required: true, unique: true })
  cedula: string;

  @Prop({ type: Map, of: Object, default: {} })
  records: Map<string, any>;
}

export const PatientInfoSchema = SchemaFactory.createForClass(PatientInfo);

