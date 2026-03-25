import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  private users: IUser[] = this.users;
  test(): string[] {
    return [];
  }

  findOne(id: string, fields?: string[]): Partial<IUser> {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (fields !== undefined) {
      if (fields.length === 0) {
        return {};
      }
      const filteredUser: Partial<IUser> = {};
      
      fields.forEach((field) => {
        const key = field as keyof IUser;
        if (user[key] !== undefined) {
          filteredUser[key] = user[key];
        }
      });
      
      return filteredUser;
    }

    return user;
  }

  create(createUserDto: CreateUserDto): IUser {
    const newUser: IUser = {
      id: Math.random().toString(36).substring(2, 9), 
      ...createUserDto,
    };
    
    this.users.push(newUser);

    return newUser;
  }
}