import { Entity , PrimaryGeneratedColumn , Column, ManyToOne , CreateDateColumn , OneToOne } from "typeorm";
import { EstadoIncidencia , Criticidad } from "../enums/enums";
import { Activo } from "./Activo";
import { Usuario } from "./Usuario";
import { OrdenTrabajo } from "./OrdenTrabajo";

@Entity()
export class Incidencia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column({
    type: "enum",
    enum: EstadoIncidencia,
    default: EstadoIncidencia.PENDIENTE,
  })
  estado!: EstadoIncidencia;

  @Column({
    type: "enum",
    enum: Criticidad,
    nullable: true,
  })
  criticidad!: Criticidad;

  @CreateDateColumn()
  fechaReporte!: Date;

  @ManyToOne(() => Activo, (activo) => activo.incidencias)
  activo!: Activo;

  @ManyToOne(() => Usuario, (user) => user.incidenciasReportadas)
  usuario!: Usuario;

  // Puede generar una orden
  @OneToOne(() => OrdenTrabajo, (ot) => ot.incidencia, { nullable: true })
  ordenTrabajo!: OrdenTrabajo;
}