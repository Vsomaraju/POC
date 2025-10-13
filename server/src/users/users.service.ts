import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

@Injectable()
export class UsersService {
  // In-memory storage for POC (replace with database in production)
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async create(userData: { email: string; password: string; name: string }): Promise<User> {
    const user: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}

