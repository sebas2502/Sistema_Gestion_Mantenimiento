import { Entity , PrimaryGeneratedColumn, Column , ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import { Activo } from "./Activo";
import { Alerta } from "./Alerta";
import { Tendencia } from "../enums/enums";

@Entity()
export class Analisis {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Activo, (activo) => activo.analisis)
  activo!: Activo;

  @CreateDateColumn()
  fecha!: Date;

  @Column({
    type:"enum",
    enum: Tendencia
  })
  tendencia!: Tendencia;

  @Column("decimal",{
    precision: 10,
    scale:2
  })
  mtbf!: number;

  @Column("decimal",{
    precision:10,
    scale:2
  })
  frecuenciaFallos!: number;

  
  @OneToMany(() => Alerta, (alerta) => alerta.analisis)
  alertas!: Alerta[];

}