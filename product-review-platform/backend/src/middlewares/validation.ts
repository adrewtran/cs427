import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { AppError } from './errorHandler.js';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
   
    for (const validation of validations) {
      await validation.run(req);
    }
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return next(new AppError('Validation Error', 400, errors.array()));
    }
    
    next();
  };
}; 