import { TypedRequestQueryParams } from 'types/request.interface';
export const search = (req: TypedRequestQueryParams<{ query: string }>, res) => {
  console.log(req.query.query)
  res.status(200).json({results: []})
};