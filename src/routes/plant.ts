import { PlantGrowthLogCreateFormData } from './../types/plant.growthLog.create.formdata.type';
import { TypedRequestQueryParams, TypedRequestBodyWithFiles } from './../types/request.interface';
import { Plant } from '../models/plant';
import { TypedRequestBody, TypedRequestParams } from 'types/request.interface';

import { MongoServerError } from 'mongodb';
import { PlantCreateFormData } from 'types/plant.create.formData.type';

export const create = async (
  req: TypedRequestBody<PlantCreateFormData>,
  res
) => {
  if (!req.body.batch) {
    return res.status(400).json({
      message: 'batch amount required, must be greater then 0',
    });
  }

  const newPlants: {
    genus: string;
    species: string;
    commonName: string;
  }[] = [];

  for (let index = 0; index < req.body.batch; index++) {
    const newPlant = {
      genus: req.body.genus,
      species: req.body.species,
      commonName: req.body.commonName,
    };
    newPlants.push(newPlant);
  }

  const results = await Plant.insertMany(newPlants).catch(
    (error: MongoServerError) => {
      return res.status(500).send({ message: error.errmsg });
    }
  );

  return res.status(202).json(results);
};

export const read = async (
  req: TypedRequestParams<{ plantId: string }>,
  res
) => {
  if (!req.params || !req.params.plantId) {
    return res.status(400).json({
      message: 'missing required param | plantId',
    });
  }

  const query: any = await Plant.findById(req.params.plantId).exec();

  if (query) {
    return res.status(200).json(query);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};

export const readAll = async (_req: TypedRequestParams<{}>, res) => {
  const query: any = await Plant.find({}).catch((error: MongoServerError) => {
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
  const results = await Plant.findByIdAndUpdate(req.body._id, req.body)
    .exec()
    .catch((error: MongoServerError) => {
      return res.status(400).json({message: error.errmsg})
    });

  return res.status(200).json(results);
};

export const del = async (req: TypedRequestQueryParams<{plantId: string}>, res) => {
  const results: any = await Plant.findByIdAndDelete(req.query.plantId).exec();

  if (results) {
    return res.status(200).json(results);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};

export const createGrowthLog = async (req: TypedRequestBodyWithFiles<PlantGrowthLogCreateFormData>, res) => {
  const plant = await Plant.findById(req.body.plantId);
  if (plant) {
    const newGrowthLog = {
      numbersOfLeaves: req.body.numbersOfLeaves,
      heightInches: req.body.heightInches,
      currentStage: plant.currentStage,
      dateCreated: new Date(),
      img: req.body.img
    };
    plant.growthLogs.push(newGrowthLog);
    await plant.save().catch((error: MongoServerError) => {
      return res.status(400).json({ message: error.errmsg });
    });

    return res.status(200).json(plant?.toJSON())
  };

  return res.status(400).json({message: 'unknown plantId'})
};