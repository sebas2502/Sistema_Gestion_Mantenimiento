import { Incidencia } from "../models/Incidencia";
import { ServiceOrdenTrabajo } from "./ServiceOrdenTrabajo";
import { Repository, DeepPartial } from "typeorm";

export class ServiceIncidencia {
  constructor(
    private incidenciaRepo: Repository<Incidencia>,
    private ordenTrabajoService: ServiceOrdenTrabajo
  ) {}

  // =========================
  // 🛠️ CREAR INCIDENCIA
  // =========================
  async crearIncidencia(data: DeepPartial<Incidencia>) {

    // 🔴 VALIDACIÓN CLAVE
    if (Array.isArray(data)) {
      throw new Error("Se esperaba un objeto, no un array");
    }

    // 🔹 1. Crear entidad
    const incidencia = this.incidenciaRepo.create(data);

    // 🔹 2. Guardar
    const incidenciaGuardada = await this.incidenciaRepo.save(incidencia);

    // 🔥 3. Recargar con relaciones (CLAVE)
    const incidenciaCompleta = await this.incidenciaRepo.findOne({
      where: { id: incidenciaGuardada.id },
      relations: ["activo", "usuario"], // ajustá si no usás usuario
    });

    if (!incidenciaCompleta) {
      throw new Error("No se pudo recuperar la incidencia");
    }

    // Generar orden correctiva
    const orden =
      await this.ordenTrabajoService.crearCorrectivaDesdeIncidencia(
        incidenciaCompleta
      );

    // 🔹 5. Respuesta
    return {
      incidencia: incidenciaCompleta,
      ordenGenerada: orden,
    };
  }

  // =========================
  // 📋 OBTENER TODAS
  // =========================
  async obtenerIncidencias(): Promise<Incidencia[]> {
    return await this.incidenciaRepo.find({
      relations: ["activo", "usuario"],
      order: {
        fechaReporte: "DESC",
      },
    });
  }

  // =========================
  // 🔍 POR ID
  // =========================
  async obtenerIncidenciaPorId(id: number): Promise<Incidencia | null> {
    return await this.incidenciaRepo.findOne({
      where: { id },
      relations: ["activo", "usuario"],
    });
  }
}