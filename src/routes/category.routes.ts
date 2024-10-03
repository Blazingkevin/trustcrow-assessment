import express from 'express';
import { createCategory, deleteCategory, getCategorySubtree, updateCategoryParent } from '../controllers/category.controller';

const router = express.Router();

router.post('/categories', createCategory);
router.delete('/categories/:id', deleteCategory);
router.get('/categories/:id/subtree', getCategorySubtree);
router.put('/categories/:id/move', updateCategoryParent);

export default router;
