import { Schema, Document } from 'mongoose';

export const OfficeSchema = new Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: false },
  lng: { type: Number, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
});

export interface Office extends Document {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  country: string;
}
