import { Request, Response, NextFunction } from 'express';
import { CategoryModel, Category } from '../models/Category.js';
import { AppError } from '../middlewares/errorHandler.js';

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await CategoryModel.getAllCategories();
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      throw new AppError('Invalid category ID', 400);
    }
    
    const category = await CategoryModel.getCategoryById(id);
    
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
}; 