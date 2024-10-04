import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../../ormconfig';

beforeAll(async () => {
    await AppDataSource.initialize();
    //   run all migraions
    await AppDataSource.runMigrations();
});

afterAll(async () => {
    // clean up after tests
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
});

describe('Category Management API - TrustCrow', () => {

    let parentCategoryId: number;

    it('should create a new category', async () => {
        const response = await request(app)
            .post('/api/categories')
            .send({ label: 'New Category' });

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.label).toBe('New Category');

        // Save the ID for tests that will run after this
        parentCategoryId = response.body.id;
    });

    it('should create a subcategory under the parent category', async () => {
        const response = await request(app)
            .post('/api/categories')
            .send({ label: 'Sub Category', parentId: parentCategoryId });

        expect(response.statusCode).toEqual(201);
        expect(response.body.parent.id).toBe(parentCategoryId);
    });

    it('should fetch the subtree of a category', async () => {
        const response = await request(app).get(`/api/categories/${parentCategoryId}/subtree`);
        expect(response.statusCode).toEqual(200);

        // Expect at least one child (the subcategory) since the success of the tests before this implies existence of at least one child
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should move a category to a new parent', async () => {
        // Create a new parent category
        const newParentResponse = await request(app).post('/api/categories').send({ label: 'New Parent' });
        const newParentId = newParentResponse.body.id;

        // Move the previous subcategory to the new parent
        const moveResponse = await request(app)
            .put(`/api/categories/${parentCategoryId}/move`)
            .send({ newParentId });

        expect(moveResponse.statusCode).toEqual(200);
        expect(moveResponse.body.parent.id).toBe(newParentId);
    });

    it('should delete a category and its subtree', async () => {
        const deleteResponse = await request(app).delete(`/api/categories/${parentCategoryId}`);
        expect(deleteResponse.statusCode).toEqual(200);

        const fetchResponse = await request(app).get(`/api/categories/${parentCategoryId}/subtree`);
        expect(fetchResponse.statusCode).toEqual(404);
    });

});
