import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: UserEntity, pass: string): Promise<any> {
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: any) {
    const { email, password } = req.body;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new BadRequestException('User does not exist');

    const validatedUser = await this.validateUser(user, password);
    if (!validatedUser) throw new UnauthorizedException('Unauthorized user');

    const payload = { email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async logout() {
    return {
      token: '',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 0,
    };
  }
}
