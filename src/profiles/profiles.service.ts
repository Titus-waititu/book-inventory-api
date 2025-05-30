import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private categoriesRepository: Repository<Profile>,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    return await this.categoriesRepository
      .save(createProfileDto)
      .then((profile) => {
        return this.categoriesRepository.findOneBy({ id: profile.id });
      })
      .catch((error) => {
        throw new Error(`Error creating profile: ${error.message}`);
      });
  }

  async findAll(): Promise<Profile[] | string> {
    return await this.categoriesRepository
      .find({
        relations: ['user'],
        order: {
          id: 'DESC',
        },
      })
      .catch((error) => {
        throw new Error(`Error fetching profiles: ${error.message}`);
      });
  }

  async findOne(id: string): Promise<Profile | null> {
    return await this.categoriesRepository
      .findOne({
        where: { id },
        relations: ['user'],
      })
      .catch((error) => {
        throw new Error(
          `Error fetching profile with id ${id}: ${error.message}`,
        );
      });
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile | null> {
    return await this.categoriesRepository
      .findOneBy({ id })
      .then(async (profile) => {
        if (!profile) {
          throw new Error(`Profile with id ${id} not found`);
        }
        Object.assign(profile, updateProfileDto);
        return await this.categoriesRepository
          .save(profile)
          .then((updatedProfile) => {
            return this.categoriesRepository.findOneBy({
              id: updatedProfile.id,
            });
          });
      })
      .catch((error) => {
        throw new Error(`Error updating profile: ${error.message}`);
      });
  }

  async remove(id: number): Promise<{ message: string } | string> {
    return await this.categoriesRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Profile with id ${id} not found`);
        }
        return { message: `Profile with id ${id} deleted successfully` };
      })
      .catch((error) => {
        throw new Error(`Error deleting profile: ${error.message}`);
      });
  }
}
