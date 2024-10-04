//@ts-ignore
import { AppDataSource } from '../../ormconfig';
import { Category } from '../entities/category.entity';

const categoryRepository = AppDataSource.getRepository(Category);

export async function addCategory(label: string, parentId?: number): Promise<Category> {
    const category = new Category();
    category.label = label;

    if (parentId) {
        const parentCategory = await categoryRepository.findOneBy({ id: parentId });
        if (parentCategory) {
            category.parent = parentCategory;
        }
    }

    return await categoryRepository.save(category);
}

export async function removeCategory(id: number): Promise<void> {
    await categoryRepository.delete(id);
}

export async function fetchSubtree(id: number): Promise<Category[]> {
    return await categoryRepository.find({
        where: { id },
        relations: ['children'],
    });
}

export async function moveSubtree(id: number, newParentId: number): Promise<Category> {
    const category = await categoryRepository.findOneBy({ id });
    const newParent = await categoryRepository.findOneBy({ id: newParentId });

    if (!category || !newParent) {
        throw new Error('Category or new parent not found');
    }

    category.parent = newParent;
    return await categoryRepository.save(category);
}
