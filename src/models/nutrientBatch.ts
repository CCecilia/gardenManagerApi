import { HydratedDocument, Model, model, Query, Schema } from "mongoose";

export interface IApplication {
  dateCreated: Date;
  amountUsedMls: number;
}

const ApplicationSchema = new Schema<IApplication>({
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
  applications: IApplication[];
};
type NutrientBatchModelType = Model<INutrientBatch, INutrientBatchQueryHelpers>;

type NutrientBatchModelQuery = Query<any, HydratedDocument<INutrientBatch>, INutrientBatchQueryHelpers> & INutrientBatchQueryHelpers;
interface INutrientBatchQueryHelpers {
  byApplicationId(this: NutrientBatchModelQuery, applicationId: string): NutrientBatchModelQuery;
}

export const NutrientBatchSchema = new Schema<INutrientBatch, NutrientBatchModelType, {}, INutrientBatchQueryHelpers>({
  totalWaterGallons: {type: Number, default: 0},
  dateCreated: { type: Date, default: new Date() },
  totalFloraMicroMls: {type: Number, default: 0},
  totalFloraBloomMls: {type: Number, default: 0},
  totalFloraGroMls: {type: Number, default: 0},
  phDownMls: {type: Number, default: 0},
  phUpMls: {type: Number, default: 0},
  startingPh: {type: Number, default: 0},
  endingPh: { type: Number, default: 0 },
  applications: { type: [ApplicationSchema] },
});

NutrientBatchSchema.set("toJSON", {virtuals: true})

NutrientBatchSchema.virtual("totalMlsCreated").
  get(function (): number {
    const convertGlsToMls = (amt: number) => Math.round(amt * 3785.41);
    return convertGlsToMls(this.totalWaterGallons) + this.totalFloraMicroMls + this.totalFloraBloomMls + this.totalFloraGroMls + this.phDownMls + this.phUpMls;
  });

NutrientBatchSchema.virtual("totalUsedMls").
  get(function (): number {
    let totalAmountUsedMls = 0;
    this.applications.forEach((application: IApplication) => {
      totalAmountUsedMls += application.amountUsedMls;
    });

    return totalAmountUsedMls;
  });

NutrientBatchSchema.virtual("totalMls").
  get(function (): number {
    const convertGlsToMls = (amt: number) => Math.round(amt * 3785.41);
    const totalCreated = convertGlsToMls(this.totalWaterGallons) + this.totalFloraMicroMls + this.totalFloraBloomMls + this.totalFloraGroMls + this.phDownMls + this.phUpMls;
    let totalAmountUsedMls = 0;
    this.applications.forEach((application: IApplication) => {
      totalAmountUsedMls += application.amountUsedMls;
    });

    return totalCreated - totalAmountUsedMls;
  });

NutrientBatchSchema.virtual("isEmpty").
  get(function (): boolean {
    const convertGlsToMls = (amt: number) => Math.round(amt * 3785.41);
    const totalCreated = convertGlsToMls(this.totalWaterGallons) + this.totalFloraMicroMls + this.totalFloraBloomMls + this.totalFloraGroMls + this.phDownMls + this.phUpMls;

    let totalAmountUsedMls = 0;
    this.applications.forEach((application: IApplication) => {
      totalAmountUsedMls += application.amountUsedMls;
    });

    return (totalCreated <= totalAmountUsedMls);
  });

NutrientBatchSchema.query.byApplicationId = function(applicationId) {
  return this.where({ 'applications._id': applicationId });
};

export const NutrientBatch = model<INutrientBatch, NutrientBatchModelType>('NutrientBatch', NutrientBatchSchema);
export const NutrientBatchApplication = model<IApplication>('Application', ApplicationSchema);