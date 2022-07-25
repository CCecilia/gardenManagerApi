export interface TypedResponse<ResBody> extends Express.Response {
  json: ResBody;
  status: (status: number) => void;
  setHeader: (key: string, value: any) => void;
}
