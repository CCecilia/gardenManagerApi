import { baseRouteMiddleware } from './baseRouteMiddleWare';
import { checkRequiredQueryParams } from './requiredQueryParams';

export const search = [
  ...baseRouteMiddleware,
  checkRequiredQueryParams(['query'])
];
