import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string

  @IsString()
  @IsEmail()
  @MinLength(4)
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  pass: string
}
