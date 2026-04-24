import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

import { Activo } from "./Activo";
import { Incidencia } from "./Incidencia";
import { PlanMantenimiento } from "./PlanMantenimiento";
import { Analisis } from "./Analisis";
import { Usuario } from "./Usuario";
import { Intervencion } from "./Intervencion";
import { DetalleOrden } from "./DetalleOrden";

import { TipoOrden } from "../enums/enums";
import { EstadoOrden } from "../enums/enums";

@Entity()
export class OrdenTrabajo {
  @PrimaryGeneratedColumn()
  id!: number;

  // 🔹 Relación principal
  @ManyToOne(() => Activo, (activo) => activo.ordenesTrabajo)
  activo!: Activo;

  // 🔹 Tipo de mantenimiento
  @Column({
    type: "enum",
    enum: TipoOrden,
  })
  tipo!: TipoOrden;

  //Estado
  @Column({
    type: "enum",
    enum: EstadoOrden,
    default: EstadoOrden.ABIERTA,
  })
  estado!: EstadoOrden;

  //Descripción
  @Column()
  descripcion!: string;

  //Fecha de creación
  @CreateDateColumn()
  fechaCreacion!: Date;

  //Fecha de cierre
  @Column({ nullable: true })
  fechaCierre?: Date;

  // =========================
  // ORIGEN DE LA ORDEN
  // =========================

  // Correctivo
  @ManyToOne(() => Incidencia, { nullable: true })
  incidencia?: Incidencia;

  // Preventivo (planificado)
  @ManyToOne(() => PlanMantenimiento, { nullable: true })
  planMantenimiento?: PlanMantenimiento;

  // Predictivo (análisis)
  @ManyToOne(() => Analisis, { nullable: true })
  analisis?: Analisis;

  @OneToMany(() => DetalleOrden, detalle => detalle.orden, {
  cascade: true,
})
  detalles!: DetalleOrden[];

  // =========================
  // RESPONSABLE
  // =========================

  @ManyToOne(() => Usuario, { nullable: true })
  tecnicoAsignado?: Usuario;

  // =========================
  //  INTERVENCIONES
  // =========================

  @OneToMany(() => Intervencion, (i) => i.ordenTrabajo)
  intervenciones!: Intervencion[];
}