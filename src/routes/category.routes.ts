import express from 'express';
import { createCategory, deleteCategory, getCategorySubtree, updateCategoryParent } from '../controllers/category.controller';
import validationMiddleware from '../middlewares/validationMiddleware';
import { CreateCategoryDto, MoveCategoryDto } from '../dtos/category.dto';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategoryDto:
 *       type: object
 *       required:
 *         - label
 *       properties:
 *         label:
 *           type: string
 *           description: The name of the category
 *         parentId:
 *           type: number
 *           description: The numeric ID of the parent category (optional)
 *       example:
 *         label: "New Category"
 *         parentId: 2
 * 
 *     MoveCategoryDto:
 *       type: object
 *       required:
 *         - newParentId
 *       properties:
 *         newParentId:
 *           type: number
 *           description: The numeric ID of the new parent category
 *       example:
 *         newParentId: 7
 */


/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDto'
 *     responses:
 *       201:
 *         description: The created category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 label:
 *                   type: string
 *                 parentId:
 *                   type: number
 *       400:
 *         description: Validation error
 */
router.post('/categories', validationMiddleware(CreateCategoryDto), createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The numeric ID of the category to delete
 *     responses:
 *       200:
 *         description: The deleted category's ID.
 *       404:
 *         description: Category not found
 */
router.delete('/categories/:id', deleteCategory);

/**
 * @swagger
 * /categories/{id}/subtree:
 *   get:
 *     summary: Fetch a category's subtree
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The numeric ID of the parent category
 *     responses:
 *       200:
 *         description: The subtree rooted at the given category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateCategoryDto'
 */
router.get('/categories/:id/subtree', getCategorySubtree);

/**
 * @swagger
 * /categories/{id}/move:
 *   put:
 *     summary: Move a category to a new parent
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The numeric ID of the category to move
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MoveCategoryDto'
 *     responses:
 *       200:
 *         description: The updated category.
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category or parent not found
 */
router.put('/categories/:id/move', validationMiddleware(MoveCategoryDto), updateCategoryParent);

export default router;
