import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/checkpassword')
  @UseGuards(AuthGuard())
  checkPasswordById(@Body('password') password: string, @GetUser() user: User) {
    return this.authService.checkPasswordById(user.id, password);
  }

  @Put('/changepw')
  @UseGuards(AuthGuard())
  changePassword(@Body() { id, password }: { id: number; password: string }) {
    return this.authService.changePassword(id, password);
  }
}
