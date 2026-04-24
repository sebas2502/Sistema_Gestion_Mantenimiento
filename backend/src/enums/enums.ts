export enum EstadoIncidencia {
  PENDIENTE = "PENDIENTE",
  VALIDADA = "VALIDADA",
  RECHAZADA = "RECHAZADA",
}

export enum EstadoOrden {
  ABIERTA = "ABIERTA",
  EN_PROCESO = "EN PROCESO",
  FINALIZADA = "FINALIZADA",
  CANCELADA = "CANCELADA",
}

export enum TipoMantenimiento {
  CORRECTIVO = "CORRECTIVO",
  PREVENTIVO = "PREVENTIVO",
}

export enum Criticidad {
  BAJA = "BAJA",
  MEDIA = "MEDIA",
  ALTA = "ALTA",
}

export enum Rol {
  ADMIN = "ADMIN",
  TECNICO = "TECNICO",
  OPERARIO = "OPERARIO",
  SUPERVISOR = "SUPERVISOR"
}

export enum Tendencia {
  AUMENTO = "AUMENTO_DE_FALLAS",
  ESTABLE = "ESTABLE",
  MEJORA = "MEJORA"
}

export enum TipoOrden {
  CORRECTIVO = "COORECTIVO",
  PREVENTIVO = "PREVENTIVO",
  PREDICTIVO = "PREDICTIVO"
}