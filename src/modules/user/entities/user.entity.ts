import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  @Transform(({ value }) => +`${new Date(value).getTime()}`.slice(0, 12))
  createdAt: Date;

  @Transform(({ value }) => +`${new Date(value).getTime()}`.slice(0, 12))
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
