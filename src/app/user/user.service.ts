import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserReq, UserLoginReq } from './user.interface';
import { apiResponseType } from '../../types/global';
import { checkPassword, passwordHash } from '../../utils/password';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../../constants/hashing';
interface UserServiceInterface {
  createUser(req: CreateUserReq): Promise<apiResponseType>;
  login(req: UserLoginReq): Promise<apiResponseType<{ token?: string }>>;
}

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(req: CreateUserReq): Promise<apiResponseType> {
    const user = this.userRepository.create({
      first_name: req.first_name,
      last_name: req.last_name,
      password: await passwordHash(req.password),
      email: req.email,
    });
    try {
      await this.userRepository.save(user);
      return { success: true, message: 'user created successfully' };
    } catch (err) {
      console.log(err);
      return { success: false, message: 'error while creating a user' };
    }
  }

  async login(req: UserLoginReq): Promise<apiResponseType<{ token?: string }>> {
    const { password, isActive, id, first_name, last_name } =
      await this.userRepository.findOneBy({
        email: req.email,
      });
    if (isActive) {
      const res = await checkPassword(req.password, password);
      if (res) {
        const token = sign(
          { id: id.toString(), name: `${first_name} ${last_name}` },
          SECRET_KEY,
          {
            expiresIn: '2 days',
          },
        );
        return {
          success: true,
          message: 'user logged in successfully',
          data: { token },
        };
      } else {
        return { success: false, message: 'wrong credentials' };
      }
    } else {
      return { success: false, message: 'user not active' };
    }
  }
}
