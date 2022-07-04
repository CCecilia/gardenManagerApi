import { model, Schema } from "mongoose";

export interface IApplication {
  dateCreated: Date;
  amountUsedMls: number;
}

const Application = new Schema<IApplication>({
  dateCreated: { type: Date, default: new Date() },
  amountUsedMls: {type: Number, default: 0},
});

export interface INutrientBatch {
  totalWaterGallons: number;
  dateCreated: Date;
  totalFloraMicroMls: number;
  totalFloraBloomMls: number;
  totalFloraGroMls: number;
  phDownMls: number;
  phUpMls: number;
  startingPh: number;
  endingPh: number;
  applications: IApplication[]
};

export const NutrientBatchSchema = new Schema<INutrientBatch>({
  totalWaterGallons: {type: Number, default: 0},
  dateCreated: { type: Date, default: new Date() },
  totalFloraMicroMls: {type: Number, default: 0},
  totalFloraBloomMls: {type: Number, default: 0},
  totalFloraGroMls: {type: Number, default: 0},
  phDownMls: {type: Number, default: 0},
  phUpMls: {type: Number, default: 0},
  startingPh: {type: Number, default: 0},
  endingPh: { type: Number, default: 0 },
  applications: { type: [Application] },
});

export const NutrientBatch = model<INutrientBatch>('NutrientBatch', NutrientBatchSchema);