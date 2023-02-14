import { body, ValidationChain } from 'express-validator';
const message: string = 'A payload has to fit documentation.';

export const translationValidator: ValidationChain[] = [
  body('text')
    .notEmpty()
    .isObject()
    .bail()
    .withMessage(message)
    .custom(async (input: object) => {
      Object.entries(input).map(([k, v]: [any, any]) => {
        if (typeof k !== 'string') throw new Error(message);
        if (typeof v !== 'object') throw new Error(message);
        Object.entries(v).map(([k2, v2]: [any, any]) => {
          if (typeof k2 !== 'string') throw new Error(message);
          if (typeof v2 !== 'string') throw new Error(message);
        });
        return true;
      });
    }),
  body('target')
    .notEmpty()
    .isString()
    .withMessage(message)
    .isLength({ min: 2, max: 2 })
    .withMessage(message),
];
