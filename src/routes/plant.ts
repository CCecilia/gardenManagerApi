import { Plant, PlantSchema } from '../models/plant';
import { TypedRequestBody, TypedRequestParams } from 'types/request.interface';

import { MongoServerError } from 'mongodb';
import { PlantCreateFormData } from 'types/plant.create.formData.type';
import mongoose from 'mongoose';

export const create = async (
  req: TypedRequestBody<PlantCreateFormData>,
  res
) => {
  const requiredProperties = ['genus', 'species', 'commonName', 'batch'];

  if (req.body) {
    requiredProperties.forEach((required: string) => {
      if (!Object.prototype.hasOwnProperty.call(req.body, required)) {
        return res
          .status(400)
          .send({ message: `missing required parameter | ${required}` });
      };
    });
  };

  if (!req.body.batch) {
    return res.status(400).json({
      message: 'batch amount required, must be greater then 0'
    });
  };

  const newPlants: {
    genus: string,
    species: string,
    commonName: string
  }[] = [];

  for (let index = 0; index < req.body.batch; index++) {
    const newPlant = {
      genus: req.body.genus,
      species: req.body.species,
      commonName: req.body.commonName,
    };
    newPlants.push(newPlant);
  };

  const results = await Plant.insertMany(newPlants).catch((error: MongoServerError) => {
    return res.status(500).send({ message: error.errmsg });
  });

  return res.status(202).json(results);
};

export const read = async (req: TypedRequestParams<{ plantId: string }>, res) => {
  if (!req.params || !req.params.plantId) {
    return res.status(400).json({
      message: 'missing required param | plantId',
    });
  }

  const Plant = mongoose.model('Plants', PlantSchema);
  const query: any = await Plant.findById(req.params.plantId).exec();

  if (query) {
    return res.status(200).json(query);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};

export const readAll = async (_req: TypedRequestParams<{}>, res) => {
  const Plant = mongoose.model('Plants', PlantSchema);
  const query: any = await Plant.find({}).catch((error: MongoServerError) => {
    return res.status(400).json({
      message: error.message,
    })
  });

  if (query) {
    return res.status(200).json(query);
  }

  return res.status(400).json({
    message: 'database error',
  });
};

export const update = async (req: TypedRequestBody<{id: string}>, res) => {
  const requiredProperties = ['id'];

  if (req.body) {
    requiredProperties.forEach((required: string) => {
      if (!Object.prototype.hasOwnProperty.call(req.body, required)) {
        return res
          .status(400)
          .send({ message: `missing required parameter | ${required}` });
      };
    });
  }

  const results = await Plant.findByIdAndUpdate(req.body.id, req.body).exec();
  return res.status(200).json(results);
};

export const del = async (req, res) => {
  if (!req.query || !req.query.plantId) {
    return res.status(400).json({
      message: 'missing required param | plantId',
    });
  }

  const Plant = mongoose.model('Plants', PlantSchema);
  const results: any = await Plant.findByIdAndDelete(req.query.plantId).exec();

  if (results) {
    return res.status(200).json(results);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};
