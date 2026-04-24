import { Entity , PrimaryGeneratedColumn,Column, ManyToOne , OneToMany } from "typeorm";
import { Activo } from "./Activo";
import { TareaMantenimiento } from "./TareaMantenimiento";

@Entity()
export class PlanMantenimiento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  fechaUltimaEjecucion!: Date;

  @Column()
  frecuenciaDias!: number;

  @Column({default : true})
  estaActivo!: boolean;

  @ManyToOne(() => Activo, (activo) => activo.planes)
  activo!: Activo;

  @OneToMany(() => TareaMantenimiento, (t) => t.plan)
  tareas!: TareaMantenimiento[];
}