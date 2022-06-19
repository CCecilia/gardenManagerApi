import { Schema, model } from 'mongoose';

interface IPlantStage {
  name: string;
  cycleNumber: number;
}

export interface IPlant {
  germinationDate: Date;
  dateCreated: Date;
  growth: [number];
  height: number;
  nutrientMix: {
    name: string;
    amount: number;
  };
  location: {
    area: string;
    column: number;
    row: number;
  };
  stages: IPlantStage[];
  currentStage: IPlantStage;
  numberOfLeaves: number;
  hoursOfLight: number;
  notes: string[];
  harvested: boolean;
  commonName: string;
  genus: string;
  species: string;
  variety: string;
  numberOfLumensExposure: number;
  dailyWaterUsage: number;
}

const PlantStage = new Schema<IPlantStage>({
  name: { type: String, required: true },
  cycleNumber: { type: Number, required: true },
});

export const PlantSchema = new Schema<IPlant>({
  germinationDate: { type: Date },
  dateCreated: { type: Date, default: new Date() },
  location: {
    area: { type: String },
    column: { type: Number },
    row: { type: Number },
  },
  growth: { type: [Number], default: [0] },
  height: { type: Number, default: 0 },
  nutrientMix: {
    name: { type: String },
    amount: { type: Number },
  },
  currentStage: {
    type: PlantStage,
    default: {
      name: 'sprouting',
      cycleNumber: 0,
    },
  },
  numberOfLeaves: { type: Number, default: 0 },
  hoursOfLight: { type: Number, default: 0 },
  numberOfLumensExposure: { type: Number, default: 0 },
  stages: {
    type: [PlantStage],
    default: [
      {
        name: 'sprouting',
        cycleNumber: 0,
      },
      {
        name: 'seedling',
        cycleNumber: 1,
      },
      {
        name: 'vegetative',
        cycleNumber: 2,
      },
      {
        name: 'budding',
        cycleNumber: 3,
      },
      {
        name: 'flowering',
        cycleNumber: 4,
      },
      {
        name: 'ripening',
        cycleNumber: 4,
      },
    ],
  },
  notes: { type: [String] },
  harvested: { type: Boolean, default: false },
  commonName: { type: String, required: true },
  genus: { type: String, required: true },
  species: { type: String, required: true },
  variety: { type: String },
});

export const Plant = model<IPlant>('Plant', PlantSchema);
