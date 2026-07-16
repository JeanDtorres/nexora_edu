const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const MODULOS_DATA = [
  {
    id: 1,
    titulo: "Introducción a Redes",
    lecciones: [
      { id: 1, titulo: "Fundamentos y Clasificación (LAN/WAN)" },
      { id: 2, titulo: "Topologías de Red" },
      { id: 3, titulo: "Modelos de Referencia: OSI y TCP/IP" }
    ]
  },
  {
    id: 2,
    titulo: "Infraestructura Básica",
    lecciones: [
      { id: 1, titulo: "Dispositivos de Interconexión (Switches vs. Routers)" },
      { id: 2, titulo: "Medios de Transmisión (Cobre, Fibra y Wifi)" },
      { id: 3, titulo: "Direccionamiento IP y Subredes" }
    ]
  },
  {
    id: 3,
    titulo: "Monitoreo de Redes",
    lecciones: [
      { id: 1, titulo: "Protocolos de Monitoreo (SNMP)" },
      { id: 2, titulo: "Protocolo de Diagnóstico (ICMP y herramientas Ping/Traceroute)" },
      { id: 3, titulo: "Métricas de Rendimiento (Ancho de banda, Latencia y Pérdidas)" }
    ]
  }
];

async function crearEvaluacion(usuarioId, moduloId, moduloTitulo, leccionId, leccionTitulo, puntaje) {
  const total = 5;
  const correctas = Math.round((puntaje / 100) * total);

  const actividad = await prisma.actividad.create({
    data: {
      usuario_id: usuarioId,
      tipo: "evaluacion",
      estado: "completado",
      fecha_fin: new Date(),
      metadatos: JSON.stringify({
        moduloId,
        moduloTitulo,
        leccionId,
        leccionTitulo
      })
    }
  });

  await prisma.resultado.create({
    data: {
      actividad_id: actividad.id,
      contenido: JSON.stringify({
        puntaje,
        correctas,
        total,
        detalles: []
      }),
      tipo_resultado: "evaluacion_leccion"
    }
  });
}

