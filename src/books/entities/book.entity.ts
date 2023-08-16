import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  discountrate: number;

  @Column()
  coverimage: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  sold: boolean;
}
