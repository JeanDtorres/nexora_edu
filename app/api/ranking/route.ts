import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { calcularProgresoConActividades } from "@/lib/progreso";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_edu_super_secret_jwt_key_2026";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autenticado." }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Token inválido." }, { status: 401 });
    }

    // Obtener todos los estudiantes (rol "normal")
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

    // Calcular progreso para cada usuario y mapear
    const rankingData = usuarios.map((user) => {
      const { stats } = calcularProgresoConActividades(false, user.actividades);
      return {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        ultimoAcceso: user.ultimo_acceso,
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

    // Añadir posición (rank)
    const rankingConPosicion = rankingData.map((user, idx) => ({
      ...user,
      posicion: idx + 1,
    }));

    return NextResponse.json({ success: true, ranking: rankingConPosicion });
  } catch (error) {
    console.error("Error en GET /api/ranking:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
