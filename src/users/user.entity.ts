import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class newUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}