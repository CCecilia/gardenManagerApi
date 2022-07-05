import { NutrientBatch } from './../models/nutrientBatch';
import { MongoServerError } from 'mongodb';

import { Crop } from '../models/crop';
import { ObjectId } from 'mongodb';
import { CropCreateFormData } from 'types/crop.create.formData.type';
import { TypedRequestBody, TypedRequestParams, TypedRequestQueryParams } from 'types/request.interface';
import { Plant } from '../models/plant';

export const create = async (req: TypedRequestBody<CropCreateFormData>, res) => {
  const { name, plants } = req.body;
  const plantIds = plants.map((plantId: string) => {
    return new ObjectId(plantId);
  })

  const newCrop = new Crop({
    name,
    plants: plantIds
  })

  await newCrop.save().catch((error: MongoServerError) => {
    return res.status(400).json({
      message: error.errmsg
    })
  });

  return res.status(202).json(newCrop);
};

export const read = async (
  req: TypedRequestParams<{ cropId: string }>,
  res
) => {
  if (!req.params || !req.params.cropId) {
    return res.status(400).json({
      message: 'missing required param | cropId',
    });
  }

  const query = await Crop.findById(req.params.cropId).exec();

  if (query) {
    return res.status(200).json(query);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};

export const readAll = async (_req: TypedRequestParams<{}>, res) => {
  const query: any = await Crop.find({}).catch((error: MongoServerError) => {
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
  const results = await Crop.findByIdAndUpdate(req.body._id, req.body).exec().catch((error: MongoServerError) => {
    return res
      .status(400)
      .json({ message: error.errmsg });
  });
  return res.status(200).json(results);
};

export const del = async (req: TypedRequestQueryParams<{cropId: string}>, res) => {
  const results: any = await Crop.findByIdAndDelete(req.query.cropId).exec();

  if (results) {
    return res.status(200).json(results);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};

export const readCropPlantData = async  (req: TypedRequestQueryParams<{ plantIds: string }>, res) => {
  const ids = req.query.plantIds.split(',');
  const results = await Plant.find({ id: { $in: ids } }).catch((error: MongoServerError) => {
    return res.status(400).json({
      message: error.errmsg
    })
  });

  res.status(200).json(results);
};

export const readNutrientBatchData = async  (req: TypedRequestQueryParams<{ nutrientBatchIds: string }>, res) => {
  const ids = req.query.nutrientBatchIds.split(',');
  const results = await NutrientBatch.find({ id: { $in: ids } }).catch((error: MongoServerError) => {
    return res.status(400).json({
      message: error.errmsg
    })
  });

  res.status(200).json(results);
};
