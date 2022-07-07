import { Schema, model } from 'mongoose';

export interface IPlantStage {
  name: string;
  cycleNumber: number;
}

interface IGrowthLog {
  img: string;
  dateCreated: Date;
  numbersOfLeaves: number;
  heightInches: number;
  currentStage: IPlantStage;
}

export interface IPlant {
  germinationDate: Date;
  dateCreated: Date;
  location: {
    area: string;
    column: number;
    row: number;
  };
  stages: IPlantStage[];
  currentStage: IPlantStage;
  hoursOfLight: number;
  notes: string[];
  harvested: boolean;
  commonName: string;
  genus: string;
  species: string;
  variety: string;
  numberOfLumensExposure: number;
  dailyWaterUsage: number;
  growthLogs: IGrowthLog[];
}

const PlantStage = new Schema<IPlantStage>({
  name: { type: String, required: true },
  cycleNumber: { type: Number, required: true },
});

const GrowthLog = new Schema<IGrowthLog>({
  img: { type: String },
  dateCreated: { type: Date, default: new Date() },
  numbersOfLeaves: { type: Number, default: 0 },
  heightInches: { type: Number, default: 0 },
  currentStage: { type: PlantStage }
});

export const PlantSchema = new Schema<IPlant>({
  germinationDate: { type: Date },
  dateCreated: { type: Date, default: new Date() },
  location: {
    area: { type: String },
    column: { type: Number },
    row: { type: Number },
  },
  currentStage: {
    type: PlantStage,
    default: {
      name: 'sprouting',
      cycleNumber: 0,
    },
  },
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
  growthLogs: { type: [GrowthLog] }
});

export const Plant = model<IPlant>('Plant', PlantSchema);