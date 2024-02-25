import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  getUserFromRequest(req: Request): User | undefined {
    return req.user as User; // req.user에는 JwtStrategy에서 저장한 사용자 정보가 들어있습니다.
  }
  decodedToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      console.error('Token decoding error : ', error.message);

      return null;
    }
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { id: user.id, role: user.role };

      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  //비밀번호 변경을 위한 사용자 체크
  //로그인된 사용자의 토큰확인
  // 입력받은 비밀번호와 사용자일치 체크
  async checkPasswordById(id: number, password: string) {
    const user = await this.userRepository.findOneBy({ id });
    const check = await bcrypt.compare(password, user.password);

    if (user && check) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  async changePassword({ id }: User, password: string) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (foundUser) {
      return this.userRepository.changePassword(foundUser, password);
    }
  }
}
