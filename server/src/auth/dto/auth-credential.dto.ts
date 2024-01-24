import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Only String' })
  password: string;
}
