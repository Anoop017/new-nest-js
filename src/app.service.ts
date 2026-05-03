import { Injectable } from '@nestjs/common';
import { User } from './users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AppService {
  private users = [
    { id: 1, name: 'Anoop' },
    { id: 2, name: 'John' },
  ];
  
  constructor(
  @InjectRepository(User)
  private userRepo: Repository<User>,
  
){}

  // GET
  getAllUsers(name?: string) {
    if(!name){
      return this.users 
    }
    return this.users.filter(user=>user.name?.toLowerCase().includes(name.toLowerCase()))
  }

  // POST
  createUser(name: string) {
    const newUser = {
      id: Date.now(),
      name,
    };
    this.users.push(newUser);
    return newUser;
  }

  // PUT (replace)
  updateUser(id: number, name: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return 'User not found';

    this.users[index] = { id, name };
    return this.users[index];
  }

  // PATCH (partial update)
  patchUser(id: number, name?: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) return 'User not found';

    if (name !== undefined){
      user.name = name;
  }
    return user;
  }

  // DELETE
  deleteUser(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return 'User not found';

    const deleted = this.users.splice(index, 1);
    return deleted;
  }
}