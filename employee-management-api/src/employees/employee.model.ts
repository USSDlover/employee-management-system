import { Schema, Document } from 'mongoose';

export const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  officeName: { type: String, required: false },
  birthDate: { type: Date, required: false },
  phoneNumber: { type: String, required: false },
  tags: { type: Array, required: false },
});

export interface Employee extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  officeName: string;
  birthDate: Date;
  phoneNumber: string;
  tags: Array<string>;
}
