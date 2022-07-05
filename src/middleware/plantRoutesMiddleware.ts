import { checkRequiredQueryParams } from './requiredQueryParams';
import { baseRouteMiddleware } from "./baseRouteMiddleWare";
import { checkRquiredProps } from "./requiredProperties";

export const read = baseRouteMiddleware;

export const create = [
  checkRquiredProps(['genus', 'species', 'commonName', 'batch'])
].concat(baseRouteMiddleware);

export const update = [
  checkRquiredProps(['id'])
].concat(baseRouteMiddleware);

export const del = [
  checkRequiredQueryParams(['plantId'])
].concat(baseRouteMiddleware);