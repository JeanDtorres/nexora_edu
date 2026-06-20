import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { calcularProgresoConActividades } from "@/lib/progreso";
import RankingClient from "./RankingClient";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_edu_super_secret_jwt_key_2026";

export default async function RankingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  let decoded: any;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    redirect("/login");
  }

  // Obtener todos los estudiantes (rol === "normal") y sus actividades
  const usuarios = await prisma.usuario.findMany({
    where: { rol: "normal" },
    include: {
      actividades: {
        where: { estado: "completado" },
        include: { resultados: true },
        orderBy: { fecha_inicio: "desc" },
      },
    },
  });

  // Calcular métricas y convertir a formato plano (JSON-serializable)
  const rankingData = usuarios.map((user) => {
    const { stats } = calcularProgresoConActividades(false, user.actividades);
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      ultimoAcceso: user.ultimo_acceso ? user.ultimo_acceso.toISOString() : null,
      leccionesAprobadas: stats.leccionesAprobadas,
      promedioScore: stats.promedioScore ?? 0,
      modulosAprobados: stats.modulosAprobados,
      totalLecciones: stats.totalLecciones,
    };
  });

  // Ordenar ranking:
  // 1. Mayor cantidad de lecciones aprobadas
  // 2. Mayor promedio de calificación
  // 3. Orden alfabético por nombre
  rankingData.sort((a, b) => {
    if (b.leccionesAprobadas !== a.leccionesAprobadas) {
      return b.leccionesAprobadas - a.leccionesAprobadas;
    }
    if (b.promedioScore !== a.promedioScore) {
      return b.promedioScore - a.promedioScore;
    }
    return a.nombre.localeCompare(b.nombre);
  });

  // Asignar posición (rank)
  const rankingConPosicion = rankingData.map((user, idx) => ({
    ...user,
    posicion: idx + 1,
  }));

  return (
    <RankingClient 
      initialRanking={rankingConPosicion} 
      currentUserId={decoded.id} 
    />
  );
}
