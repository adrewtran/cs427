import { Request, Response, NextFunction } from 'express';
import { ProductModel, Product } from '../models/Product.js';
import { CategoryModel } from '../models/Category.js';
import { AppError } from '../middlewares/errorHandler.js';

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const rawPage = req.query.page;
    const rawLimit = req.query.limit;
    const rawCategoryId = req.query.categoryId;
    
    
    let page = typeof rawPage === 'string' ? parseInt(rawPage) : 1;
    let limit = typeof rawLimit === 'string' ? parseInt(rawLimit) : 10;
    const categoryId = rawCategoryId ? parseInt(rawCategoryId as string) : undefined;
    
    
    if (isNaN(page)) {
      page = 1;
    }
    
    if (isNaN(limit)) {
      limit = 10;
    }
    
    

    page = Math.max(1, page);
    limit = Math.max(1, Math.min(50, limit)); 
    
    

    const { products, total } = await ProductModel.getAllProducts(page, limit, categoryId);
    

    const totalPages = Math.max(1, Math.ceil(total / limit));
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: totalPages,
      data: products
    });
    
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      throw new AppError('Invalid product ID', 400);
    }
    
    const product = await ProductModel.getProductById(id);
    
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const searchTerm = req.query.q as string;
    
    if (!searchTerm) {
      throw new AppError('Search term is required', 400);
    }
    
    const products = await ProductModel.searchProducts(searchTerm);
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, categoryId, price } = req.body;
    
    if (!name || !description || !categoryId || !price) {
      throw new AppError('Please provide all required fields', 400);
    }
    
   
    const category = await CategoryModel.getCategoryById(categoryId);
    
    if (!category) {
      throw new AppError(`Category with ID ${categoryId} not found`, 400);
    }
    
    const productId = await ProductModel.createProduct({
      name,
      description,
      categoryId,
      price
    });
    
    const product = await ProductModel.getProductById(productId);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      throw new AppError('Invalid product ID', 400);
    }
    
    const { name, description, categoryId, price } = req.body;
    
    if (!name && !description && !categoryId && !price) {
      throw new AppError('Please provide at least one field to update', 400);
    }
    
   
    const productExists = await ProductModel.getProductById(id);
    
    if (!productExists) {
      throw new AppError('Product not found', 404);
    }
    
   
    if (categoryId) {
      const category = await CategoryModel.getCategoryById(categoryId);
      
      if (!category) {
        throw new AppError(`Category with ID ${categoryId} not found`, 400);
      }
    }
    
    const updated = await ProductModel.updateProduct(id, {
      name,
      description,
      categoryId,
      price
    });
    
    if (!updated) {
      throw new AppError('Failed to update product', 500);
    }
    
    const updatedProduct = await ProductModel.getProductById(id);
    
    res.status(200).json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      throw new AppError('Invalid product ID', 400);
    }
    
    const productExists = await ProductModel.getProductById(id);
    
    if (!productExists) {
      throw new AppError('Product not found', 404);
    }
    
    const deleted = await ProductModel.deleteProduct(id);
    
    if (!deleted) {
      throw new AppError('Failed to delete product', 500);
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
}; 