import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @ManyToOne(() => Category, (category) => category.children, { onDelete: 'CASCADE' })
    parent: Category;

    @OneToMany(() => Category, (category) => category.parent)
    children: Category[];

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