async function main() {
  console.log('Iniciando sembrado de la base de datos...');

  // Limpiar tablas para evitar duplicados
  await prisma.resultado.deleteMany();
  await prisma.actividad.deleteMany();
  await prisma.usuario.deleteMany();
  console.log('Tablas limpiadas.');

  // Crear contraseñas hasheadas
  const adminHash = await bcrypt.hash('admin123', 10);
  const userHash = await bcrypt.hash('user123', 10);

  // 1. Crear Administrador
  const admin = await prisma.usuario.create({
    data: {
      nombre: 'Administrador Nexora',
      email: 'admin@nexora.com',
      contrasena_hash: adminHash,
      rol: 'admin',
    },
  });
  console.log(`Usuario administrador creado: ${admin.email}`);

  // 2. Crear Sofia Castro (Top 1: Todos los módulos completos con excelentes notas)
  const sofia = await prisma.usuario.create({
    data: {
      nombre: 'Sofía Castro',
      email: 'sofia@nexora.com',
      contrasena_hash: userHash,
      rol: 'normal',
    },
  });
  // Módulo 1
  await crearEvaluacion(sofia.id, 1, MODULOS_DATA[0].titulo, 1, MODULOS_DATA[0].lecciones[0].titulo, 100);
  await crearEvaluacion(sofia.id, 1, MODULOS_DATA[0].titulo, 2, MODULOS_DATA[0].lecciones[1].titulo, 100);
  await crearEvaluacion(sofia.id, 1, MODULOS_DATA[0].titulo, 3, MODULOS_DATA[0].lecciones[2].titulo, 100);
  // Módulo 2
  await crearEvaluacion(sofia.id, 2, MODULOS_DATA[1].titulo, 1, MODULOS_DATA[1].lecciones[0].titulo, 100);
  await crearEvaluacion(sofia.id, 2, MODULOS_DATA[1].titulo, 2, MODULOS_DATA[1].lecciones[1].titulo, 80);
  await crearEvaluacion(sofia.id, 2, MODULOS_DATA[1].titulo, 3, MODULOS_DATA[1].lecciones[2].titulo, 100);
  // Módulo 3
  await crearEvaluacion(sofia.id, 3, MODULOS_DATA[2].titulo, 1, MODULOS_DATA[2].lecciones[0].titulo, 100);
  await crearEvaluacion(sofia.id, 3, MODULOS_DATA[2].titulo, 2, MODULOS_DATA[2].lecciones[1].titulo, 100);
  await crearEvaluacion(sofia.id, 3, MODULOS_DATA[2].titulo, 3, MODULOS_DATA[2].lecciones[2].titulo, 100);
  console.log(`Usuario Sofia Castro creado y evaluado.`);

  // 3. Crear Carlos Rodríguez (Top 2: Módulos 1 y 2 completos)
  const carlos = await prisma.usuario.create({
    data: {
      nombre: 'Carlos Rodríguez',
      email: 'carlos@nexora.com',
      contrasena_hash: userHash,
      rol: 'normal',
    },
  });
  // Módulo 1
  await crearEvaluacion(carlos.id, 1, MODULOS_DATA[0].titulo, 1, MODULOS_DATA[0].lecciones[0].titulo, 80);
  await crearEvaluacion(carlos.id, 1, MODULOS_DATA[0].titulo, 2, MODULOS_DATA[0].lecciones[1].titulo, 80);
  await crearEvaluacion(carlos.id, 1, MODULOS_DATA[0].titulo, 3, MODULOS_DATA[0].lecciones[2].titulo, 100);
  // Módulo 2
  await crearEvaluacion(carlos.id, 2, MODULOS_DATA[1].titulo, 1, MODULOS_DATA[1].lecciones[0].titulo, 80);
  await crearEvaluacion(carlos.id, 2, MODULOS_DATA[1].titulo, 2, MODULOS_DATA[1].lecciones[1].titulo, 80);
  await crearEvaluacion(carlos.id, 2, MODULOS_DATA[1].titulo, 3, MODULOS_DATA[1].lecciones[2].titulo, 80);
  console.log(`Usuario Carlos Rodríguez creado y evaluado.`);

  // 4. Crear María Gómez (Top 3: Módulo 1 completo, Módulo 2 con 2 lecciones)
  const maria = await prisma.usuario.create({
    data: {
      nombre: 'María Gómez',
      email: 'maria@nexora.com',
      contrasena_hash: userHash,
      rol: 'normal',
    },
  });
  // Módulo 1
  await crearEvaluacion(maria.id, 1, MODULOS_DATA[0].titulo, 1, MODULOS_DATA[0].lecciones[0].titulo, 100);
  await crearEvaluacion(maria.id, 1, MODULOS_DATA[0].titulo, 2, MODULOS_DATA[0].lecciones[1].titulo, 80);
  await crearEvaluacion(maria.id, 1, MODULOS_DATA[0].titulo, 3, MODULOS_DATA[0].lecciones[2].titulo, 80);
  // Módulo 2
  await crearEvaluacion(maria.id, 2, MODULOS_DATA[1].titulo, 1, MODULOS_DATA[1].lecciones[0].titulo, 80);
  await crearEvaluacion(maria.id, 2, MODULOS_DATA[1].titulo, 2, MODULOS_DATA[1].lecciones[1].titulo, 80);
  console.log(`Usuario María Gómez creado y evaluado.`);

  // 5. Crear Ana Martínez (Top 4: Módulo 1 completo)
  const ana = await prisma.usuario.create({
    data: {
      nombre: 'Ana Martínez',
      email: 'ana@nexora.com',
      contrasena_hash: userHash,
      rol: 'normal',
    },
  });
  // Módulo 1
  await crearEvaluacion(ana.id, 1, MODULOS_DATA[0].titulo, 1, MODULOS_DATA[0].lecciones[0].titulo, 80);
  await crearEvaluacion(ana.id, 1, MODULOS_DATA[0].titulo, 2, MODULOS_DATA[0].lecciones[1].titulo, 80);
  await crearEvaluacion(ana.id, 1, MODULOS_DATA[0].titulo, 3, MODULOS_DATA[0].lecciones[2].titulo, 80);
  console.log(`Usuario Ana Martínez creado y evaluado.`);

  // 6. Crear Juan Pérez (Top 5: 1 lección del Módulo 1)
  const juan = await prisma.usuario.create({
    data: {
      nombre: 'Juan Pérez',
      email: 'user@nexora.com',
      contrasena_hash: userHash,
      rol: 'normal',
    },
  });
  await crearEvaluacion(juan.id, 1, MODULOS_DATA[0].titulo, 1, MODULOS_DATA[0].lecciones[0].titulo, 80);
  console.log(`Usuario Juan Pérez creado y evaluado.`);

  console.log('Sembrado completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('Error durante el sembrado de base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
