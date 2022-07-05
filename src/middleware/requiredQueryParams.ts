export const checkRequiredQueryParams =
  (requiredParams: string[]) => (req, res, next) => {
    if (req.query) {
      requiredParams.forEach((required: string) => {
        if (!Object.prototype.hasOwnProperty.call(req.query, required)) {
          return res
            .status(400)
            .send({ message: `missing required query parameter | ${required}` });
        }
      });
    }

    next();
  };