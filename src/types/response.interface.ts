export interface TypedResponse<ResBody> extends Express.Response {
  json: ResBody;
}
