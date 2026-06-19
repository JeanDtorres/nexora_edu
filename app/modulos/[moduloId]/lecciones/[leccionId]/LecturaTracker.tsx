"use client";

import { useEffect } from "react";

interface Props {
  moduloId: number;
  moduloTitulo: string;
  leccionId: number;
  leccionTitulo: string;
}

export default function LecturaTracker({ moduloId, moduloTitulo, leccionId, leccionTitulo }: Props) {
  useEffect(() => {
    fetch("/api/actividad/lectura", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduloId, moduloTitulo, leccionId, leccionTitulo }),
    }).catch(() => {});
  }, [moduloId, moduloTitulo, leccionId, leccionTitulo]);

  return null;
}
