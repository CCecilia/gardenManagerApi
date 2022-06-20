export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestParams<T> extends Express.Request {
  params: T;
}

export interface TypedRequestQueryParams<T> extends Express.Request {
  query: T;
}
