import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 50 })
  name: string;

  @Column("char", { length: 11 })
  cpf: string;

  @Column("boolean")
  active: boolean;
}
