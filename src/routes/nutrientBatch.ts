import { MongoServerError } from 'mongodb';
import { NutrientBatchCreateFormData } from 'types/nutrientBatch.formData.type';
import { TypedRequestBody, TypedRequestParams } from 'types/request.interface';
import { NutrientBatch } from './../models/nutrientBatch';

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

export const update = async (req: TypedRequestBody<{ id: string }>, res) => {
  const results = await NutrientBatch.findByIdAndUpdate(req.body.id, req.body)
    .exec()
    .catch((error: MongoServerError) => {
      return res.status(400).json({message: error.errmsg})
    });

  return res.status(200).json(results);
};

export const del = async (req, res) => {
  if (!req.query || !req.query.nutrientBatchId) {
    return res.status(400).json({
      message: 'missing required param | nutrientBatchId',
    });
  }
  const results: any = await NutrientBatch.findByIdAndDelete(req.query.nutrientBatchId).exec();

  if (results) {
    return res.status(200).json(results);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};