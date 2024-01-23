import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString({ message: 'Only String' })
  @IsNotEmpty()
  password: string;
}
