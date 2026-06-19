"use client";

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReporteDocumento from "@/components/ReporteDocumento";

interface Interaccion {
  usuario: string;
  fecha: string;
  tipo: string;
  estado: string;
}

interface Resultado {
  usuario: string;
  modulo: string;
  porcentaje: number;
  fecha: string;
}

interface Props {
  interacciones: Interaccion[];
  resultados: Resultado[];
}

export default function BotonExportarPDF({ interacciones, resultados }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-xl bg-blue-950/20 px-5 py-2.5 text-sm font-bold text-blue-400 border border-blue-500/20 cursor-not-allowed"
      >
        <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin border-blue-400" />
        Preparando PDF…
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ReporteDocumento interacciones={interacciones} resultados={resultados} />}
      fileName={`Reporte_Nexora_${new Date().toISOString().slice(0, 10)}.pdf`}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-xl shadow-blue-500/10 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
    >
      {({ loading }) => (
        <>
          {loading ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin border-white" />
              Generando archivo…
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Exportar PDF
            </>
          )}
        </>
      )}
    </PDFDownloadLink>
  );
}
