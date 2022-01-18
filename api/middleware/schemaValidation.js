import {
  checkSchema, matchedData, validationResult,
} from 'express-validator';

export const schemaValidation = (schema) => async (req, res, next) => {
  await checkSchema(schema).run(req);
  const { errors } = validationResult(req);

  if (errors.length) {
    res.statusMessage = errors.map(({ msg }) => msg).join(', ');
    res.sendStatus(400);
    return;
  }

  req.matchedData = matchedData(req);
  next();
};

export const validateSchema = (schema) => [checkSchema(schema), validateSchema];
