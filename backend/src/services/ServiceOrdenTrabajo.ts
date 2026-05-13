import { Repository } from "typeorm";
import { OrdenTrabajo } from "../models/OrdenTrabajo";
import { PlanMantenimiento } from "../models/PlanMantenimiento";
import { Analisis } from "../models/Analisis";
import { DetalleOrden } from "../models/DetalleOrden";
import { EstadoOrden, TipoOrden } from "../enums/enums";
import { Incidencia } from "../models/Incidencia";

export class ServiceOrdenTrabajo {
  constructor(
    private ordenRepo: Repository<OrdenTrabajo>,
    private detalleRepo: Repository<DetalleOrden>
  ) {}

  // =========================
  // 🟡 PREVENTIVO
  // =========================
  async crearPreventivaDesdePlan(plan: PlanMantenimiento) {
    const orden = this.ordenRepo.create({
      tipo: TipoOrden.PREVENTIVO,
      activo: { id: plan.activo.id } as any,
      descripcion: `Mantenimiento preventivo - ${plan.activo.nombre}`,
      estado: EstadoOrden.EN_PROCESO,
      planMantenimiento: { id: plan.id } as any,
    });

    const ordenGuardada = await this.ordenRepo.save(orden);

    const detalles = plan.tareas.map((t) =>
      this.detalleRepo.create({
        descripcion: t.descripcion,
        completado: false,
        orden: ordenGuardada,
      })
    );

    await this.detalleRepo.save(detalles);

    ordenGuardada.detalles = detalles;

    return ordenGuardada;
  }

  // =========================
  // 🔵 PREDICTIVO
  // =========================
  async crearPredictivaDesdeAnalisis(analisis: Analisis) {
    const orden = this.ordenRepo.create({
      tipo: TipoOrden.PREDICTIVO,
      activo: { id: analisis.activo.id } as any,
      descripcion: "Mantenimiento predictivo",
      estado: EstadoOrden.EN_PROCESO,
      analisis: { id: analisis.id } as any,
    });

    const ordenGuardada = await this.ordenRepo.save(orden);

    let detalles: DetalleOrden[] = [];

    if (analisis.mtbf < 50) {
      detalles.push(
        this.detalleRepo.create({
          descripcion: "Inspección urgente del activo",
          completado: false,
          orden: ordenGuardada,
        })
      );
    }

    if (analisis.tendencia === "AUMENTO_DE_FALLAS") {
      detalles.push(
        this.detalleRepo.create({
          descripcion: "Revisión completa del activo",
          completado: false,
          orden: ordenGuardada,
        })
      );
    }

    if (detalles.length === 0) {
      detalles.push(
        this.detalleRepo.create({
          descripcion: "Monitoreo general del activo",
          completado: false,
          orden: ordenGuardada,
        })
      );
    }

    await this.detalleRepo.save(detalles);

    ordenGuardada.detalles = detalles;

    return ordenGuardada;
  }

  async crearCorrectivaDesdeIncidencia(
  incidencia: Incidencia
) {
  const orden = this.ordenRepo.create({
    tipo: TipoOrden.CORRECTIVO,

    activo: { id: incidencia.activo.id } as any,

    descripcion: `Orden correctiva generada por incidencia #${incidencia.id}`,

    estado: EstadoOrden.EN_PROCESO,

    incidencia: { id: incidencia.id } as any,
  });

  const ordenGuardada = await this.ordenRepo.save(orden);

  // 🔹 Crear detalle inicial
  const detalle = this.detalleRepo.create({
    descripcion: incidencia.descripcion,
    completado: false,
    orden: ordenGuardada,
  });

  await this.detalleRepo.save(detalle);

  ordenGuardada.detalles = [detalle];

  return ordenGuardada;
}

  // =========================
  // 📋 LISTADO
  // =========================
  async obtenerOrdenes() {
    return await this.ordenRepo.find({
      relations: ["activo", "detalles"],
      order: { id: "DESC" },
    });
  }

  // =========================
  // 🔍 DETALLE POR ID (🔥 FIX CLAVE)
  // =========================
  async obtenerOrdenPorId(id: number) {
    const orden = await this.ordenRepo
      .createQueryBuilder("orden")
      .leftJoinAndSelect("orden.activo", "activo")
      .leftJoinAndSelect("orden.detalles", "detalles")
      .where("orden.id = :id", { id })
      .getOne();

    if (!orden) {
      throw new Error("Orden no encontrada");
    }

    return orden;
  }

  // =========================
  // ✅ COMPLETAR TAREA
  // =========================
  async completarDetalle(detalleId: number) {
    const detalle = await this.detalleRepo.findOne({
      where: { id: detalleId },
      relations: ["orden", "orden.detalles"],
    });

    if (!detalle) throw new Error("Detalle no encontrado");

    detalle.completado = true;
    await this.detalleRepo.save(detalle);

    const todas = detalle.orden.detalles.every((d) => d.completado);

    if (todas) {
      detalle.orden.estado = EstadoOrden.FINALIZADA;
      detalle.orden.fechaCierre = new Date();
      await this.ordenRepo.save(detalle.orden);
    }

    return detalle;
  }
}