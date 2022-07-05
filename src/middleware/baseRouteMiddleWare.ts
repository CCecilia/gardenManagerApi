import { verifyToken } from "./auth.jwt";
import { jsonContent } from "./header";

export const baseRouteMiddleware =  [
  verifyToken,
  jsonContent,
]