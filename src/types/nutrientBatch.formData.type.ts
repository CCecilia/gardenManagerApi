import { IApplication } from "models/nutrientBatch";

export type NutrientBatchCreateFormData = {
  batch: number;
  totalWaterGallons: number;
  totalFloraMicroMls: number;
  totalFloraBloomMls: number;
  totalFloraGroMls: number;
  phDownMls: number;
  phUpMls: number;
  startingPh: number;
  endingPh: number;
  applications: IApplication[]
};