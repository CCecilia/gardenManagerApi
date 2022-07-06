import { MongoServerError } from 'mongodb';
import { NutrientBatchCreateFormData } from 'types/nutrientBatch.formData.type';
import { TypedRequestBody, TypedRequestParams, TypedRequestQueryParams } from 'types/request.interface';
import { NutrientBatch, NutrientBatchApplication } from './../models/nutrientBatch';

export const create = async (req: TypedRequestBody<NutrientBatchCreateFormData>, res) => {
  const {
    totalWaterGallons,
    totalFloraMicroMls,
    totalFloraBloomMls,
    totalFloraGroMls,
    phDownMls,
    phUpMls,
    startingPh,
    endingPh,
    applications
  } = req.body;
  const newNutrientBatch = new NutrientBatch({
    totalWaterGallons,
    totalFloraMicroMls,
    totalFloraBloomMls,
    totalFloraGroMls,
    phDownMls,
    phUpMls,
    startingPh,
    endingPh,
    applications
  });

  await newNutrientBatch.save().catch((error: MongoServerError) => {
    return res.status(400).json({ message: error.errmsg });
  });

  return res.status(202).json(newNutrientBatch.toJSON());
};

export const read = async (req: TypedRequestParams<{ nutrientBatchId: string }>, res) => {
  if (!req.params || !req.params.nutrientBatchId) {
    return res.status(400).json({
      message: 'missing required param | nutrientBatchId',
    });
  }

  const query: any = await NutrientBatch.findById(req.params.nutrientBatchId).exec();

  if (query) {
    return res.status(200).json(query);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};

export const readAll = async (_req: TypedRequestParams<{}>, res) => {
  const query: any = await NutrientBatch.find({}).catch((error: MongoServerError) => {
    return res.status(400).json({
      message: error.message,
    });
  });

  if (query) {
    return res.status(200).json(query);
  }

  return res.status(400).json({
    message: 'database error',
  });
};

export const update = async (req: TypedRequestBody<{ _id: string }>, res) => {
  await NutrientBatch.findByIdAndUpdate(req.body._id, req.body)
    .exec()
    .catch((error: MongoServerError) => {
      return res.status(400).json({message: error.errmsg})
    });

  return res.status(200).json({});
};

export const del = async (req: TypedRequestQueryParams<{nutrientBatchId: string}>, res) => {
  const results: any = await NutrientBatch.findByIdAndDelete(req.query.nutrientBatchId).exec();

  if (results) {
    return res.status(200).json(results);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};

export const createApplication = async (req: TypedRequestBody<{ nutrientBatchId: string, amountUsed: number }>, res) => {
  const nutrientBatch = await NutrientBatch.findById(req.body.nutrientBatchId).exec();
  if (!nutrientBatch) {
    return res.status(400).json({
      message: 'unknown id',
    });
  };

  const newApplication = new NutrientBatchApplication({ amountUsedMls: req.body.amountUsed })
  await newApplication.save().catch((error: MongoServerError) => {
    return res.status(400).json({
      message: error.errmsg
    });
  });

  nutrientBatch.applications.push(newApplication);

  await nutrientBatch.save().catch((error: MongoServerError) => {
    return res.status(400).json({
      message: error.errmsg
    });
  });

  return res.status(202).json(nutrientBatch.toJSON())
}

export const delApplication = async (req: TypedRequestQueryParams<{applicationId: string}>, res) => {
  const nutrientBatch: any = await NutrientBatch.findOne().byApplicationId(req.query.applicationId);

  if (nutrientBatch) {
    const updatedApplications = nutrientBatch.applications.filter((application) => {
      if (application.id !== req.query.applicationId) {
        return true;
      }

      return false;
    });
    await NutrientBatch.findByIdAndUpdate(nutrientBatch._id, { $set: { applications: updatedApplications } })
    nutrientBatch.applications = updatedApplications
    return res.status(200).json(nutrientBatch);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};