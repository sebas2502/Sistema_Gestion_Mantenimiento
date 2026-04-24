import { Entity , PrimaryGeneratedColumn, Column , OneToMany } from "typeorm";
import { Incidencia } from "./Incidencia";
import { Intervencion } from "./Intervencion";
import { OrdenTrabajo } from "./OrdenTrabajo";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  rol!: string; 

  @OneToMany(() => Incidencia, (inc) => inc.usuario)
  incidenciasReportadas!: Incidencia[];

  @OneToMany(() => OrdenTrabajo, (ot) => ot.tecnicoAsignado)
  ordenesAsignadas!: OrdenTrabajo[];

  @OneToMany(() => Intervencion, (i) => i.tecnico)
  intervenciones!: Intervencion[];
}