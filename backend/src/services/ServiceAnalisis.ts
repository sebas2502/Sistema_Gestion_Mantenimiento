import { Repository } from "typeorm";
import { Incidencia } from "../models/Incidencia";
import { Analisis } from "../models/Analisis";
import { Alerta } from "../models/Alerta";
import { ServiceRecomendacion } from "./ServiceRecomendacion";
import { ServiceOrdenTrabajo } from "./ServiceOrdenTrabajo";
import { Tendencia } from "../enums/enums";
import { OrdenTrabajo } from "../models/OrdenTrabajo";


export class ServiceAnalisis {
  constructor(
  private repoIncidencia: Repository<Incidencia>,
  private repoAnalisis: Repository<Analisis>,
  private alertaRepo: Repository<Alerta>,
  private recomendacionService: ServiceRecomendacion,
  private ordenTrabajoService: ServiceOrdenTrabajo
  ) {}

  async analizarActivo(activoId: number) {
    let ordenGenerada = null;
    let motivoOrden = null;

    // 🔹 1. Obtener incidencias
    const incidencias = await this.repoIncidencia.find({
      where: { activo: { id: activoId } },
      order: { fechaReporte: "ASC" },
    });

    if (incidencias.length < 2) {
      throw new Error("No hay suficientes datos para análisis");
    }

    // 🔹 2. Cálculos
    const mtbf = Number(this.calcularMTBF(incidencias).toFixed(2));
    const frecuencia = Number(
      this.calcularFrecuencia(incidencias).toFixed(2)
    );
    const tendencia = this.detectarTendencia(incidencias);

    // 🔹 3. Crear análisis
    const analisis = this.repoAnalisis.create({
            activo: { id: activoId } as any,   
            mtbf,
            frecuenciaFallos: frecuencia,
            tendencia,
    });

    await this.repoAnalisis.save(analisis);

    // 🔹 4. Generar alertas
    const alertas = await this.generarAlertas(
      analisis,
      mtbf,
      frecuencia,
      tendencia
    );

    // 🔹 5. Generar sugerencias
    const sugerencias =
      this.recomendacionService.generarSugerencias(analisis);



    //GENERAR ORDEN AUTOMÁTICA (PREDICTIVO)
   

// validar si ya existe orden abierta
   const existeOrdenAbierta =
    await this.ordenTrabajoService.obtenerOrdenAbiertaPorActivo(
    activoId
  );

   if (mtbf < 50 && tendencia === Tendencia.AUMENTO) {
  if (!existeOrdenAbierta) {
    ordenGenerada =
      await this.ordenTrabajoService.crearPredictivaDesdeAnalisis(analisis);
  } else {
    motivoOrden = "YA_EXISTE_ORDEN_ABIERTA";
  }
}

    // 🔹 7. Limpiar alertas
    const alertasLimpias = alertas.map((a) => ({
      id: a.id,
      mensaje: a.mensaje,
      fecha: a.fecha,
    }));

    // 🔹 8. Respuesta final
    return {
      analisis,
      alertas: alertasLimpias,
      sugerencias,
      ordenGenerada,
      motivoOrden
    };
  }

  // =========================
  // 📊 MTBF
  // =========================
  private calcularMTBF(incidencias: Incidencia[]): number {
    let totalTiempo = 0;

    for (let i = 1; i < incidencias.length; i++) {
      const anterior = incidencias[i - 1].fechaReporte.getTime();
      const actual = incidencias[i].fechaReporte.getTime();

      totalTiempo += actual - anterior;
    }

    const promedioMs = totalTiempo / (incidencias.length - 1);

    return promedioMs / (1000 * 60 * 60);
  }

  // =========================
  // 📈 FRECUENCIA
  // =========================
  private calcularFrecuencia(incidencias: Incidencia[]): number {
    const primera = incidencias[0].fechaReporte.getTime();
    const ultima =
      incidencias[incidencias.length - 1].fechaReporte.getTime();

    const dias = (ultima - primera) / (1000 * 60 * 60 * 24);

    return incidencias.length / (dias || 1);
  }

  // =========================
  // 📉 TENDENCIA
  // =========================
  private detectarTendencia(
    incidencias: Incidencia[]
  ): Tendencia {
    const mitad = Math.floor(incidencias.length / 2);

    const primeras = incidencias.slice(0, mitad);
    const ultimas = incidencias.slice(mitad);

    const freq1 = this.calcularFrecuencia(primeras);
    const freq2 = this.calcularFrecuencia(ultimas);

    if (freq2 > freq1 * 1.2) return Tendencia.AUMENTO;
    if (freq2 < freq1 * 0.8) return Tendencia.MEJORA;

    return Tendencia.ESTABLE;
  }

  // =========================
  // 🚨 ALERTAS
  // =========================
  private async generarAlertas(
    analisis: Analisis,
    mtbf: number,
    frecuencia: number,
    tendencia: Tendencia
  ): Promise<Alerta[]> {
    const alertas: Alerta[] = [];

    if (mtbf < 50) {
      alertas.push(
        this.alertaRepo.create({
          mensaje: "MTBF bajo: posible falla recurrente",
          activo: analisis.activo,
          analisis,
        })
      );
    }

    if (frecuencia > 0.5) {
      alertas.push(
        this.alertaRepo.create({
          mensaje: "Alta frecuencia de fallas",
          activo: analisis.activo,
          analisis,
        })
      );
    }

    if (tendencia === Tendencia.AUMENTO) {
      alertas.push(
        this.alertaRepo.create({
          mensaje: "Tendencia negativa detectada",
          activo: analisis.activo,
          analisis,
        })
      );
    }

    return await this.alertaRepo.save(alertas);
  }
}