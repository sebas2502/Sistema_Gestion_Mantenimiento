import { Entity , PrimaryGeneratedColumn, CreateDateColumn , ManyToOne , Column} from "typeorm";
import { OrdenTrabajo } from "./OrdenTrabajo";
import { Usuario } from "./Usuario";

@Entity()
export class Intervencion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @CreateDateColumn()
  fecha!: Date;

  @Column("float")
  duracionHoras!: number;

  @ManyToOne(() => OrdenTrabajo, (ot) => ot.intervenciones)
  ordenTrabajo!: OrdenTrabajo;

  @ManyToOne(() => Usuario, (user) => user.intervenciones)
  tecnico!: Usuario;
}