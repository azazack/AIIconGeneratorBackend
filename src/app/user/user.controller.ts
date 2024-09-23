import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserReq, UserLoginReq } from './user.interface';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() req: CreateUserReq) {
    return this.userService.createUser(req);
  }

  @Post('login')
  async login(@Body() req: UserLoginReq) {
    return await this.userService.login(req);
    // return this.userService.login(req);
  }
}
