import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    return await this.usersRepository
      .save(createUserDto)
      .then((user) => {
        return this.usersRepository.findOneBy({ id: user.id });
      })
      .catch((error) => {
        throw new Error(`Error creating user: ${error.message}`);
      });
  }

  async findAll(): Promise<User[] | string> {
    return await this.usersRepository
      .find({
        relations: ['profile'],
        order: {
          id: 'DESC',
        },
      })
      .then((users) => {
        return users.length > 0 ? users : 'No users found';
      })
      .catch((error) => {
        throw new NotFoundException(`Error fetching users: ${error.message}`);
      });
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository
      .findOne({
        where: { id },
        relations: ['profile'],
      })
      .then((user) => {
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
      })
      .catch((error) => {
        throw new NotFoundException(`Error fetching user: ${error.message}`);
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.usersRepository
      .findOneBy({ id })
      .then(async (user) => {
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        const updatedUser = Object.assign(user, updateUserDto);
        return await this.usersRepository.save(updatedUser);
      })
      .then((user) => {
        return this.usersRepository.findOneBy({ id: user.id });
      })
      .catch((error) => { 
        throw new NotFoundException(`Error updating user: ${error.message}`);
      });
  }

  async remove(id: number): Promise<void> {
    return await this.usersRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      })
      .catch((error) => {
        throw new NotFoundException(`Error deleting user: ${error.message}`);
      });
  }
}
