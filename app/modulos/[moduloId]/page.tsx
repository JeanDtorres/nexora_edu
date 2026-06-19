import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { contenidoModulos } from "@/data/contenidoModulos";
import { obtenerProgresoEstudiante } from "@/lib/progreso";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_edu_super_secret_jwt_key_2026";

interface PageProps {
  params: Promise<{
    moduloId: string;
  }>;
  searchParams?: Promise<{
    error?: string;
  }>;
}

const MODULE_COLORS = [
  { accent: "#2563eb", glow: "rgba(37,99,235,0.2)", border: "rgba(37,99,235,0.25)", bg: "rgba(30,64,175,0.08)" },
  { accent: "#0ea5e9", glow: "rgba(14,165,233,0.2)", border: "rgba(14,165,233,0.25)", bg: "rgba(2,132,199,0.08)" },
  { accent: "#38bdf8", glow: "rgba(56,189,248,0.2)", border: "rgba(6,182,212,0.25)",  bg: "rgba(6,182,212,0.08)"  },
];

export default async function ModuloDetailPage({ params, searchParams }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    redirect("/login");
  }

  const { moduloId } = await params;
  const idNum = parseInt(moduloId, 10);

  if (isNaN(idNum)) {
    redirect("/modulos");
  }

  const modulo = contenidoModulos.find((m) => m.id === idNum);

  if (!modulo) {
    redirect("/modulos");
  }

  // Cargar progreso del usuario
  const { modulos } = await obtenerProgresoEstudiante(decoded.id);
  const modProg = modulos.find((m) => m.id === modulo.id);

  // Si el módulo está bloqueado, redirigir
  if (!modProg || !modProg.desbloqueado) {
    redirect("/modulos?error=modulo-bloqueado");
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const hasError = resolvedSearchParams.error === "leccion-bloqueada";

  const color = MODULE_COLORS[(modulo.id - 1) % MODULE_COLORS.length];

  // Contar lecciones leídas y aprobadas
  const leccionesAprobadasCount = modProg.lecciones.filter((l) => l.aprobado).length;
  const leccionesLeidasCount = modProg.lecciones.filter((l) => l.leido).length;
  const progressPercent = Math.round(((leccionesLeidasCount + leccionesAprobadasCount) / 6) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 w-full">
      {/* Alert if lesson was blocked */}
      {hasError && (
        <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-300 text-sm flex items-center gap-3 anim-bounce-in">
          <span className="text-lg">⚠️</span>
          <p className="m-0 font-medium">
            <strong>Acceso Restringido:</strong> La lección solicitada está bloqueada. Debes aprobar la lección anterior obteniendo una calificación mayor o igual a 70% en su evaluación.
          </p>
        </div>
      )}

      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-zinc-500">
          <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/modulos" className="hover:text-zinc-300 transition-colors">
            Módulos
          </Link>
          <span>/</span>
          <span className="text-blue-400 font-medium truncate max-w-[200px] sm:max-w-none">
            {modulo.titulo}
          </span>
        </nav>

        <Link
          href="/modulos"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:bg-zinc-850 hover:text-white transition-all duration-200"
        >
          ← Volver a Módulos
        </Link>
      </div>

      {/* Main Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20 mb-10 shadow-2xl">
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-blue-700/10 blur-[120px] pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Text Details */}
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/25">
                  MÓDULO {modulo.id}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-zinc-950/40 px-2.5 py-1 text-xs font-medium text-zinc-400 border border-zinc-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  3 Lecciones académicas
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
                {modulo.titulo}
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-3xl">
                {modulo.descripcionCorto}
              </p>
            </div>
          </div>

          {/* Banner Graphic/Image */}
          <div className="lg:w-1/3 relative h-64 lg:h-auto min-h-[200px] overflow-hidden border-t lg:border-t-0 lg:border-l border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={modulo.imagen}
              alt={modulo.titulo}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid: Content vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Lesson List */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-lg font-black text-white tracking-tight mb-4">Lecciones de esta Unidad</h2>

          <div className="space-y-4">
            {modulo.lecciones.map((leccion, idx) => {
              const prog = modProg.lecciones.find((l) => l.id === leccion.id);
              const isLessonLocked = !prog?.desbloqueado;

              return (
                <div
                  key={leccion.id}
                  className={`rounded-2xl border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${isLessonLocked ? "bg-zinc-950/40 border-zinc-900 opacity-60" : "bg-zinc-900/10 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/20"}`}
                >
                  <div className="flex gap-4 items-start">
                    {/* Index or lock badge */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold font-mono text-sm"
                      style={{
                        background: isLessonLocked ? "rgba(255,255,255,0.03)" : prog?.aprobado ? "rgba(16,185,129,0.1)" : "rgba(37,99,235,0.1)",
                        border: `1px solid ${isLessonLocked ? "rgba(255,255,255,0.05)" : prog?.aprobado ? "rgba(16,185,129,0.25)" : "rgba(37,99,235,0.25)"}`,
                        color: isLessonLocked ? "#4b5563" : prog?.aprobado ? "#34d399" : "#60a5fa"
                      }}
                    >
                      {isLessonLocked ? "🔒" : prog?.aprobado ? "✓" : `1.${leccion.id}`}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white leading-snug flex items-center gap-2">
                        Lección {leccion.id}: {leccion.titulo}
                        {isLessonLocked && <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-850 text-zinc-500 font-normal">Bloqueado 🔒</span>}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{leccion.descripcionCorto}</p>
                      
                      {/* Sub-status flags */}
                      {!isLessonLocked && (
                        <div className="flex flex-wrap gap-3 mt-3">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold rounded px-1.5 py-0.5 border ${prog?.leido ? "bg-sky-500/5 border-sky-500/20 text-sky-400" : "bg-zinc-900/50 border-zinc-850 text-zinc-650"}`}>
                            📖 {prog?.leido ? "Leído" : "No leído"}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold rounded px-1.5 py-0.5 border ${prog?.aprobado ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : prog?.evaluado ? "bg-red-500/5 border-red-500/20 text-red-400" : "bg-zinc-900/50 border-zinc-850 text-zinc-650"}`}>
                            📝 {prog?.aprobado ? `Aprobado (${prog.mejorPuntaje}%)` : prog?.evaluado ? `Reprobado (${prog.mejorPuntaje}%)` : "Sin evaluar"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 shrink-0 md:self-center">
                    {isLessonLocked ? (
                      <span className="text-xs text-zinc-650 font-bold uppercase tracking-widest px-4 py-2 border border-dashed border-zinc-900 rounded-xl bg-zinc-950/20">
                        Bloqueado 🔒
                      </span>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <Link
                          href={`/modulos/${modulo.id}/lecciones/${leccion.id}`}
                          className="flex-1 text-center text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 hover:text-white"
                        >
                          {prog?.leido ? "Repasar" : "Estudiar"}
                        </Link>
                        <Link
                          href={`/evaluacion/${modulo.id}/${leccion.id}`}
                          className="flex-1 text-center text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                        >
                          {prog?.aprobado ? "Evaluar de nuevo" : "Dar Evaluación"}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sidebar Stats */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          {/* Quick Stats / Info Widget */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-6 backdrop-blur-md shadow-lg text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Progreso de la Unidad</h4>
            <div className="flex items-center justify-center gap-1 text-sm text-zinc-300 font-medium mb-4">
              <span className="text-blue-400 font-bold">{progressPercent}%</span> completado
            </div>
            
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-blue-500 to-sky-500 rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="space-y-3 text-left border-t border-zinc-850 pt-5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Lecciones leídas:</span>
                <span className="font-semibold text-white">{leccionesLeidasCount} / 3</span>
              </div>
              <div className="flex justify-between">
                <span>Lecciones aprobadas:</span>
                <span className="font-semibold text-white">{leccionesAprobadasCount} / 3</span>
              </div>
              <div className="flex justify-between">
                <span>Estado general:</span>
                <span className={`font-bold ${modProg.completado ? "text-emerald-400" : "text-amber-400"}`}>
                  {modProg.completado ? "Completado ✓" : "En desarrollo"}
                </span>
              </div>
            </div>

            <Link
              href="/modulos"
              className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/30 py-3 text-xs font-semibold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200 cursor-pointer"
            >
              ← Volver al Listado
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
