export class CreateUserDto {
  readonly name: string;
  readonly password: string;
  readonly avatar: string;
}

export class UserDto {
  readonly id: string;
  readonly name: string;
  readonly password: string;
}

export class AuthUserDto {
  readonly name: string;
  readonly password: string;
}
