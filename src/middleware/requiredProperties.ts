export const checkRquiredProps =
  (requiredProps: string[]) => (req, res, next) => {
    if (req.body) {
      requiredProps.forEach((required: string) => {
        if (!Object.prototype.hasOwnProperty.call(req.body, required)) {
          res
            .status(400)
            .send({ message: `missing required parameter | ${required}` });
        }
      });
    }

    next();
  };
