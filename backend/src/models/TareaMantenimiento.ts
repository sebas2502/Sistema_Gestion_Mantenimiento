import { Entity ,PrimaryGeneratedColumn , Column , ManyToOne } from "typeorm";
import { PlanMantenimiento } from "./PlanMantenimiento";

@Entity()
export class TareaMantenimiento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @ManyToOne(() => PlanMantenimiento, (plan) => plan.tareas)
  plan!: PlanMantenimiento;
}