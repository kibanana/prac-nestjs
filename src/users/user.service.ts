import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [
    new UserDto('kim1', '김예원1'),
    new UserDto('kim2', '김예원2'),
  ];
  findAll(): Promise<UserDto[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.users), 100));
  }
  findOne(id: string): UserDto | null {
    const result = this.users.filter((user) => user.userId === id);
    return result.length ? result[0] : null;
  }
  save(userDto: UserDto): void {
    this.users = [...this.users, userDto];
  }
}
