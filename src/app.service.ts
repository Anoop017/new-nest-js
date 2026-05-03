import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private users = [
    { id: 1, name: 'Anoop' },
    { id: 2, name: 'John' },
  ];

  // GET
  getAllUsers() {
    return this.users;
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

    if (name) user.name = name;
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