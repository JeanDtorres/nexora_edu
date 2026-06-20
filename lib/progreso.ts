import prisma from "@/lib/prisma";
import { contenidoModulos } from "@/data/contenidoModulos";

export interface LessonProgress {
  id: number; // 1, 2, 3
  titulo: string;
  leido: boolean;
  ultimaLectura: Date | null;
  evaluado: boolean;
  intentos: number;
  mejorPuntaje: number | null;
  ultimaEvaluacion: Date | null;
  aprobado: boolean; // mejorPuntaje >= 70
  desbloqueado: boolean;
}

export interface ModuleProgress {
  id: number;
  titulo: string;
  descripcionCorto: string;
  imagen: string;
  colorTheme: string;
  desbloqueado: boolean;
  lecciones: LessonProgress[];
  completado: boolean; // todas las lecciones aprobadas
}

export function calcularProgresoConActividades(isAdmin: boolean, actividades: any[]) {
  // Mapear actividades de forma legible
  const lecturas = actividades.filter((a) => a.tipo === "lectura");
  const evaluaciones = actividades.filter((a) => a.tipo === "evaluacion");

  // Helper para buscar lectura
  const buscarLectura = (moduloId: number, leccionId: number) => {
    return lecturas.find((l) => {
      try {
        const meta = l.metadatos ? JSON.parse(l.metadatos) : {};
        return Number(meta.moduloId) === moduloId && Number(meta.leccionId) === leccionId;
      } catch {
        return false;
      }
    });
  };

  // Helper para buscar evaluaciones
  const buscarEvaluaciones = (moduloId: number, leccionId: number) => {
    return evaluaciones.filter((e) => {
      try {
        const meta = e.metadatos ? JSON.parse(e.metadatos) : {};
        return Number(meta.moduloId) === moduloId && Number(meta.leccionId) === leccionId;
      } catch {
        return false;
      }
    });
  };

  // 1. Estructurar el progreso inicial sin calcular bloqueos
  const modulosProgreso: ModuleProgress[] = contenidoModulos.map((modulo) => {
    const leccionesProgreso: LessonProgress[] = modulo.lecciones.map((leccion) => {
      const lect = buscarLectura(modulo.id, leccion.id);
      const evs = buscarEvaluaciones(modulo.id, leccion.id);

      const scores = evs
        .map((e) => {
          try {
            const res = e.resultados[0]?.contenido ? JSON.parse(e.resultados[0].contenido) : null;
            return res?.puntaje ?? null;
          } catch {
            return null;
          }
        })
        .filter((s): s is number => s !== null);

      const mejorPuntaje = scores.length > 0 ? Math.max(...scores) : null;
      const aprobado = mejorPuntaje !== null && mejorPuntaje >= 70;

      return {
        id: leccion.id,
        titulo: leccion.titulo,
        leido: !!lect,
        ultimaLectura: lect?.fecha_inicio ?? null,
        evaluado: evs.length > 0,
        intentos: evs.length,
        mejorPuntaje,
        ultimaEvaluacion: evs[0]?.fecha_inicio ?? null,
        aprobado,
        desbloqueado: false, // se calcula en el siguiente paso
      };
    });

    return {
      id: modulo.id,
      titulo: modulo.titulo,
      descripcionCorto: modulo.descripcionCorto,
      imagen: modulo.imagen,
      colorTheme: modulo.colorTheme,
      desbloqueado: false, // se calcula en el siguiente paso
      lecciones: leccionesProgreso,
      completado: false, // se calcula en el siguiente paso
    };
  });

  // 2. Calcular los estados de bloqueo/desbloqueo secuencialmente
  if (isAdmin) {
    // Si es administrador, desbloquear todas las lecciones y módulos de forma incondicional
    modulosProgreso.forEach((m) => {
      m.desbloqueado = true;
      m.lecciones.forEach((l) => {
        l.desbloqueado = true;
      });
      m.completado = m.lecciones.every((l) => l.aprobado);
    });
  } else {
    // Módulo 1 está siempre desbloqueado
    modulosProgreso[0].desbloqueado = true;
    modulosProgreso[0].lecciones[0].desbloqueado = true; // Lección 1.1 siempre desbloqueada

    // Lección 1.2
    modulosProgreso[0].lecciones[1].desbloqueado = modulosProgreso[0].lecciones[0].aprobado;
    // Lección 1.3
    modulosProgreso[0].lecciones[2].desbloqueado = modulosProgreso[0].lecciones[1].aprobado;

    // Módulo 1 completado?
    modulosProgreso[0].completado = modulosProgreso[0].lecciones.every((l) => l.aprobado);

    // Módulo 2
    // Módulo 2 se desbloquea aprobando TODAS las lecciones de Módulo 1
    modulosProgreso[1].desbloqueado = modulosProgreso[0].completado;
    if (modulosProgreso[1].desbloqueado) {
      modulosProgreso[1].lecciones[0].desbloqueado = true; // Lección 2.1
      modulosProgreso[1].lecciones[1].desbloqueado = modulosProgreso[1].lecciones[0].aprobado; // Lección 2.2
      modulosProgreso[1].lecciones[2].desbloqueado = modulosProgreso[1].lecciones[1].aprobado; // Lección 2.3
    }
    modulosProgreso[1].completado = modulosProgreso[1].lecciones.every((l) => l.aprobado);

    // Módulo 3
    // Módulo 3 se desbloquea aprobando TODAS las lecciones de Módulo 2
    modulosProgreso[2].desbloqueado = modulosProgreso[1].completado;
    if (modulosProgreso[2].desbloqueado) {
      modulosProgreso[2].lecciones[0].desbloqueado = true; // Lección 3.1
      modulosProgreso[2].lecciones[1].desbloqueado = modulosProgreso[2].lecciones[0].aprobado; // Lección 3.2
      modulosProgreso[2].lecciones[2].desbloqueado = modulosProgreso[2].lecciones[1].aprobado; // Lección 3.3
    }
    modulosProgreso[2].completado = modulosProgreso[2].lecciones.every((l) => l.aprobado);
  }

  // 3. Métricas Globales
  let totalLecciones = 0;
  let leccionesLeidas = 0;
  let leccionesAprobadas = 0;
  let leccionesEvaluadas = 0;
  let intentosTotales = 0;
  const mejoresPuntajes: number[] = [];

  modulosProgreso.forEach((m) => {
    m.lecciones.forEach((l) => {
      totalLecciones++;
      if (l.leido) leccionesLeidas++;
      if (l.aprobado) leccionesAprobadas++;
      if (l.evaluado) leccionesEvaluadas++;
      intentosTotales += l.intentos;
      if (l.mejorPuntaje !== null) {
        mejoresPuntajes.push(l.mejorPuntaje);
      }
    });
  });

  const promedioScore = mejoresPuntajes.length > 0
    ? Math.round(mejoresPuntajes.reduce((s, p) => s + p, 0) / mejoresPuntajes.length)
    : null;

  const totalModulos = modulosProgreso.length;
  const modulosAprobados = modulosProgreso.filter((m) => m.completado).length;

  return {
    modulos: modulosProgreso,
    stats: {
      totalModulos,
      modulosAprobados,
      totalLecciones,
      leccionesLeidas,
      leccionesAprobadas,
      leccionesEvaluadas,
      intentosTotales,
      promedioScore,
      completado: modulosProgreso.every((m) => m.completado),
    }
  };
}

export async function obtenerProgresoEstudiante(usuarioId: number) {
  // Obtener rol del usuario
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { rol: true },
  });
  const isAdmin = usuario?.rol === "admin";

  // Obtener todas las actividades completadas del usuario
  const actividades = await prisma.actividad.findMany({
    where: { usuario_id: usuarioId, estado: "completado" },
    include: { resultados: true },
    orderBy: { fecha_inicio: "desc" },
  });

  return calcularProgresoConActividades(isAdmin, actividades);
}
