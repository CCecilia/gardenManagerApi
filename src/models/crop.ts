import { Schema, model } from 'mongoose';

export interface ICrop {
  dateCreated: Date;
  name: string;
  plants: Schema.Types.ObjectId[];
  nutrientBatches: Schema.Types.ObjectId[]
}

export const CropSchema = new Schema<ICrop>({
  dateCreated: { type: Date, default: new Date() },
  name: { type: String, default: 'Crop' },
  plants: { type: [Schema.Types.ObjectId], ref: 'Plant', required: true },
  nutrientBatches: { type: [Schema.Types.ObjectId], ref: 'NutrientBatch' }
});

export const Crop = model<ICrop>('Crop', CropSchema);
