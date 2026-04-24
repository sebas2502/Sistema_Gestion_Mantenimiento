import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Analisis } from "./Analisis";
import { Activo } from "./Activo";

@Entity()
export class Alerta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mensaje!: string;

  @CreateDateColumn()
  fecha!: Date;

  @ManyToOne(() => Activo, (activo) => activo.alertas)
  activo!: Activo;

  @ManyToOne(() => Analisis, (analisis) => analisis.alertas)
  analisis!: Analisis;
}