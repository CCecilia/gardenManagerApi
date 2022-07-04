import { MongoServerError } from 'mongodb';
// import { Crop, CropSchema } from '../models/crop';

import { Crop } from '../models/crop';
import { ObjectId } from 'mongodb';
import { CropCreateFormData } from 'types/crop.create.formData.type';
import { TypedRequestBody, TypedRequestParams } from 'types/request.interface';

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

  
  const query: any = await Crop.findById(req.params.cropId).exec();

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

export const update = async (req: TypedRequestBody<{ id: string }>, res) => {
  const results = await Crop.findByIdAndUpdate(req.body.id, req.body).exec().catch((error: MongoServerError) => {
    return res
      .status(400)
      .json({ message: error.errmsg });
  });
  return res.status(200).json(results);
};

export const del = async (req, res) => {
  if (!req.query || !req.query.cropId) {
    return res.status(400).json({
      message: 'missing required param | cropId',
    });
  }

  const results: any = await Crop.findByIdAndDelete(req.query.cropId).exec();

  if (results) {
    return res.status(200).json(results);
  }

  return res.status(400).json({
    message: 'unknown id',
  });
};
