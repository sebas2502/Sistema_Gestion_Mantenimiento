import { Entity , PrimaryGeneratedColumn , Column , ManyToOne} from "typeorm";
import { OrdenTrabajo } from "./OrdenTrabajo";

@Entity()
export class DetalleOrden {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column({ default: false })
  completado!: boolean;

  @ManyToOne(() => OrdenTrabajo, orden => orden.detalles)
  orden!: OrdenTrabajo;
}