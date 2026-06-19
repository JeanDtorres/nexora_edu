import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { contenidoModulos } from "@/data/contenidoModulos";
import { obtenerProgresoEstudiante } from "@/lib/progreso";
import LecturaTracker from "./LecturaTracker";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_edu_super_secret_jwt_key_2026";

interface PageProps {
  params: Promise<{
    moduloId: string;
    leccionId: string;
  }>;
}

const MODULE_COLORS = [
  { accent: "#8b5cf6", glow: "rgba(139,92,246,0.2)", border: "rgba(139,92,246,0.25)", bg: "rgba(109,40,217,0.08)" },
  { accent: "#e879f9", glow: "rgba(217,70,239,0.2)", border: "rgba(217,70,239,0.25)", bg: "rgba(192,38,211,0.08)" },
  { accent: "#38bdf8", glow: "rgba(56,189,248,0.2)", border: "rgba(6,182,212,0.25)",  bg: "rgba(6,182,212,0.08)"  },
];

export default async function LeccionDetailPage({ params }: PageProps) {
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

  const { moduloId, leccionId } = await params;
  const moduloIdNum = parseInt(moduloId, 10);
  const leccionIdNum = parseInt(leccionId, 10);

  if (isNaN(moduloIdNum) || isNaN(leccionIdNum)) {
    redirect("/modulos");
  }

  const modulo = contenidoModulos.find((m) => m.id === moduloIdNum);
  const leccion = modulo?.lecciones.find((l) => l.id === leccionIdNum);

  if (!modulo || !leccion) {
    redirect("/modulos");
  }

  // Verificar si la lección está desbloqueada
  const { modulos } = await obtenerProgresoEstudiante(decoded.id);
  const modProg = modulos.find((m) => m.id === modulo.id);
  const leccProg = modProg?.lecciones.find((l) => l.id === leccion.id);

  if (!leccProg || !leccProg.desbloqueado) {
    redirect(`/modulos/${modulo.id}?error=leccion-bloqueada`);
  }

  const color = MODULE_COLORS[(modulo.id - 1) % MODULE_COLORS.length];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 w-full">
      <LecturaTracker
        moduloId={modulo.id}
        moduloTitulo={modulo.titulo}
        leccionId={leccion.id}
        leccionTitulo={leccion.titulo}
      />

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
          <Link href={`/modulos/${modulo.id}`} className="hover:text-zinc-300 transition-colors truncate max-w-[120px] sm:max-w-none">
            {modulo.titulo}
          </Link>
          <span>/</span>
          <span className="text-violet-400 font-medium truncate max-w-[150px] sm:max-w-none">
            Lección {leccion.id}: {leccion.titulo}
          </span>
        </nav>

        <Link
          href={`/modulos/${modulo.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:bg-zinc-850 hover:text-white transition-all duration-200"
        >
          ← Volver al Módulo
        </Link>
      </div>

      {/* Main Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20 mb-10 shadow-2xl">
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-violet-650/10 blur-[120px] pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Text Details */}
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-400 border border-violet-500/25">
                  MÓDULO {modulo.id} · LECCIÓN {leccion.id}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-zinc-950/40 px-2.5 py-1 text-xs font-medium text-zinc-400 border border-zinc-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Estudio de {leccion.duracion}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4">
                {leccion.titulo}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                {leccion.descripcionCorto}
              </p>
            </div>
          </div>

          {/* Banner Graphic/Image */}
          <div className="lg:w-1/4 relative h-48 lg:h-auto min-h-[160px] overflow-hidden border-t lg:border-t-0 lg:border-l border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={modulo.imagen}
              alt={leccion.titulo}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid: Content vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Rich HTML Content */}
        <div className="lg:col-span-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-6 sm:p-10 backdrop-blur-md shadow-lg">
          <article
            className="
              prose-zinc max-w-none
              [&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base sm:[&_p]:text-[17px]
              [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_h2]:border-b [&_h2]:border-zinc-850 [&_h2]:pb-2
              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-violet-400 [&_h3]:mt-6 [&_h3]:mb-3
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_ul]:mb-6
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-3 [&_ol]:mb-6
              [&_li]:text-zinc-300 [&_li]:leading-relaxed
              [&_strong]:text-violet-300 [&_strong]:font-semibold
              [&_code]:bg-zinc-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-fuchsia-400 [&_code]:font-mono [&_code]:text-sm [&_code]:border [&_code]:border-zinc-800/60
            "
            dangerouslySetInnerHTML={{ __html: leccion.contenidoHtml }}
          />

          {/* CTA Box at the bottom of the content */}
          <div className="mt-12 p-6 sm:p-8 rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-950/20 to-fuchsia-950/15 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-white mb-1">¿Comprendiste el material de estudio?</h3>
              <p className="text-zinc-400 text-sm">Responde las 5 preguntas del test para aprobar esta lección (necesitas $\ge 70\%$).</p>
            </div>
            <Link
              href={`/evaluacion/${modulo.id}/${leccion.id}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-6 py-3.5 text-sm font-bold text-white hover:from-violet-600 hover:to-fuchsia-600 shadow-xl shadow-violet-500/20 active:scale-95 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              Realizar Evaluación
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Column: Sidebar (Key Concepts) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          {/* Key Concepts Widget */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-6 backdrop-blur-md shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-violet-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l8.982-8.979M19 12l-1.812-9.041L8.982 12H19Z" />
              </svg>
              Conceptos Clave
            </h3>

            <div className="space-y-6">
              {leccion.conceptosClave.map((concepto, idx) => (
                <div key={idx} className="group/concept relative pl-4 border-l-2 border-zinc-800 hover:border-violet-500 transition-colors duration-250">
                  <h4 className="text-sm font-bold text-zinc-100 group-hover/concept:text-violet-400 transition-colors duration-200 mb-1">
                    {concepto.titulo}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {concepto.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats / Info Widget */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-6 backdrop-blur-md shadow-lg text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Estado de la Lección</h4>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Lectura:</span>
                <span className={leccProg?.leido ? "text-sky-400 font-bold" : "text-zinc-650"}>
                  {leccProg?.leido ? "Completado ✓" : "Pendiente"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Evaluación:</span>
                <span className={leccProg?.aprobado ? "text-emerald-400 font-bold" : "text-zinc-650"}>
                  {leccProg?.aprobado ? `Aprobado (${leccProg.mejorPuntaje}%)` : leccProg?.evaluado ? `Fallado (${leccProg.mejorPuntaje}%)` : "Pendiente"}
                </span>
              </div>
            </div>

            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                style={{ width: leccProg?.aprobado ? "100%" : leccProg?.leido ? "50%" : "0%" }}
              />
            </div>

            <Link
              href={`/modulos/${modulo.id}`}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/30 py-3 text-xs font-semibold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200 cursor-pointer"
            >
              ← Volver al Módulo
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
