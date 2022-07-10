import { checkRquiredProps } from './requiredProperties';
import { baseRouteMiddleware } from "./baseRouteMiddleWare";
import { checkRequiredQueryParams } from './requiredQueryParams';

export const read = baseRouteMiddleware;

export const create = [
  ...baseRouteMiddleware,
  checkRquiredProps(['name', 'plants'])
];

export const update = [
  ...baseRouteMiddleware,
  checkRquiredProps(['_id'])
];

export const del = [
  ...baseRouteMiddleware,
  checkRequiredQueryParams(['cropId'])
];

export const readCropPlantData = [
  ...baseRouteMiddleware,
  checkRequiredQueryParams(['plantIds']),
];

export const readNutrientBatchData = [
  ...baseRouteMiddleware,
  checkRequiredQueryParams(['nutrientBatchIds']),
];

// export const addNutrientBatch = [
//   checkRquiredProps([
//     'cropId',
//     'totalWaterGallons',
//     'totalFloraMicroMls',
//     'totalFloraBloomMls',
//     'totalFloraGroMls',
//     'phDownMls',
//     'phUpMls',
//     'startingPh',
//     'endingPh',
//   ]),
// ].concat(baseRouteMiddleware);