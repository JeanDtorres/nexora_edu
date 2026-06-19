import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    color: "#333333",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#6d28d9",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerLeft: {
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    color: "#6d28d9",
  },
  subtitle: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 2,
  },
  headerRight: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 13,
    color: "#111111",
    marginTop: 15,
    marginBottom: 8,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  table: {
    width: "auto",
    marginBottom: 20,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    minHeight: 20,
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
    minHeight: 18,
    alignItems: "center",
  },
  tableCellHeader: {
    padding: 4,
    color: "#374151",
  },
  tableCell: {
    padding: 4,
    color: "#4b5563",
  },
  // Column widths
  colIntUsuario: { width: "30%" },
  colIntFecha: { width: "25%" },
  colIntTipo: { width: "25%" },
  colIntEstado: { width: "20%" },

  colResUsuario: { width: "30%" },
  colResModulo: { width: "40%" },
  colResPorcentaje: { width: "15%", textAlign: "center" },
  colResFecha: { width: "15%" },
  
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 0.5,
    borderTopColor: "#e5e7eb",
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#9ca3af",
  }
});

export default function ReporteDocumento({ interacciones, resultados }: Props) {
  const fechaGeneracion = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabecera del Reporte */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Nexora Edu</Text>
            <Text style={styles.subtitle}>Reporte Académico General y de Actividad</Text>
          </View>
          <View style={styles.headerRight}>
            <Text>Fecha de generación: {fechaGeneracion}</Text>
            <Text>Rol del emisor: Administrador</Text>
          </View>
        </View>

        {/* Sección 1: Interacciones */}
        <Text style={styles.sectionTitle}>1. Registro de Interacciones y Actividades</Text>
        <View style={styles.table}>
          {/* Header de tabla */}
          <View style={styles.tableRowHeader}>
            <View style={styles.colIntUsuario}>
              <Text style={styles.tableCellHeader}>Usuario</Text>
            </View>
            <View style={styles.colIntFecha}>
              <Text style={styles.tableCellHeader}>Fecha</Text>
            </View>
            <View style={styles.colIntTipo}>
              <Text style={styles.tableCellHeader}>Tipo Actividad</Text>
            </View>
            <View style={styles.colIntEstado}>
              <Text style={styles.tableCellHeader}>Estado</Text>
            </View>
          </View>

          {/* Filas de tabla */}
          {interacciones.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={{ padding: 6, color: "#9ca3af", textAlign: "center", width: "100%" }}>
                No hay interacciones registradas.
              </Text>
            </View>
          ) : (
            interacciones.map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                <View style={styles.colIntUsuario}>
                  <Text style={styles.tableCell}>{item.usuario}</Text>
                </View>
                <View style={styles.colIntFecha}>
                  <Text style={styles.tableCell}>{item.fecha}</Text>
                </View>
                <View style={styles.colIntTipo}>
                  <Text style={styles.tableCell}>{item.tipo}</Text>
                </View>
                <View style={styles.colIntEstado}>
                  <Text style={styles.tableCell}>{item.estado}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Sección 2: Resultados */}
        <Text style={styles.sectionTitle}>2. Resultados Académicos de Evaluaciones</Text>
        <View style={styles.table}>
          {/* Header de tabla */}
          <View style={styles.tableRowHeader}>
            <View style={styles.colResUsuario}>
              <Text style={styles.tableCellHeader}>Usuario</Text>
            </View>
            <View style={styles.colResModulo}>
              <Text style={styles.tableCellHeader}>Tema Evaluado (Módulo - Lección)</Text>
            </View>
            <View style={styles.colResPorcentaje}>
              <Text style={styles.tableCellHeader}>Porcentaje</Text>
            </View>
            <View style={styles.colResFecha}>
              <Text style={styles.tableCellHeader}>Fecha</Text>
            </View>
          </View>

          {/* Filas de tabla */}
          {resultados.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={{ padding: 6, color: "#9ca3af", textAlign: "center", width: "100%" }}>
                No hay resultados académicos registrados.
              </Text>
            </View>
          ) : (
            resultados.map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                <View style={styles.colResUsuario}>
                  <Text style={styles.tableCell}>{item.usuario}</Text>
                </View>
                <View style={styles.colResModulo}>
                  <Text style={styles.tableCell}>{item.modulo}</Text>
                </View>
                <View style={styles.colResPorcentaje}>
                  <Text style={[styles.tableCell, { textAlign: "center" }]}>{item.porcentaje}%</Text>
                </View>
                <View style={styles.colResFecha}>
                  <Text style={styles.tableCell}>{item.fecha}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Pie de Página */}
        <View style={styles.footer}>
          <Text>Nexora Edu - Portal de Administración</Text>
          <Text>Página 1 de 1</Text>
        </View>
      </Page>
    </Document>
  );
}
