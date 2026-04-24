import { Repository } from "typeorm";
import { OrdenTrabajo } from "../models/OrdenTrabajo";
import { Incidencia } from "../models/Incidencia";
import { PlanMantenimiento } from "../models/PlanMantenimiento";
import { Analisis } from "../models/Analisis";
import { EstadoOrden, TipoOrden } from "../enums/enums";
import { TareaMantenimiento } from "../models/TareaMantenimiento";
import { DetalleOrden } from "../models/DetalleOrden";

export class ServiceOrdenTrabajo {
  constructor(
    private ordenRepo: Repository<OrdenTrabajo>,
    private tareaRepo: Repository<TareaMantenimiento>,
    private detalleRepo: Repository<DetalleOrden>
  ) {}

  // =========================
  // 🔧 CORRECTIVO
  // =========================
  async crearCorrectivaDesdeIncidencia(incidencia: Incidencia) {
    const orden = this.ordenRepo.create({
      activo: incidencia.activo,
      tipo: TipoOrden.CORRECTIVO,
      estado: EstadoOrden.ABIERTA,
      descripcion: `Orden correctiva generada por incidencia: ${incidencia.descripcion}`,
      incidencia,
    });

    return await this.ordenRepo.save(orden);
  }

  // =========================
  // 🛠️ PREVENTIVO (DESDE PLAN)
  // =========================
  async crearPreventivaDesdePlan(plan: PlanMantenimiento) {
    // 🔹 1. Obtener tareas del plan
    const tareas = await this.tareaRepo.find({
      where: { plan: { id: plan.id } },
    });

    // 🔹 2. Convertir tareas → detalles de orden
    const detalles = tareas.map((t) =>
      this.detalleRepo.create({
        descripcion: t.descripcion,
        completado: false,
      })
    );

    // 🔹 3. Crear orden
    const orden = this.ordenRepo.create({
      activo: plan.activo,
      tipo: TipoOrden.PREVENTIVO,
      estado: EstadoOrden.ABIERTA, // ⚠️ corregido (no string)
      descripcion: `Mantenimiento preventivo: ${plan.descripcion}`,
      detalles,
    });

    return await this.ordenRepo.save(orden);
  }

  // =========================
  // 🧠 PREDICTIVO (ANÁLISIS)
  // =========================
  async crearPredictivaDesdeAnalisis(analisis: Analisis) {
    // 🔹 Evitar duplicados
    const existente = await this.ordenRepo.findOne({
      where: {
        analisis: { id: analisis.id },
      },
    });

    if (existente) {
      return existente;
    }

    const orden = this.ordenRepo.create({
      activo: analisis.activo,
      tipo: TipoOrden.PREDICTIVO,
      estado: EstadoOrden.ABIERTA,
      descripcion: "Orden generada automáticamente por análisis predictivo",
      analisis,
    });

    return await this.ordenRepo.save(orden);
  }

  // =========================
// ✅ COMPLETAR TAREA
// =========================
async completarDetalle(ordenId: number, detalleId: number) {
  const orden = await this.ordenRepo.findOne({
    where: { id: ordenId },
    relations: ["detalles"],
  });

  if (!orden) {
    throw new Error("Orden no encontrada");
  }

  const detalle = orden.detalles.find(d => d.id === detalleId);

  if (!detalle) {
    throw new Error("Detalle no encontrado en la orden");
  }

  // 🔹 marcar como completado
  detalle.completado = true;
  await this.detalleRepo.save(detalle);

  // 🔥 verificar si todas están completas
  const todasCompletas = orden.detalles.every(d => d.completado);

  if (todasCompletas) {
    orden.estado = EstadoOrden.FINALIZADA;
    orden.fechaCierre = new Date();
    await this.ordenRepo.save(orden);
  }

  return {
    detalle,
    ordenActualizada: todasCompletas ? orden : null,
  };
}

  // =========================
  // 🔄 CAMBIO DE ESTADO
  // =========================
  async cambiarEstado(ordenId: number, nuevoEstado: EstadoOrden) {
    const orden = await this.ordenRepo.findOne({
      where: { id: ordenId },
      relations: ["detalles"], // 🔥 importante para lógica futura
    });

    if (!orden) {
      throw new Error("Orden no encontrada");
    }

    // 🔥 regla importante (te sube nivel)
    if (nuevoEstado === EstadoOrden.FINALIZADA) {
      const hayPendientes = orden.detalles?.some(
        (d) => !d.completado
      );

      if (hayPendientes) {
        throw new Error(
          "No se puede finalizar la orden: hay tareas pendientes"
        );
      }

      orden.fechaCierre = new Date();
    }

    orden.estado = nuevoEstado;

    return await this.ordenRepo.save(orden);
  }
}