import { checkRequiredQueryParams } from './requiredQueryParams';
import { baseRouteMiddleware } from './baseRouteMiddleWare';
import { checkRquiredProps } from './requiredProperties';

export const read = baseRouteMiddleware;

export const create = [
  checkRquiredProps([
    'totalWaterGallons',
    'totalFloraMicroMls',
    'totalFloraBloomMls',
    'totalFloraGroMls',
    'phDownMls',
    'phUpMls',
    'startingPh',
    'endingPh',
    'applications'
  ])
].concat(baseRouteMiddleware);

export const update = [checkRquiredProps(['id'])].concat(baseRouteMiddleware);

export const del = [checkRequiredQueryParams(['nutrientBatchId'])]

