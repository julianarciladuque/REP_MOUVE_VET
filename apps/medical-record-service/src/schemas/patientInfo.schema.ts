import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PatientInfo extends Document {
  @Prop()
  name: string;

  @Prop()
  age: string;

  @Prop()
  type: string;
}

export const PatientInfoSchema = SchemaFactory.createForClass(PatientInfo);
