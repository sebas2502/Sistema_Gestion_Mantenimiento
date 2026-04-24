import { Entity , PrimaryGeneratedColumn , Column, OneToMany } from "typeorm";
import { Incidencia } from "./Incidencia";
import { OrdenTrabajo } from "./OrdenTrabajo";
import { PlanMantenimiento } from "./PlanMantenimiento";
import { Alerta } from "./Alerta";
import { Analisis } from "./Analisis";

@Entity()
export class Activo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  codigo!: string;

  @Column()
  ubicacion!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @OneToMany(() => Incidencia, (inc) => inc.activo)
  incidencias!: Incidencia[];

  @OneToMany(() => OrdenTrabajo, (ot) => ot.activo)
  ordenesTrabajo!: OrdenTrabajo[];

  @OneToMany(() => PlanMantenimiento, (plan) => plan.activo)
  planes!: PlanMantenimiento[];

  @OneToMany(() => Analisis, (analisis) => analisis.activo)
  analisis!: Analisis[];

  @OneToMany(() => Alerta, (alerta) => alerta.activo)
  alertas!: Alerta[];
}