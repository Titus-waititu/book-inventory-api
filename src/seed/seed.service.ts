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
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(BookReview)
    private readonly bookReviewRepository: Repository<BookReview>,
  ) {}

  async seed() {
    this.logger.log('🌱 Seeding Books Archive Management System database...');

 
    // seed into profile then users
    // Profiles
    const profiles: Profile[] = await this.profileRepository.find();
    for (let i = 0; i < 5; i++) {
      const profile = this.profileRepository.create({
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        location: faker.location.city(),
      });
      await this.profileRepository.save(profile);
      profiles.push(profile);
    }
    // // Users

    function generateValidPassword(): string {
      // Ensure at least one lowercase, one uppercase, one digit
      const lower = faker.string.alpha({ casing: 'lower', length: 1 });
      const upper = faker.string.alpha({ casing: 'upper', length: 1 });
      const digit = faker.string.numeric({ length: 1 });
      const rest = faker.internet.password({ length: 5 }); // Remaining characters to reach 8+

      return faker.helpers.shuffle([lower, upper, digit, ...rest]).join('');
    }

    const users: User[] = [];

    for (let i = 0; i < 5; i++) {
      const password = generateValidPassword();

      const user = this.userRepository.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: password,
        // profileId: profiles[i].id,
  
        profileId:profiles[i].id
      });

      await this.userRepository.save(user);
      users.push(user);
    }

      //  Authors
    const authors: Author[] = await this.authorRepository.find();
    for (let i = 0; i < 5; i++) {
      const author = this.authorRepository.create({
        name: faker.person.fullName(),
        bio: faker.lorem.paragraph(),
        isActive: faker.datatype.boolean(),
        birthDate: faker.date.birthdate(),
      });
      await this.authorRepository.save(author);
      authors.push(author);
    }

    //     // Categories
    const categories: Category[] = await this.categoryRepository.find();
    for (let i = 0; i < 5; i++) {
      const category = this.categoryRepository.create({
        name: faker.word.noun(),
        description: faker.lorem.sentence(),
      });
      await this.categoryRepository.save(category);
      categories.push(category);
    }

    // Books
    const books: Book[] = await this.bookRepository.find();
    for (let i = 0; i < 10; i++) {
      const book = this.bookRepository.create({
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        publicationYear: faker.number.int({ min: 1000, max: new Date().getFullYear() }),
        isAvailable: true,
        author: authors[i],
        categories: faker.helpers.arrayElements(categories, { min: 1, max: 3 }),
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
      });
      await this.bookReviewRepository.save(review);
    }

    this.logger.log('✅ Books Archive Management System seeding complete!');
    this.logger.log(`seeding into the database sucessful`)

    return {
      message: 'Seeding completed successfully',
      usersCount: await this.userRepository.count(),
      profilesCount: await this.profileRepository.count(),
      authorsCount: await this.authorRepository.count(),
      booksCount: await this.bookRepository.count(),
      categoriesCount: await this.categoryRepository.count(),
      bookReviewsCount: await this.bookReviewRepository.count(),
    };
  }
  

}
