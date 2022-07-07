import { checkRequiredQueryParams } from './requiredQueryParams';
import { baseRouteMiddleware } from "./baseRouteMiddleWare";
import { checkRquiredProps } from "./requiredProperties";

export const read = baseRouteMiddleware;

export const create = [
  ...baseRouteMiddleware,
  checkRquiredProps(['genus', 'species', 'commonName', 'batch'])
];

export const update = [
  ...baseRouteMiddleware,
  checkRquiredProps(['_id'])
];

export const del = [
  ...baseRouteMiddleware,
  checkRequiredQueryParams(['plantId'])
];

export const createGrowthLog = [
  ...baseRouteMiddleware,
  checkRquiredProps([
    'plantId',
    'numbersOfLeaves',
    'heightInches',
    'img'
  ])
];