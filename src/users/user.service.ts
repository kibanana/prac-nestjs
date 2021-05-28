import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { User } from './domain/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ userId: id });
  }
  async save(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
  async delete(id: string): Promise<void> {
    await this.userRepository.delete({ userId: id });
  }
}
