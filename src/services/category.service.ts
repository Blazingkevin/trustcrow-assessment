//@ts-ignore
import { AppDataSource } from '../../ormconfig';
import { Category } from '../entities/category.entity';

const categoryRepository = AppDataSource.getRepository(Category);

export async function addCategory(label: string, parentId?: string): Promise<Category> {
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

export async function removeCategory(id: string): Promise<void> {
    await categoryRepository.delete(id);
}

export async function fetchSubtree(id: string): Promise<Category[]> {
    return await categoryRepository.find({
        where: { id },
        relations: ['children'],
    });
}

export async function moveSubtree(id: string, newParentId: string): Promise<Category> {
    const category = await categoryRepository.findOneBy({ id });
    const newParent = await categoryRepository.findOneBy({ id: newParentId });

    if (!category || !newParent) {
        throw new Error('Category or new parent not found');
    }

    category.parent = newParent;
    return await categoryRepository.save(category);
}
