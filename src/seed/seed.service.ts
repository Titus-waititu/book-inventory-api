import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Book } from 'src/books/entities/book.entity';
import { Category } from 'src/categories/entities/category.entity';
import { BookReview } from 'src/bookreviews/entities/bookreview.entity';


@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(BookReview) private readonly bookReviewRepository: Repository<BookReview>,
  ) {}

  async seed() {
    this.logger.log('🌱 Seeding Books Archive Management System database...');

    // Users and Profiles
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const user = this.userRepository.create({
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      await this.userRepository.save(user);
      users.push(user);

      const profile = this.profileRepository.create({
        bio: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
        dateOfBirth: faker.date.birthdate(),
        location: faker.location.city(),
        user: user,
      });
      await this.profileRepository.save(profile);
    }

    // Authors
    const authors: Author[] = [];
    for (let i = 0; i < 5; i++) {
      const author = this.authorRepository.create({
        name: faker.person.fullName(),
        bio: faker.lorem.paragraph(),
        birthDate: faker.date.birthdate(),
      });
      await this.authorRepository.save(author);
      authors.push(author);
    }

    // Categories
    const categories: Category[] = [];
    for (let i = 0; i < 5; i++) {
      const category = this.categoryRepository.create({
        name: faker.word.noun(),
        description: faker.lorem.sentence(),
      });
      await this.categoryRepository.save(category);
      categories.push(category);
    }

    // Books
    const books: Book[] = [];
    for (let i = 0; i < 10; i++) {
      const book = this.bookRepository.create({
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        publicationYear: faker.number.int({ min: 1000, max: new Date().getFullYear() }),
        author: faker.helpers.arrayElement(authors),
        isAvailable: true,
        categories: faker.helpers.arrayElements(categories, 2),
      });
      await this.bookRepository.save(book);
      books.push(book);
    }

    // Book Reviews
    for (let i = 0; i < 20; i++) {
      const review = this.bookReviewRepository.create({
        content: faker.lorem.sentences(2),
        rating: faker.number.int({ min: 1, max: 5 }),
        book: faker.helpers.arrayElement(books),
        user: faker.helpers.arrayElement(users),
      });
      await this.bookReviewRepository.save(review);
    }

    this.logger.log('✅ Books Archive Management System seeding complete!');
  }
}
