import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 50 })
  name: string;

  @Column("double precision")
  price: number;

  @Column("integer")
  amount: number;

  @Column("date")
  boughtDate: Date;

  @Column("time")
  boughtTime: Date;

  @Column("timestamp", { nullable: true })
  validUntil: Date;

  @Column("char", { length: 10 })
  barCode: string;

  @Column("text")
  description: string;

  @Column("boolean")
  active: boolean;

  @Column("json")
  fakeAPI: string;

  @Column("simple-array")
  sizes: string[];
}
