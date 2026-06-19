import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_edu_super_secret_jwt_key_2026";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  let decoded: any;
  try { decoded = jwt.verify(token, JWT_SECRET); } catch {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }

  const { moduloId, moduloTitulo, leccionId, leccionTitulo } = await req.json();
  if (!moduloId || !leccionId) return NextResponse.json({ error: "moduloId y leccionId requeridos." }, { status: 400 });

  // Solo crear si no existe una lectura reciente (últimas 24h) para evitar duplicados
  const existente = await prisma.actividad.findFirst({
    where: {
      usuario_id: decoded.id,
      tipo: "lectura",
      AND: [
        { metadatos: { contains: `"moduloId":${moduloId}` } },
        { metadatos: { contains: `"leccionId":${leccionId}` } }
      ],
      fecha_inicio: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  });

  if (!existente) {
    await prisma.actividad.create({
      data: {
        usuario_id: decoded.id,
        tipo: "lectura",
        estado: "completado",
        fecha_fin: new Date(),
        metadatos: JSON.stringify({
          moduloId,
          moduloTitulo: moduloTitulo ?? `Módulo ${moduloId}`,
          leccionId,
          leccionTitulo: leccionTitulo ?? `Lección ${leccionId}`
        }),
      },
    });
  }

  return NextResponse.json({ success: true });
}
