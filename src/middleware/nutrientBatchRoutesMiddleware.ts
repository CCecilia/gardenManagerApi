import { checkRequiredQueryParams } from './requiredQueryParams';
import { baseRouteMiddleware } from './baseRouteMiddleWare';
import { checkRquiredProps } from './requiredProperties';

export const read = baseRouteMiddleware;

export const create = [
  ...baseRouteMiddleware,
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
];

export const update = [...baseRouteMiddleware, checkRquiredProps(['_id'])];

export const del = [...baseRouteMiddleware, checkRequiredQueryParams(['nutrientBatchId'])];

export const createApplication = [...baseRouteMiddleware, checkRquiredProps(['nutrientBatchId', 'amountUsed'])]

export const delApplication = [...baseRouteMiddleware, checkRequiredQueryParams(['applicationId'])];
