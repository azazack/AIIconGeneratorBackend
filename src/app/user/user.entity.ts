import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: new Date() })
  created_at: Date;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
