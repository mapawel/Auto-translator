import { body, ValidationChain } from 'express-validator';

export const translationValidator: ValidationChain[] = [
  body('traget').isLength({ min: 5 }),
  body('text').isEmail(),
];
