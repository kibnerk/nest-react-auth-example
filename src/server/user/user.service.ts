import { Injectable, BadRequestException } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
  users = [{ id: 'user1', name: 'string', password: 'string' }];

  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  createUser(name: string, password: string, avatar: string) {
    const userId = nanoid();
    if (!name || !password) {
      throw new BadRequestException(`Incorrect data`);
    }

    if (this.users.find(user => user.name === name)) {
      throw new BadRequestException(`Username is already taken`);
    }

    const newUser = { id: userId, name, password, avatar };
    this.users.push(newUser);

    return {
      id: userId,
      name,
      avatar,
    };
  }
}
