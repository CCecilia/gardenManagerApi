import { Schema, model } from 'mongoose';

export interface ICrop {}

export const CropSchema = new Schema<ICrop>({
  dateCreated: { type: Date, default: new Date() },
  name: { type: String, default: 'Crop' },
  plants: { type: [Schema.Types.ObjectId], ref: 'Plant', required: true },
});

export const Crop = model<ICrop>('Crop', CropSchema);
