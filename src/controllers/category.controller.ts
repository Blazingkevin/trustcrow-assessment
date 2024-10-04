import { Request, Response } from 'express';
import { addCategory, removeCategory, fetchSubtree, moveSubtree, getCategoryById } from '../services/category.service';
import { NotFoundError } from '../errors/NotFoudError';

export async function createCategory(req: Request, res: Response) {
  const { label, parentId } = req.body;
  try {
    const category = await addCategory(label, parentId);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category' });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await removeCategory(Number(id));
    res.status(200).json({ message: 'Category deleted', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category' });
  }
}

export async function getCategorySubtree(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const existingCategory = await getCategoryById(Number(id))
    if (!existingCategory) {
      res.status(404).json({ message: `Category with ID ${id} not found` });
      return
    }

    const subtree = await fetchSubtree(Number(id));
    res.status(200).json(subtree);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return
    }
    res.status(500).json({ message: 'Failed to fetch category subtree' });
  }
}

export async function updateCategoryParent(req: Request, res: Response) {
  const { id } = req.params;
  const { newParentId } = req.body;
  try {
    const category = await moveSubtree(Number(id), newParentId);
    res.status(200).json(category);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return
    }
    res.status(500).json({ message: 'Failed to move category' });
  }
}
