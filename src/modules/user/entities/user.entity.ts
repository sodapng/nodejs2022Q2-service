import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn({
    transformer: {
      to: (value) => value,
      from: (value) => value.getTime(),
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    transformer: {
      to: (value) => value,
      from: (value) => value.getTime(),
    },
  })
  updatedAt: Date;
}
