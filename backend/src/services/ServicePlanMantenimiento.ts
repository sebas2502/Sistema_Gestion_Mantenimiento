import { Repository } from "typeorm";
import { PlanMantenimiento } from "../models/PlanMantenimiento";
import { ServiceOrdenTrabajo } from "./ServiceOrdenTrabajo";

export class ServicePlanMantenimiento {
  constructor(
    private planRepo: Repository<PlanMantenimiento>,
    private ordenService: ServiceOrdenTrabajo
  ) {}

  // 🔍 1. Evaluar planes
  async ejecutarPlanesPreventivos() {
    const planes = await this.planRepo.find({
      where: { activo: true },
      relations: ["activo"],
    });

    const hoy = new Date();

    const resultados = [];

    for (const plan of planes) {
      const ultima = plan.fechaUltimaEjecucion;

      const diasDesdeUltima =
        (hoy.getTime() - ultima.getTime()) / (1000 * 60 * 60 * 24);

     
      if (diasDesdeUltima >= plan.frecuenciaDias) {
        const orden =
          await this.ordenService.crearPreventivaDesdePlan(plan);

        // actualizar última ejecución
        plan.fechaUltimaEjecucion = hoy;
        await this.planRepo.save(plan);

        resultados.push({
          planId: plan.id,
          orden,
        });
      }
    }
    
    return resultados;
  }
}