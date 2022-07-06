import { checkRquiredProps } from './requiredProperties';
import { baseRouteMiddleware } from "./baseRouteMiddleWare";
import { checkRequiredQueryParams } from './requiredQueryParams';

export const read = baseRouteMiddleware;

export const create = [
  checkRquiredProps(['name', 'plants'])
].concat(baseRouteMiddleware);

export const update = [
  checkRquiredProps(['_id'])
].concat(baseRouteMiddleware);

export const del = [
  checkRequiredQueryParams(['cropId'])
].concat(baseRouteMiddleware);

export const readCropPlantData = [
  checkRequiredQueryParams(['plantIds']),
].concat(baseRouteMiddleware);

export const readNutrientBatchData = [
  checkRequiredQueryParams(['nutrientBatchIds']),
].concat(baseRouteMiddleware);

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