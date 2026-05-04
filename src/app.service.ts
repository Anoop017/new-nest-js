import { Injectable, NotFoundException } from '@nestjs/common';
import { newUser} from './users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(newUser)
    private userRepo: Repository<newUser>,
  ) { }

  // GET ALL - with optional name filter
  async getAllUsers(name?: string): Promise<newUser[]> {
    if (!name) {
      return this.userRepo.find();
    }
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.name ILIKE :name', { name: `%${name}%` })
      .getMany();
  }

  // GET BY ID
  async getUserById(id: number): Promise<newUser> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // POST - CREATE
  async createUser(name: string): Promise<newUser> {
    const newUser = this.userRepo.create({ name });
    return this.userRepo.save(newUser);
  }

  // PUT - FULL UPDATE (replace)
  async updateUser(id: number, name: string): Promise<newUser> {
    const user = await this.getUserById(id);
    user.name = name;
    return this.userRepo.save(user);
  }

  // PATCH - PARTIAL UPDATE
  async patchUser(id: number, name?: string): Promise<newUser> {
    const user = await this.getUserById(id);

    if (name !== undefined) {
      user.name = name;
    }
    return this.userRepo.save(user);
  }

  // DELETE
  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.getUserById(id);
    await this.userRepo.remove(user);
    return { message: `User with ID ${id} deleted successfully` };
  }
}