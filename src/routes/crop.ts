import { MongoServerError } from 'mongodb';
// import { Crop, CropSchema } from '../models/crop';

import { Crop } from '../models/crop';
import { ObjectId } from 'mongodb';
import { CropCreateFormData } from 'types/crop.create.formData.type';
import { TypedRequestBody } from 'types/request.interface';

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

export const read = (_req, res) => {
  return res.status(200).json({
    message: '/crop/read reached',
  });
};

export const readAll = (_req, res) => {
  return res.status(200).json({
    message: '/crop/readAll reached',
  });
};

export const update = (_req, res) => {
  return res.status(200).json({
    message: '/crop/update reached',
  });
};

export const del = (_req, res) => {
  return res.status(200).json({
    message: '/crop/delete reached',
  });
};
