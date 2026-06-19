import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { obtenerProgresoEstudiante } from "@/lib/progreso";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_edu_super_secret_jwt_key_2026";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Token inválido." }, { status: 401 });
    }

    const { modulos, stats } = await obtenerProgresoEstudiante(decoded.id);

    return NextResponse.json({
      success: true,
      progreso: modulos, // Enviamos los módulos y sus lecciones
      resumen: {
        totalModulos: stats.totalModulos,
        modulosAprobados: stats.modulosAprobados,
        totalLecciones: stats.totalLecciones,
        leccionesLeidas: stats.leccionesLeidas,
        leccionesAprobadas: stats.leccionesAprobadas,
        promedioScore: stats.promedioScore,
        completado: stats.completado,
      },
    });
  } catch (error) {
    console.error("Error en GET /api/progreso:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
