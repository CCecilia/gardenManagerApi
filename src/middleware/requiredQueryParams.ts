export const checkRequiredQueryParams =
  (requiredParams: string[]) => (req, res, next) => {
    let isMissingRequiredParams = false;
    let message = 'missing required query parameter';
    if (!req.query) {
      res
        .status(400)
        .send({ message })
        .end()
      return
    }

    requiredParams.forEach((required: string) => {
      if (!Object.prototype.hasOwnProperty.call(req.query, required)) {
        isMissingRequiredParams = true
        message = `missing required query parameter | ${required}`
      };
    });

    if (!isMissingRequiredParams) {
      next();
      return;
    }

    res
      .status(400)
      .send({ message })
      .end();
  };