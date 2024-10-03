import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    label?: string;

    @ManyToOne(() => Category, (category) => category.children, { onDelete: 'CASCADE' })
    parent?: Category;

    @OneToMany(() => Category, (category) => category.parent)
    children?: Category[];
}
