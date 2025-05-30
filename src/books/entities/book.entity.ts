import { Author } from 'src/authors/entities/author.entity';
import { BookReview } from 'src/bookreviews/entities/bookreview.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';


@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  publicationYear: number;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Author, author => author.books)
  author: Author;

  @ManyToMany(() => Category, category => category.books, { cascade: true })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => BookReview, review => review.book)
  reviews: BookReview[];
}