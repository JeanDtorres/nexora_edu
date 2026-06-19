import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import BotonExportarPDF from "./BotonExportarPDF";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_edu_super_secret_jwt_key_2026";

export default async function AdminReportesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  let decoded: any;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    redirect("/login");
  }

  if (decoded.rol !== "admin") {
    redirect("/dashboard");
  }

  /* ─── Fetch data from db ─── */
  const [actividades, resultados] = await Promise.all([
    prisma.actividad.findMany({
      include: {
        usuario: { select: { nombre: true, email: true } },
      },
      orderBy: { fecha_inicio: "desc" },
    }),
    prisma.resultado.findMany({
      include: {
        actividad: {
          include: {
            usuario: { select: { nombre: true, email: true } },
          },
        },
      },
      orderBy: { generado_en: "desc" },
    }),
  ]);

  /* ─── Mapear datos ─── */
  const interaccionesMapeadas = actividades.map((a) => {
    const meta = a.metadatos ? JSON.parse(a.metadatos) : {};
    let tipoFormateado = "Lectura";
    let detalle = "";
    if (a.tipo === "lectura") {
      tipoFormateado = "Lectura";
      detalle = `${meta.moduloTitulo ?? `Módulo ${meta.moduloId}`} · Lección ${meta.leccionId ?? ""}`;
    } else if (a.tipo === "evaluacion") {
      tipoFormateado = "Evaluación";
      detalle = `${meta.moduloTitulo ?? `Módulo ${meta.moduloId}`} · Lección ${meta.leccionId ?? ""}`;
    }

    return {
      usuario: a.usuario.nombre,
      fecha: new Date(a.fecha_inicio).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      tipo: tipoFormateado,
      estado: a.estado === "completado" ? "Completado" : a.estado,
      detalle,
    };
  });

  const resultadosMapeados = resultados.map((r) => {
    const act = r.actividad;
    const meta = act.metadatos ? JSON.parse(act.metadatos) : {};
    const content = r.contenido ? JSON.parse(r.contenido) : {};
    
    return {
      usuario: act.usuario.nombre,
      modulo: `${meta.moduloTitulo ?? `Módulo ${meta.moduloId}`}${meta.leccionId ? ` · Lección ${meta.leccionId}` : ""}`,
      porcentaje: content.puntaje ?? 0,
      fecha: new Date(r.generado_en).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 flex-1 w-full">
      {/* Cabecera */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 mb-8 anim-fade-up"
        style={{
          background: "linear-gradient(135deg, rgba(109,40,217,0.12) 0%, rgba(10,10,22,0.9) 60%)",
          border: "1px solid rgba(139,92,246,0.2)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 60px rgba(109,40,217,0.04)",
        }}>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <nav className="flex items-center gap-2 text-xs mb-5" style={{ color: "#4b5563" }}>
              <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">Dashboard</Link>
              <span>/</span>
              <Link href="/admin/config" className="hover:text-zinc-300 transition-colors">Administración</Link>
              <span>/</span>
              <span style={{ color: "#a78bfa" }}>Reportes</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Reportes Académicos
            </h1>
            <p className="mt-2 text-sm max-w-xl" style={{ color: "#6b7280" }}>
              Visualiza el historial detallado de interacciones de lecciones y resultados de evaluaciones, y expórtalos en PDF.
            </p>
          </div>

          <div className="flex gap-3 shrink-0 self-start md:self-center">
            <BotonExportarPDF
              interacciones={interaccionesMapeadas}
              resultados={resultadosMapeados}
            />
            <Link
              href="/admin/config"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#9ca3af",
              }}
            >
              Consola
            </Link>
          </div>
        </div>
      </div>

      {/* Grid de Tablas */}
      <div className="grid grid-cols-1 gap-8 anim-fade-up delay-150">
        
        {/* Tabla 1: Interacciones */}
        <div className="rounded-3xl p-6 sm:p-8"
          style={{
            background: "rgba(10,10,22,0.7)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📖</span> Registro de Interacciones y Actividades
          </h2>
          
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-950/40" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Usuario", "Fecha / Hora", "Tipo Actividad", "Detalle Lección", "Estado"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {interaccionesMapeadas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-zinc-500">No hay interacciones registradas.</td>
                  </tr>
                ) : (
                  interaccionesMapeadas.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-white">{item.usuario}</td>
                      <td className="px-5 py-3.5 text-zinc-400 text-xs">{item.fecha}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${item.tipo === "Lectura" ? "bg-sky-500/5 border-sky-500/10 text-sky-400" : "bg-violet-500/5 border-violet-500/10 text-violet-400"}`}>
                          {item.tipo}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-zinc-350">{item.detalle}</td>
                      <td className="px-5 py-3.5">
                        <span className="text-emerald-400 text-xs font-medium">✓ {item.estado}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla 2: Resultados */}
        <div className="rounded-3xl p-6 sm:p-8"
          style={{
            background: "rgba(10,10,22,0.7)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📝</span> Resultados Académicos de Evaluaciones
          </h2>
          
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-950/40" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Usuario", "Tema Evaluado", "Calificación", "Fecha"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {resultadosMapeados.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-zinc-500">No hay evaluaciones registradas.</td>
                  </tr>
                ) : (
                  resultadosMapeados.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-white">{item.usuario}</td>
                      <td className="px-5 py-3.5 text-zinc-350">{item.modulo}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-black border ${item.porcentaje >= 70 ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-red-500/5 border-red-500/20 text-red-400"}`}>
                          {item.porcentaje}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-zinc-400 text-xs">{item.fecha}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
