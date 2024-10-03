import { Request, Response } from 'express';
import { addCategory, removeCategory, fetchSubtree, moveSubtree } from '../services/category.service';

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
    await removeCategory(String(id));
    res.status(200).json({ message: 'Category deleted', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category' });
  }
}

export async function getCategorySubtree(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const subtree = await fetchSubtree(String(id));
    res.status(200).json(subtree);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category subtree' });
  }
}

export async function updateCategoryParent(req: Request, res: Response) {
  const { id } = req.params;
  const { newParentId } = req.body;
  try {
    const category = await moveSubtree(String(id), newParentId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to move category' });
  }
}
