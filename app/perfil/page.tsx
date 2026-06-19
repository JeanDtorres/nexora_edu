import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { obtenerProgresoEstudiante } from "@/lib/progreso";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_edu_super_secret_jwt_key_2026";

const scoreColor = (p: number) =>
  p >= 70 ? "#34d399" : "#f87171";
const scoreBg = (p: number) =>
  p >= 70 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)";
const scoreBdr = (p: number) =>
  p >= 70 ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)";

export default async function PerfilPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  let decoded: any;
  try { decoded = jwt.verify(token, JWT_SECRET); } catch { redirect("/login"); }

  const usuario = await prisma.usuario.findUnique({
    where: { id: decoded.id },
    select: { id: true, nombre: true, email: true, rol: true, creado_en: true, ultimo_acceso: true },
  });
  if (!usuario) redirect("/login");

  const actividades = await prisma.actividad.findMany({
    where: { usuario_id: decoded.id, estado: "completado" },
    include: { resultados: true },
    orderBy: { fecha_inicio: "desc" },
  });

  // Obtener progreso centralizado
  const { modulos, stats } = await obtenerProgresoEstudiante(usuario.id);

  /* ─── Stats globales ─── */
  const totalEvals    = actividades.filter((a) => a.tipo === "evaluacion").length;
  const totalLecturas = actividades.filter((a) => a.tipo === "lectura").length;
  const promedio      = stats.promedioScore;
  const completado    = stats.completado;
  
  const leccionesLeidas = stats.leccionesLeidas;
  const leccionesAprobadas = stats.leccionesAprobadas;
  const totalLecciones = stats.totalLecciones;

  /* ─── Iniciales ─── */
  const iniciales = usuario.nombre.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

  const MODULE_ACCENT = ["#2563eb", "#0ea5e9", "#38bdf8"];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 flex-1 w-full">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-8 anim-fade-up" style={{ color: "#4b5563" }}>
        <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">Dashboard</Link>
        <span>/</span>
        <span style={{ color: "#60a5fa" }}>Mi Perfil</span>
      </nav>

      {/* Hero card */}
      <div className="relative overflow-hidden rounded-3xl p-7 sm:p-10 mb-8 anim-fade-up"
        style={{
          background: "linear-gradient(135deg, rgba(30,64,175,0.12) 0%, rgba(10,10,22,0.9) 70%)",
          border: "1px solid rgba(37,99,235,0.2)",
          backdropFilter: "blur(20px)",
        }}>
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-24 w-24 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl"
              style={{ background: "linear-gradient(135deg, #1e40af, #0284c7)", boxShadow: "0 0 40px rgba(30,64,175,0.4)" }}>
              {iniciales}
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2"
              style={{ background: "#34d399", borderColor: "#05050f" }} />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{usuario.nombre}</h1>
              <span className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{
                  background: usuario.rol === "admin" ? "rgba(239,68,68,0.1)" : "rgba(37,99,235,0.1)",
                  border: `1px solid ${usuario.rol === "admin" ? "rgba(239,68,68,0.25)" : "rgba(37,99,235,0.25)"}`,
                  color: usuario.rol === "admin" ? "#f87171" : "#60a5fa",
                }}>
                {usuario.rol === "admin" ? "Administrador" : "Estudiante"}
              </span>
              {completado && (
                <span className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7" }}>
                  ✓ Curso completado
                </span>
              )}
            </div>
            <p className="text-sm mb-4" style={{ color: "#6b7280" }}>{usuario.email}</p>

            <p className="text-xs" style={{ color: "#4b5563" }}>
              Miembro desde {new Date(usuario.creado_en).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          {/* Promedio badge */}
          {promedio !== null && (
            <div className="shrink-0 rounded-2xl px-6 py-4 text-center"
              style={{ background: scoreBg(promedio), border: `1px solid ${scoreBdr(promedio)}` }}>
              <p className="text-3xl font-black" style={{ color: scoreColor(promedio) }}>{promedio}%</p>
              <p className="text-xs uppercase tracking-wider mt-1" style={{ color: "#4b5563" }}>Promedio</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 anim-fade-up delay-150">
        {[
          { label: "Lecciones leídas",   value: `${leccionesLeidas}/${totalLecciones}`,  color: "#38bdf8" },
          { label: "Lecciones aprobadas", value: `${leccionesAprobadas}/${totalLecciones}`, color: "#60a5fa" },
          { label: "Intentos evaluados", value: totalEvals,                                     color: "#fbbf24" },
          { label: "Lecturas registradas",value: totalLecturas,                                  color: "#34d399" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl px-5 py-4 text-center"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs uppercase tracking-wider mt-1" style={{ color: "#4b5563" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Progreso general */}
      <div className="rounded-2xl p-6 mb-8 anim-fade-up delay-200"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b7280" }}>Progreso de Aprobación del Curso</span>
          <span className="text-xs font-bold" style={{ color: "#60a5fa" }}>
            {Math.round((leccionesAprobadas / totalLecciones) * 100)}%
          </span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full progress-bar-fill"
            style={{
              width: `${Math.round((leccionesAprobadas / totalLecciones) * 100)}%`,
              background: "linear-gradient(90deg, #1e40af, #0284c7, #06b6d4)",
              "--target-width": `${Math.round((leccionesAprobadas / totalLecciones) * 100)}%`,
            } as React.CSSProperties} />
        </div>
      </div>

      {/* Módulos */}
      <h2 className="text-sm font-bold uppercase tracking-widest mb-4 anim-fade-up delay-250" style={{ color: "#4b5563" }}>
        Estado por módulo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {modulos.map((p, idx) => {
          const accent = MODULE_ACCENT[idx % 3];
          const leccionesAprobadasCount = p.lecciones.filter(l => l.aprobado).length;
          const leccionesLeidasCount = p.lecciones.filter(l => l.leido).length;
          
          return (
            <div key={p.id} className="rounded-2xl overflow-hidden anim-scale-in flex flex-col justify-between"
              style={{
                background: "rgba(10,10,22,0.7)",
                border: `1px solid ${p.desbloqueado ? `${accent}33` : "rgba(255,255,255,0.07)"}`,
                animationDelay: `${idx * 80}ms`,
              }}>
              {/* Image */}
              <div className="relative h-28 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.imagen} alt={p.titulo} className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,15,0.95), transparent)" }} />
                
                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {!p.desbloqueado ? (
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm"
                      style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
                      🔒 Bloqueado
                    </span>
                  ) : p.completado ? (
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm"
                      style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#6ee7b7" }}>
                      ✓ Completado
                    </span>
                  ) : (
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#38bdf8" }}>
                      En curso
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: p.desbloqueado ? accent : "#4b5563" }}>
                    Módulo {p.id}
                  </span>
                  <h3 className="text-sm font-bold text-white mb-4 leading-snug">
                    {p.titulo} {!p.desbloqueado && "🔒"}
                  </h3>

                  {p.desbloqueado ? (
                    <div className="mb-4 space-y-2.5">
                      {/* Read progress */}
                      <div>
                        <div className="flex justify-between text-[11px] mb-1" style={{ color: "#6b7280" }}>
                          <span>Lecciones leídas</span>
                          <span className="font-semibold text-zinc-300">{leccionesLeidasCount} / 3</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="h-full rounded-full"
                            style={{ width: `${(leccionesLeidasCount / 3) * 100}%`, background: "#38bdf8", transition: "width 0.7s ease" }} />
                        </div>
                      </div>

                      {/* Passed progress */}
                      <div>
                        <div className="flex justify-between text-[11px] mb-1" style={{ color: "#6b7280" }}>
                          <span>Lecciones aprobadas</span>
                          <span className="font-semibold text-zinc-300">{leccionesAprobadasCount} / 3</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="h-full rounded-full"
                            style={{ width: `${(leccionesAprobadasCount / 3) * 100}%`, background: "#34d399", transition: "width 0.7s ease" }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs mb-4 text-zinc-650">Desbloquea aprobando todas las lecciones del módulo anterior.</p>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  {p.desbloqueado ? (
                    <Link href={`/modulos/${p.id}`}
                      className="flex-1 text-center rounded-xl py-2.5 text-xs font-bold transition-all duration-200 hover:scale-[1.02] text-white"
                      style={{
                        background: `${accent}18`,
                        border: `1px solid ${accent}44`,
                      }}>
                      Ingresar al Módulo
                    </Link>
                  ) : (
                    <button disabled
                      className="flex-1 text-center rounded-xl py-2.5 text-xs font-semibold text-zinc-600 bg-zinc-900/40 border border-zinc-900 cursor-not-allowed w-full">
                      Bloqueado 🔒
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actividad reciente */}
      {actividades.length > 0 && (
        <div className="anim-fade-up">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#4b5563" }}>Actividad reciente</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {actividades.slice(0, 8).map((a, idx) => {
              const meta = a.metadatos ? JSON.parse(a.metadatos) : {};
              const contenido = a.resultados[0]?.contenido ? JSON.parse(a.resultados[0].contenido) : null;
              const esLectura = a.tipo === "lectura";
              
              return (
                <div key={a.id} className="flex items-center justify-between px-5 py-3.5 gap-4 anim-fade-left"
                  style={{
                    borderBottom: idx < Math.min(actividades.length, 8) - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    animationDelay: `${idx * 40}ms`,
                  }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg shrink-0">{esLectura ? "📖" : "📝"}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {esLectura ? "Lección leída" : "Evaluación de lección completada"}
                      </p>
                      <p className="text-xs truncate text-zinc-500">
                        {meta.moduloTitulo ?? `Módulo ${meta.moduloId}`}
                        {meta.leccionId && ` · Lección ${meta.leccionId}: ${meta.leccionTitulo}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {contenido?.puntaje !== undefined && (
                      <span className="text-xs font-bold rounded-full px-2.5 py-0.5"
                        style={{
                          background: scoreBg(contenido.puntaje),
                          color: scoreColor(contenido.puntaje),
                          border: `1px solid ${scoreBdr(contenido.puntaje)}`
                        }}>
                        {contenido.puntaje}%
                      </span>
                    )}
                    <span className="text-xs" style={{ color: "#374151" }}>
                      {new Date(a.fecha_inicio).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
