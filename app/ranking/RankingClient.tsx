"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface RankedUser {
  id: number;
  nombre: string;
  email: string;
  ultimoAcceso: string | Date | null;
  leccionesAprobadas: number;
  promedioScore: number;
  modulosAprobados: number;
  totalLecciones: number;
  posicion: number;
}

interface RankingClientProps {
  initialRanking: RankedUser[];
  currentUserId: number;
}

export default function RankingClient({ initialRanking, currentUserId }: RankingClientProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRanking = initialRanking.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separar el top 3 del resto
  const top3 = initialRanking.slice(0, 3);
  
  // Reordenar para el podio visual: [2do, 1ro, 3ro]
  const podiumOrder = [];
  if (top3[1]) podiumOrder.push(top3[1]); // 2do lugar
  if (top3[0]) podiumOrder.push(top3[0]); // 1er lugar
  if (top3[2]) podiumOrder.push(top3[2]); // 3er lugar

  // Paleta de estilos adaptativa
  const styles = {
    bgHeader: dark
      ? "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(10,10,22,0.85) 60%)"
      : "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(255,255,255,0.9) 60%)",
    borderHeader: dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.15)",
    textPrimary: dark ? "text-white" : "text-zinc-900",
    textSecondary: dark ? "text-zinc-400" : "text-zinc-600",
    cardBg: dark ? "rgba(10,10,22,0.65)" : "rgba(255,255,255,0.75)",
    cardBorder: dark ? "rgba(255,255,255,0.07)" : "rgba(99,102,241,0.1)",
    inputBg: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
    inputBorder: dark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.15)",
    currentUserBg: dark
      ? "linear-gradient(90deg, rgba(37,99,235,0.08) 0%, rgba(10,10,22,0.75) 100%)"
      : "linear-gradient(90deg, rgba(37,99,235,0.05) 0%, rgba(255,255,255,0.9) 100%)",
    currentUserBorder: dark ? "rgba(37,99,235,0.3)" : "rgba(37,99,235,0.25)",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 flex-1 w-full flex flex-col gap-8">
      
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-xs -mb-3 anim-fade-up" style={{ color: dark ? "#4b5563" : "#6b7280" }}>
        <Link href="/dashboard" className="hover:text-blue-500 transition-colors">Inicio</Link>
        <span>/</span>
        <span style={{ color: "#6366f1" }}>Ranking Global</span>
      </nav>

      {/* ── Header Banner ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-10 anim-fade-up"
        style={{
          background: styles.bgHeader,
          border: `1px solid ${styles.borderHeader}`,
          backdropFilter: "blur(20px)",
          boxShadow: dark
            ? "0 30px 60px rgba(0,0,0,0.4), 0 0 60px rgba(99,102,241,0.05)"
            : "0 20px 40px rgba(99,102,241,0.05)",
        }}
      >
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold mb-4"
          style={{
            background: dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)",
            border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)"}`,
            color: "#818cf8",
          }}
        >
          🏆 Nexora Leaderboard
        </span>
        <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${styles.textPrimary} mb-2`}>
          Tabla de <span className="anim-shimmer-text">Posiciones</span>
        </h1>
        <p className={`text-sm max-w-xl ${styles.textSecondary}`}>
          Compara tu rendimiento con el de otros estudiantes. Los administradores no se muestran en este ranking.
        </p>
      </div>

      {/* ── Podium (Top 3) ── */}
      {searchTerm === "" && initialRanking.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-6 mt-2 anim-fade-up">
          <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: dark ? "#4b5563" : "#6b7280" }}>
            🏆 Cuadro de Honor
          </h2>
          <div className="flex flex-col md:flex-row items-end justify-center gap-6 w-full max-w-3xl">
            {podiumOrder.map((user) => {
              const isFirst = user.posicion === 1;
              const isSecond = user.posicion === 2;
              const isThird = user.posicion === 3;
              const isCurrentUser = user.id === currentUserId;

              // Estilos específicos para cada lugar del podio
              let accentColor = "#f59e0b"; // Oro
              let badgeBg = "rgba(245,158,11,0.15)";
              let borderCol = "rgba(245,158,11,0.35)";
              let shadowEffect = "rgba(245,158,11,0.06)";
              let cardHeight = "h-72";
              let icon = "👑";

              if (isSecond) {
                accentColor = "#94a3b8"; // Plata
                badgeBg = "rgba(148,163,184,0.15)";
                borderCol = "rgba(148,163,184,0.3)";
                shadowEffect = "rgba(148,163,184,0.03)";
                cardHeight = "h-64";
                icon = "🥈";
              } else if (isThird) {
                accentColor = "#b45309"; // Bronce
                badgeBg = "rgba(180,83,9,0.15)";
                borderCol = "rgba(180,83,9,0.3)";
                shadowEffect = "rgba(180,83,9,0.03)";
                cardHeight = "h-56";
                icon = "🥉";
              }

              return (
                <div
                  key={user.id}
                  className={`w-full md:w-1/3 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.03] ${cardHeight} ${
                    isCurrentUser && !dark ? "shadow-md" : ""
                  }`}
                  style={{
                    background: dark ? "rgba(10,10,22,0.6)" : "rgba(255,255,255,0.75)",
                    border: `2px solid ${isCurrentUser ? "rgba(37,99,235,0.5)" : borderCol}`,
                    boxShadow: dark
                      ? `0 15px 30px rgba(0,0,0,0.3), 0 0 30px ${shadowEffect}`
                      : `0 10px 20px rgba(0,0,0,0.03)`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${badgeBg} 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Header info */}
                  <div className="flex flex-col items-center text-center">
                    <span className="text-3xl mb-1">{icon}</span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-3"
                      style={{ background: badgeBg, color: accentColor }}
                    >
                      {user.posicion}° Puesto
                    </span>
                    <h3 className={`font-black text-lg ${styles.textPrimary} line-clamp-1`}>
                      {user.nombre}
                    </h3>
                    <p className={`text-xs ${styles.textSecondary} mb-2`}>
                      {isCurrentUser ? "¡Eres tú!" : user.email}
                    </p>
                  </div>

                  {/* Stats block */}
                  <div
                    className="rounded-2xl p-3 flex justify-around text-center"
                    style={{
                      background: dark ? "rgba(255,255,255,0.03)" : "rgba(99,102,241,0.04)",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.08)"}`,
                    }}
                  >
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Lecciones</p>
                      <p className={`text-base font-black ${styles.textPrimary}`}>
                        {user.leccionesAprobadas} <span className="text-xs text-zinc-500 font-medium">/ 9</span>
                      </p>
                    </div>
                    <div className="w-px h-8 bg-zinc-800/40 my-auto" />
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Promedio</p>
                      <p className="text-base font-black" style={{ color: accentColor }}>
                        {user.promedioScore}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Search Bar & Stats summary ── */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-2 anim-fade-up">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs group">
          <input
            type="text"
            placeholder="Buscar por estudiante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold outline-none transition-all duration-300"
            style={{
              background: styles.inputBg,
              border: `1px solid ${styles.inputBorder}`,
              color: dark ? "#ffffff" : "#18181b",
            }}
          />
          <div className="absolute left-3.5 top-3.5" style={{ color: dark ? "#4b5563" : "#9ca3af" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
            </svg>
          </div>
        </div>

        {/* Counter */}
        <p className={`text-xs font-semibold ${styles.textSecondary}`}>
          Mostrando {filteredRanking.length} de {initialRanking.length} estudiantes
        </p>
      </div>

      {/* ── Leaderboard Table ── */}
      <div
        className="rounded-3xl overflow-hidden anim-fade-up"
        style={{
          background: styles.cardBg,
          border: `1px solid ${styles.cardBorder}`,
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        {filteredRanking.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-3xl">🔍</span>
            <h3 className={`text-lg font-bold ${styles.textPrimary} mt-2`}>Sin resultados</h3>
            <p className={`text-sm ${styles.textSecondary} mt-1`}>No se encontraron estudiantes que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr
                  className="text-xs uppercase font-bold tracking-wider"
                  style={{
                    borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.08)"}`,
                    color: dark ? "#4b5563" : "#6b7280",
                    background: dark ? "rgba(0,0,0,0.1)" : "rgba(99,102,241,0.02)",
                  }}
                >
                  <th className="py-4 px-6 text-center w-16">Posición</th>
                  <th className="py-4 px-6">Estudiante</th>
                  <th className="py-4 px-6 text-center">Módulos</th>
                  <th className="py-4 px-6">Progreso Lecciones</th>
                  <th className="py-4 px-6 text-center w-28">Promedio</th>
                  <th className="py-4 px-6 text-right">Último Acceso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/30">
                {filteredRanking.map((user) => {
                  const isCurrentUser = user.id === currentUserId;
                  const isTop3 = user.posicion <= 3;

                  // Calcular porcentaje de lecciones aprobadas (max 9)
                  const progressPct = Math.round((user.leccionesAprobadas / 9) * 100);

                  // Distinción de colores para las posiciones del top 3
                  let positionBadgeStyle = {};
                  if (user.posicion === 1) positionBadgeStyle = { background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" };
                  else if (user.posicion === 2) positionBadgeStyle = { background: "rgba(148,163,184,0.15)", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.25)" };
                  else if (user.posicion === 3) positionBadgeStyle = { background: "rgba(180,83,9,0.15)", color: "#b45309", border: "1px solid rgba(180,83,9,0.25)" };

                  return (
                    <tr
                      key={user.id}
                      className="transition-colors duration-200"
                      style={{
                        background: isCurrentUser ? styles.currentUserBg : "transparent",
                        borderLeft: isCurrentUser ? `3px solid ${styles.currentUserBorder}` : "none",
                      }}
                    >
                      {/* Posición */}
                      <td className="py-4 px-6 text-center">
                        {isTop3 ? (
                          <span
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black"
                            style={positionBadgeStyle}
                          >
                            {user.posicion}
                          </span>
                        ) : (
                          <span className="font-mono text-xs font-semibold" style={{ color: dark ? "#4b5563" : "#9ca3af" }}>
                            #{user.posicion}
                          </span>
                        )}
                      </td>

                      {/* Estudiante */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-sm ${styles.textPrimary}`}>
                              {user.nombre}
                            </span>
                            {isCurrentUser && (
                              <span className="rounded bg-blue-500/15 border border-blue-500/30 px-1.5 py-0.5 text-[9px] font-bold text-blue-400 uppercase tracking-widest">
                                Tú
                              </span>
                            )}
                          </div>
                          <span className="text-xs" style={{ color: dark ? "#4b5563" : "#9ca3af" }}>
                            {user.email}
                          </span>
                        </div>
                      </td>

                      {/* Módulos */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center justify-center font-bold text-xs rounded-lg px-2.5 py-1 ${
                          user.modulosAprobados === 3 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : dark ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-700"
                        }`}>
                          {user.modulosAprobados} / 3
                        </span>
                      </td>

                      {/* Progreso Lecciones */}
                      <td className="py-4 px-6 min-w-[180px]">
                        <div className="flex flex-col gap-1.5 max-w-xs">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span style={{ color: dark ? "#a1a1aa" : "#4b5563" }}>
                              {user.leccionesAprobadas} de 9 lecciones
                            </span>
                            <span style={{ color: progressPct >= 70 ? "#34d399" : "#6366f1" }}>
                              {progressPct}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.06)" }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${progressPct}%`,
                                background: progressPct === 100 
                                  ? "linear-gradient(90deg, #10b981, #059669)" 
                                  : "linear-gradient(90deg, #6366f1, #3b82f6)"
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Promedio */}
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center justify-center h-8 px-3 rounded-xl text-sm font-black ${
                          user.promedioScore >= 90
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                            : user.promedioScore >= 70
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/25"
                              : "bg-red-500/10 text-red-400 border border-red-500/25"
                        }`}>
                          {user.promedioScore}%
                        </span>
                      </td>

                      {/* Último Acceso */}
                      <td className="py-4 px-6 text-right text-xs" style={{ color: dark ? "#4b5563" : "#6b7280" }}>
                        {user.ultimoAcceso ? (
                          new Date(user.ultimoAcceso).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        ) : (
                          <span className="italic">Nunca</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
