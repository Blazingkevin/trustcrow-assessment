import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    label: string;

    @IsOptional()
    @IsNumber()
    parentId?: number;
}

export class MoveCategoryDto {
    @IsNumber()
    newParentId: number;
}
