export interface ConceptoClave {
  titulo: string;
  descripcion: string;
}

export interface PreguntaQuiz {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number; // índice 0-based de la opción correcta
  explicacion: string;
}

export interface Leccion {
  id: number; // 1, 2 o 3
  titulo: string;
  descripcionCorto: string;
  duracion: string;
  contenidoHtml: string;
  conceptosClave: ConceptoClave[];
  preguntas: PreguntaQuiz[];
}

export interface Modulo {
  id: number;
  titulo: string;
  descripcionCorto: string;
  duracion: string;
  imagen: string;
  colorTheme: string;
  lecciones: Leccion[];
}

export const contenidoModulos: Modulo[] = [
  {
    id: 1,
    titulo: "Introducción a Redes",
    descripcionCorto: "Aprende los fundamentos del diseño de redes, clasificaciones geográficas y las diferentes formas en que los dispositivos se interconectan.",
    duracion: "35 min",
    imagen: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    colorTheme: "from-violet-500 to-indigo-500",
    lecciones: [
      {
        id: 1,
        titulo: "Fundamentos y Clasificación (LAN/WAN)",
        descripcionCorto: "Conoce qué es una red de computadoras y cómo se categorizan según su alcance geográfico.",
        duracion: "10 min",
        conceptosClave: [
          {
            titulo: "Red de Computadoras",
            descripcion: "Conjunto de dispositivos autónomos interconectados que comparten recursos e información mediante protocolos comunes."
          },
          {
            titulo: "LAN (Local Area Network)",
            descripcion: "Red de alcance geográfico limitado (hogar, oficina, edificio) con velocidades muy altas y bajísima latencia."
          },
          {
            titulo: "WAN (Wide Area Network)",
            descripcion: "Red de gran extensión que conecta LANs separadas por países o continentes, con latencias y canales administrados externamente."
          }
        ],
        contenidoHtml: `
          <p>
            Una <strong>red de computadoras</strong> es un sistema de dispositivos interconectados (computadoras, servidores, dispositivos móviles, impresoras) que se comunican entre sí para compartir recursos, archivos, servicios y facilitar la transmisión de datos. El objetivo principal es eliminar el aislamiento físico de la información y permitir que el hardware y el software colaboren eficientemente en tiempo real.
          </p>
          <div class="my-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
            <h3 class="text-sm font-semibold text-violet-400 mb-2">💡 Dato Académico</h3>
            <p class="text-zinc-400 text-sm leading-relaxed m-0">
              La clasificación más común de las redes se basa en su alcance geográfico. Esto define no solo la distancia física que cubren, sino también la propiedad de la infraestructura y la tecnología de transmisión utilizada.
            </p>
          </div>
          <h2>Tipos de Redes según su Alcance</h2>
          <ul>
            <li>
              <strong>PAN (Personal Area Network):</strong> Es la red de rango más corto, típicamente del orden de unos pocos metros, utilizada para interconectar dispositivos de uso personal, como teléfonos, tabletas y auriculares (usualmente mediante Bluetooth).
            </li>
            <li>
              <strong>LAN (Local Area Network):</strong> Redes de área local confinadas a una oficina, hogar o campus universitario. Su administración suele ser privada, ofrecen velocidades de transmisión de datos muy altas (estándar de 1 Gbps a 10 Gbps en la actualidad) y tienen una bajísima tasa de errores.
            </li>
            <li>
              <strong>MAN (Metropolitan Area Network):</strong> Cubre un área geográfica del tamaño de una ciudad completa o municipio. Un ejemplo común es la red de fibra óptica de televisión por cable o el sistema de cámaras de seguridad metropolitano.
            </li>
            <li>
              <strong>WAN (Wide Area Network):</strong> Red de área amplia que se extiende a través de múltiples regiones, países o incluso de forma global. Internet es el ejemplo por excelencia de una WAN. Utilizan tecnologías de telecomunicaciones administradas por terceros (proveedores de servicios) y conllevan una mayor latencia debido a las grandes distancias.
            </li>
          </ul>
        `,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Cuál es el objetivo principal de una red de computadoras?",
            opciones: [
              "Hacer que el hardware funcione de manera completamente independiente",
              "Compartir recursos, información y facilitar la comunicación entre dispositivos",
              "Aumentar el consumo de energía de los sistemas informáticos",
              "Reemplazar completamente el software de oficina tradicional"
            ],
            respuestaCorrecta: 1,
            explicacion: "El fin principal de una red es permitir que dispositivos autónomos compartan recursos y colaboren de manera fluida y centralizada."
          },
          {
            id: 2,
            pregunta: "¿Qué distingue principalmente a una red LAN de una WAN?",
            opciones: [
              "Las LAN son globales y las WAN son locales",
              "Las LAN cubren distancias limitadas con velocidades altas y baja latencia, mientras que las WAN cubren países o continentes",
              "Las LAN solo funcionan por aire e inalámbricamente y las WAN solo por fibra óptica",
              "Las LAN no requieren un enrutador en ningún caso para funcionar internamente"
            ],
            respuestaCorrecta: 1,
            explicacion: "Las LAN (Local Area Networks) operan en entornos físicamente controlados a altas velocidades, mientras que las WAN interconectan múltiples ubicaciones a largas distancias."
          },
          {
            id: 3,
            pregunta: "¿Qué tipo de red cubre típicamente la extensión de una ciudad completa?",
            opciones: [
              "PAN",
              "LAN",
              "MAN",
              "WAN"
            ],
            respuestaCorrecta: 2,
            explicacion: "Una MAN (Metropolitan Area Network) abarca un territorio metropolitano del tamaño de una ciudad o región urbana mediana."
          },
          {
            id: 4,
            pregunta: "¿Cuál de las siguientes es una red de alcance personal de corto alcance?",
            opciones: [
              "PAN",
              "LAN",
              "MAN",
              "WAN"
            ],
            respuestaCorrecta: 0,
            explicacion: "PAN (Personal Area Network) cubre el espacio personal inmediato de una persona (típicamente menos de 10 metros, por ejemplo con Bluetooth)."
          },
          {
            id: 5,
            pregunta: "¿Cuál es el ejemplo más representativo de una red de tipo WAN en el mundo?",
            opciones: [
              "La red Wi-Fi de tu casa",
              "La intranet de un edificio de oficinas",
              "Internet",
              "La conexión directa entre un mouse y una computadora"
            ],
            respuestaCorrecta: 2,
            explicacion: "Internet conecta millones de redes en todo el mundo, siendo la red WAN pública más grande y compleja que existe."
          }
        ]
      },
      {
        id: 2,
        titulo: "Topologías de Red",
        descripcionCorto: "Aprende los diferentes esquemas físicos y lógicos que definen la conexión de los dispositivos.",
        duracion: "12 min",
        conceptosClave: [
          {
            titulo: "Topología Física",
            descripcion: "La disposición o diseño físico de los cables, enlaces y dispositivos que forman la red."
          },
          {
            titulo: "Topología en Estrella",
            descripcion: "Diseño donde todos los nodos se conectan a un switch central, aislando las fallas de cableado de cada host."
          },
          {
            titulo: "Topología en Malla",
            descripcion: "Configuración redundante donde los dispositivos tienen conexiones dedicadas a todos los demás hosts."
          }
        ],
        contenidoHtml: `
          <p>
            La <strong>topología de red</strong> se refiere a la disposición geométrica de los enlaces y nodos de comunicación. Se puede dividir en dos conceptos: la <em>topología física</em>, que es la disposición real del cableado y el hardware, y la <em>topología lógica</em>, que define cómo viajan realmente las señales o los datos a través del medio.
          </p>
          <h2>Topologías Físicas Clásicas</h2>
          <ul>
            <li>
              <strong>Bus:</strong> Todos los nodos están conectados a un único cable central compartido (el canal principal o bus). Si el cable principal se corta o falla, toda la red se cae. Presentaba alta tasa de colisiones y hoy está obsoleta.
            </li>
            <li>
              <strong>Anillo:</strong> Cada dispositivo se conecta directamente con otros dos formando un circuito cerrado. La información viaja en una sola dirección mediante un testigo de datos (token). Si un dispositivo se apaga o su cable falla, el anillo se rompe y la red se detiene.
            </li>
            <li>
              <strong>Estrella:</strong> Todos los nodos están conectados a un dispositivo centralizador común, que hoy suele ser un Switch. Si el cable de un nodo se rompe, solo ese nodo específico queda incomunicado. El resto de la red sigue funcionando con normalidad. Esta es la topología más extendida hoy en día.
            </li>
            <li>
              <strong>Malla:</strong> Cada nodo tiene una conexión física directa hacia todos los demás nodos de la red. Esto ofrece una redundancia óptima; si un enlace falla, el tráfico se redirige por otros caminos. Su inconveniente es el costo prohibitivo de cableado y puertos físicos.
            </li>
          </ul>
        `,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Qué diferencia a la topología en Estrella de las topologías en Bus o Anillo?",
            opciones: [
              "Requiere menos cable que cualquier otra topología",
              "Si un cable de un nodo individual se rompe, el resto de la red sigue operando normalmente",
              "No tiene ningún dispositivo centralizador en su estructura",
              "Elimina la necesidad de utilizar direcciones MAC en las comunicaciones"
            ],
            respuestaCorrecta: 1,
            explicacion: "En la topología en estrella, cada host tiene un enlace dedicado al switch central; por ende, un fallo en un cable individual solo aísla a ese host."
          },
          {
            id: 2,
            pregunta: "¿Cuál es la principal ventaja de la topología en Malla?",
            opciones: [
              "Su bajo costo de implementación y poco cableado",
              "Su extrema redundancia y tolerancia a fallos en los enlaces",
              "La extrema simplicidad para añadir nuevos dispositivos sin configuraciones adicionales",
              "Que no necesita de direcciones IP para realizar ruteo de paquetes"
            ],
            respuestaCorrecta: 1,
            explicacion: "Al estar todos conectados con todos (o casi todos), si un cable se rompe existen múltiples rutas alternativas para que los datos lleguen a su destino."
          },
          {
            id: 3,
            pregunta: "En una topología en Bus, ¿qué ocurre si el cable principal se corta en la mitad?",
            opciones: [
              "Toda la red deja de funcionar inmediatamente",
              "Solo los dispositivos en los extremos del cable pierden señal",
              "La red se divide en dos subredes que siguen operando de forma autónoma",
              "El dispositivo central detecta el corte y repara la señal digitalmente"
            ],
            respuestaCorrecta: 0,
            explicacion: "Las redes de tipo Bus requieren terminadores en los extremos para evitar el reflejo de la señal eléctrica. Si se corta, no hay terminación y toda la red queda inoperativa."
          },
          {
            id: 4,
            pregunta: "¿Qué dispositivo central se utiliza típicamente hoy en día para formar una topología en Estrella física?",
            opciones: [
              "Un repetidor de cable coaxial",
              "Un switch o conmutador",
              "Un cable de cobre de par trenzado cruzado",
              "Un servidor DNS corporativo"
            ],
            respuestaCorrecta: 1,
            explicacion: "El switch es el punto centralizador que interconecta todas las líneas dedicadas de los hosts en una topología en estrella moderna."
          },
          {
            id: 5,
            pregunta: "¿Qué define la topología lógica de una red?",
            opciones: [
              "La marca y modelo de los dispositivos de red instalados",
              "El camino o método que utilizan los datos para viajar a través de los enlaces físicos",
              "El plano arquitectónico del edificio donde se instala el cableado",
              "El total de bits que soporta la tarjeta de red del host de origen"
            ],
            respuestaCorrecta: 1,
            explicacion: "La topología lógica define cómo fluye la información entre dispositivos, independientemente de la distribución física de los cables."
          }
        ]
      },
      {
        id: 3,
        titulo: "Modelos de Referencia: OSI y TCP/IP",
        descripcionCorto: "Comprende la abstracción en capas que permite la comunicación de sistemas abiertos.",
        duracion: "13 min",
        conceptosClave: [
          {
            titulo: "Modelo OSI",
            descripcion: "Modelo de referencia teórico desarrollado por la ISO que divide la comunicación de red en 7 capas."
          },
          {
            titulo: "Modelo TCP/IP",
            descripcion: "Conjunto de protocolos prácticos de 4 capas en el que se basa el diseño global del Internet moderno."
          },
          {
            titulo: "Encapsulamiento",
            descripcion: "Proceso donde cada capa de red envuelve los datos con información de control específica de su nivel."
          }
        ],
        contenidoHtml: `
          <p>
            Para resolver el complejo problema de la interoperabilidad entre hardware de distintos fabricantes, se definieron modelos de capas estructuradas. Los dos modelos de referencia principales son el modelo teórico <strong>OSI (Open Systems Interconnection)</strong> y el modelo práctico **TCP/IP**.
          </p>
          <h2>El Modelo OSI (7 Capas)</h2>
          <ol>
            <li><strong>Capa Física (1):</strong> Transmite bits crudos a través del medio físico (voltajes, pulsos de luz, ondas de radio).</li>
            <li><strong>Capa de Enlace de Datos (2):</strong> Direccionamiento físico (direcciones MAC), control de acceso al medio y detección de errores de tramas.</li>
            <li><strong>Capa de Red (3):</strong> Direccionamiento lógico (direcciones IP) y determinación de la mejor ruta (enrutamiento).</li>
            <li><strong>Capa de Transporte (4):</strong> Conexión confiable o no confiable de extremo a extremo, control de flujo y segmentación (protocolos TCP y UDP).</li>
            <li><strong>Capa de Sesión (5):</strong> Establece, administra y termina las sesiones de comunicación entre aplicaciones.</li>
            <li><strong>Capa de Presentación (6):</strong> Traducción, formateo y cifrado de los datos para que la aplicación los entienda.</li>
            <li><strong>Capa de Aplicación (7):</strong> Interfaz de red directa para el usuario y las aplicaciones finales (HTTP, FTP, SMTP, DNS).</li>
          </ol>
          <h2>El Modelo TCP/IP (4 Capas)</h2>
          <p>
            El modelo TCP/IP es más simple y práctico, y consta de las siguientes capas:
          </p>
          <ul>
            <li><strong>Acceso a la Red:</strong> Equivale a las capas Física y Enlace de Datos de OSI.</li>
            <li><strong>Internet:</strong> Equivale a la capa de Red de OSI (utiliza el protocolo IP).</li>
            <li><strong>Transporte:</strong> Equivale a la capa de Transporte de OSI (TCP/UDP).</li>
            <li><strong>Aplicación:</strong> Une conceptualmente las capas de Sesión, Presentación y Aplicación del modelo OSI.</li>
          </ul>
        `,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Cuántas capas componen el modelo de referencia OSI?",
            opciones: [
              "4 capas",
              "5 capas",
              "6 capas",
              "7 capas"
            ],
            respuestaCorrecta: 3,
            explicacion: "El modelo OSI (Open Systems Interconnection) divide las funciones de comunicación en 7 niveles conceptuales bien estructurados."
          },
          {
            id: 2,
            pregunta: "¿En qué capa del modelo OSI operan los routers para tomar decisiones de envío de paquetes?",
            opciones: [
              "Capa 1 - Física",
              "Capa 2 - Enlace de Datos",
              "Capa 3 - Red",
              "Capa 4 - Transporte"
            ],
            respuestaCorrecta: 2,
            explicacion: "La Capa 3 (Red) maneja el direccionamiento lógico (IP) y es donde los routers procesan los paquetes para elegir las mejores rutas de tránsito."
          },
          {
            id: 3,
            pregunta: "¿Cómo se llama el proceso en el cual cada capa añade su propio encabezado a los datos antes de bajarlos?",
            opciones: [
              "Modulación",
              "Encapsulamiento",
              "Desfragmentación",
              "Compresión"
            ],
            respuestaCorrecta: 1,
            explicacion: "El encapsulamiento envuelve los datos originales agregando información de control (headers y footers) a medida que viajan de arriba hacia abajo por las capas."
          },
          {
            id: 4,
            pregunta: "¿Cuáles capas del modelo OSI se agrupan en la capa de Aplicación del modelo TCP/IP?",
            opciones: [
              "Física, Enlace y Red",
              "Red y Transporte",
              "Sesión, Presentación y Aplicación",
              "Solo Presentación y Transporte"
            ],
            respuestaCorrecta: 2,
            explicacion: "El modelo simplificado TCP/IP colapsa las tres capas superiores de OSI (Sesión, Presentación y Aplicación) en una única capa de Aplicación."
          },
          {
            id: 5,
            pregunta: "¿Qué capa de OSI maneja el direccionamiento físico MAC y la detección de errores de tramas?",
            opciones: [
              "Capa Física",
              "Capa de Enlace de Datos",
              "Capa de Red",
              "Capa de Transporte"
            ],
            respuestaCorrecta: 1,
            explicacion: "La Capa 2 (Enlace de datos) es la responsable de empaquetar los bits en tramas, gestionar las direcciones físicas MAC y validar la integridad física de las transmisiones locales."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    titulo: "Infraestructura Básica",
    descripcionCorto: "Descubre el hardware esencial que da vida a las redes: desde switches y routers hasta cableado físico e IPs.",
    duracion: "40 min",
    imagen: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    colorTheme: "from-fuchsia-500 to-pink-500",
    lecciones: [
      {
        id: 1,
        titulo: "Dispositivos de Interconexión (Switches vs. Routers)",
        descripcionCorto: "Estudia las diferencias clave entre los conmutadores y enrutadores que dirigen el tráfico en la red.",
        duracion: "12 min",
        conceptosClave: [
          {
            titulo: "Switch (Capa 2)",
            descripcion: "Dispositivo inteligente que dirige tramas basándose en direcciones físicas MAC dentro de una LAN."
          },
          {
            titulo: "Router (Capa 3)",
            descripcion: "Dispositivo que interconecta redes independientes y encamina los paquetes basándose en sus direcciones lógicas IP."
          },
          {
            titulo: "Dominio de Colisión",
            descripcion: "Segmento de red física en el cual múltiples tramas pueden chocar. El switch crea un dominio exclusivo por puerto."
          }
        ],
        contenidoHtml: `
          <p>
            Los dispositivos de red organizan la ruta que toman los bits. Los dos equipos de interconexión más importantes son el <strong>Switch (conmutador)</strong> y el <strong>Router (enrutador)</strong>.
          </p>
          <h2>El Switch (Capa 2 del Modelo OSI)</h2>
          <p>
            El switch se utiliza para conectar dispositivos en la <strong>misma red local (LAN)</strong>. Lee los encabezados de las tramas de datos Ethernet para identificar la dirección física de hardware, llamada <strong>dirección MAC</strong>. Mantiene una tabla dinámica (tabla de direcciones MAC) donde asocia cada MAC con el puerto físico donde está conectado el host. Esto evita enviar los datos a toda la red (lo que hacía un Hub), reduciendo las colisiones a cero y optimizando el ancho de banda.
          </p>
          <h2>El Router (Capa 3 del Modelo OSI)</h2>
          <p>
            A diferencia de un switch, el router opera en la capa de red y se encarga de <strong>interconectar diferentes redes lógicas</strong> (por ejemplo, tu red local con Internet). Lee las direcciones IP de los paquetes de datos y consulta su <strong>tabla de enrutamiento</strong> para determinar a través de qué interfaz física y hacia qué próximo salto debe viajar el paquete para acercarse a su destino.
          </p>
          <div class="my-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm">
            <h3 class="text-sm font-semibold text-fuchsia-400 mb-2">⚖️ Resumen Técnico</h3>
            <p class="text-zinc-400 text-sm leading-relaxed m-0">
              Un switch opera con <strong>tramas (frames)</strong> y direcciones MAC físicas; un router opera con <strong>paquetes (packets)</strong> y direcciones IP lógicas. El switch crea la red local, el router conecta redes locales al exterior.
            </p>
          </div>
        `,
        preguntas: [
        {
          id: 1,
          pregunta: "¿Cuál es la función principal de un Switch en una red local?",
          opciones: [
            "Convertir señales analógicas de teléfono a señales digitales",
            "Interconectar equipos locales dirigiendo tramas según sus direcciones físicas MAC",
            "Asignar dinámicamente direcciones IP a todos los hosts de la red",
            "Bloquear virus informáticos y spam de correo electrónico"
          ],
          respuestaCorrecta: 1,
          explicacion: "El switch lee las tramas de capa 2 y las distribuye selectivamente al puerto físico que corresponda a la MAC destino."
        },
          {
            id: 2,
            pregunta: "¿Cuál es la principal tarea de un Router de red?",
            opciones: [
              "Conectar una impresora directamente al puerto de red por USB",
              "Interconectar múltiples redes independientes y elegir la ruta óptima para los paquetes basándose en IPs",
              "Cargar y almacenar archivos HTML de sitios web populares",
              "Limitar físicamente el cable de red a una longitud de 10 metros"
            ],
            respuestaCorrecta: 1,
            explicacion: "El router conecta redes distintas y utiliza direccionamiento IP con tablas de enrutamiento para encauzar el tráfico interredes."
          },
          {
            id: 3,
            pregunta: "¿En qué capa del modelo OSI opera un Switch estándar de red local?",
            opciones: [
              "Capa 1 - Física",
              "Capa 2 - Enlace de Datos",
              "Capa 3 - Red",
              "Capa 4 - Transporte"
            ],
            respuestaCorrecta: 1,
            explicacion: "Un switch común opera en el nivel de Enlace de datos (Capa 2), procesando tramas Ethernet."
          },
          {
            id: 4,
            pregunta: "¿En qué capa de OSI opera un Router convencional?",
            opciones: [
              "Capa 1",
              "Capa 2",
              "Capa 3",
              "Capa 4"
            ],
            respuestaCorrecta: 2,
            explicacion: "El router tradicional opera en la Capa 3 (Red), ya que toma decisiones basadas en el direccionamiento IP de los paquetes."
          },
          {
            id: 5,
            pregunta: "¿Qué diferencia crítica de rendimiento hay entre un Switch y un antiguo Hub?",
            opciones: [
              "El Hub es inteligente y el Switch retransmite todo por inundación",
              "El Switch divide la red en dominios de colisión individuales por puerto; el Hub repite el tráfico hacia todos sus puertos",
              "El Hub soporta IPv6 y el Switch solo IPv4",
              "El Switch es mucho más lento debido al cifrado de datos incorporado en su hardware"
            ],
            respuestaCorrecta: 1,
            explicacion: "El hub es un repetidor físico (capa 1) que reenvía todo lo que recibe por todos los puertos, mientras que el switch (capa 2) conmuta las tramas inteligentemente al puerto del destino."
          }
        ]
      },
      {
        id: 2,
        titulo: "Medios de Transmisión (Cobre, Fibra y Wifi)",
        descripcionCorto: "Estudia el soporte físico y electromagnético que transporta la señal de red.",
        duracion: "13 min",
        conceptosClave: [
          {
            titulo: "Par Trenzado UTP",
            descripcion: "Cable de cobre trenzado para reducir el ruido eléctrico; limitado a 100 metros por segmento."
          },
          {
            titulo: "Fibra Óptica",
            descripcion: "Medio físico compuesto por hilos de vidrio que transmite datos mediante pulsos de luz con cero susceptibilidad a interferencias."
          },
          {
            titulo: "Wi-Fi (802.11)",
            descripcion: "Tecnología de transmisión inalámbrica local basada en ondas de radio en las bandas de 2.4 GHz, 5 GHz y 6 GHz."
          }
        ],
        contenidoHtml: `
          <p>
            Los datos deben representarse mediante cambios de voltaje, ondas de radio o destellos de luz. Los medios de transmisión físicos de la infraestructura de red se dividen en medios guiados (cobre, fibra) y medios no guiados (inalámbricos).
          </p>
          <h2>Cable de Cobre de Par Trenzado (UTP/STP)</h2>
          <p>
            Es el medio de conexión más común en redes LAN por su bajo costo y flexibilidad. Utiliza conectores <strong>RJ-45</strong> y consiste en 8 hilos de cobre trenzados en pares para cancelar la diafonía y la interferencia electromagnética (EMI) externa. Tiene un límite estricto de <strong>100 metros</strong> por segmento físico. A partir de esa distancia, la atenuación de la señal compromete la integridad de la transmisión de datos.
          </p>
          <h2>Fibra Óptica</h2>
          <p>
            Consiste en filamentos de vidrio ultra purificado o plástico que transportan datos como <strong>pulsos de luz</strong>. Ofrece velocidades masivas de datos y es <strong>inmune a la interferencia electromagnética</strong>. Se clasifica en:
          </p>
          <ul>
            <li><strong>Fibra Monomodo (SMF):</strong> Tiene un núcleo extremadamente delgado por el que pasa un único haz de luz generado por un emisor láser. Permite cubrir distancias de decenas de kilómetros sin repetidores.</li>
            <li><strong>Fibra Multimodo (MMF):</strong> Posee un núcleo más grueso donde la luz rebota en múltiples ángulos. Usa emisores LED económicos y es ideal para distancias cortas (hasta 550 metros), como enlaces dentro de un mismo centro de datos.</li>
          </ul>
          <h2>Inalámbrico (Wi-Fi)</h2>
          <p>
            Usa ondas de radio del espectro electromagnético. Estandarizado bajo la norma <strong>IEEE 802.11</strong>. Es sensible a obstáculos físicos, reflexiones de señal y otras interferencias por radiofrecuencia (por ejemplo, hornos microondas o teléfonos inalámbricos en la banda de 2.4 GHz).
          </p>
        `,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Cuál es el límite máximo de distancia estándar de un segmento de cable UTP?",
            opciones: [
              "50 metros",
              "100 metros",
              "250 metros",
              "1 kilómetro"
            ],
            respuestaCorrecta: 1,
            explicacion: "El estándar de Ethernet sobre cobre limita el cable UTP a un máximo de 100 metros para garantizar una señalización digital estable sin excesiva atenuación."
          },
          {
            id: 2,
            pregunta: "¿Por qué la fibra óptica es inmune a las interferencias electromagnéticas?",
            opciones: [
              "Porque está blindada con plomo de alta densidad",
              "Porque utiliza pulsos de luz en lugar de corrientes eléctricas para transportar los datos",
              "Porque opera exclusivamente bajo tierra",
              "Porque utiliza cables de cobre trenzados en sentido inverso"
            ],
            respuestaCorrecta: 1,
            explicacion: "Al transmitir fotones de luz por un medio de vidrio no conductor, no sufre los efectos de inducción causados por campos magnéticos externos."
          },
          {
            id: 3,
            pregunta: "¿Qué tipo de fibra óptica usa un haz láser y cubre distancias de kilómetros?",
            opciones: [
              "Fibra Monomodo",
              "Fibra Multimodo",
              "Fibra Plástica UTP",
              "Fibra Coaxial"
            ],
            respuestaCorrecta: 0,
            explicacion: "La fibra monomodo (Single-Mode Fiber) minimiza los rebotes de luz en el núcleo, permitiendo que un láser viaje kilómetros sin dispersión de señal."
          },
          {
            id: 4,
            pregunta: "¿Qué estándar de la IEEE define formalmente el funcionamiento de las redes inalámbricas Wi-Fi?",
            opciones: [
              "IEEE 802.3",
              "IEEE 802.5",
              "IEEE 802.11",
              "IEEE 802.15"
            ],
            respuestaCorrecta: 2,
            explicacion: "El estándar IEEE 802.11 y sus enmiendas (a, b, g, n, ac, ax) definen el funcionamiento físico y de enlace de las redes locales inalámbricas (Wi-Fi)."
          },
          {
            id: 5,
            pregunta: "¿Cuál es el tipo de cable de cobre que incluye blindaje metálico para aislar interferencias externas?",
            opciones: [
              "UTP",
              "STP",
              "Coaxial delgado",
              "Fibra óptica de vidrio"
            ],
            respuestaCorrecta: 1,
            explicacion: "STP (Shielded Twisted Pair) incluye un apantallamiento de lámina metálica alrededor de los pares trenzados para proteger la transmisión en ambientes ruidosos."
          }
        ]
      },
      {
        id: 3,
        titulo: "Direccionamiento IP y Subredes",
        descripcionCorto: "Aprende el direccionamiento lógico del protocolo IP (IPv4 e IPv6) y la segmentación en subredes.",
        duracion: "15 min",
        conceptosClave: [
          {
            titulo: "Dirección IP",
            descripcion: "Identificador lógico de red asignado a un dispositivo conectado a una red IP."
          },
          {
            titulo: "Máscara de Subred",
            descripcion: "Filtro binario de 32 bits que separa la porción de red de la porción de host en una IP."
          },
          {
            titulo: "IPv6 (128 bits)",
            descripcion: "Sucesor de IPv4 que ofrece un espacio de direccionamiento prácticamente ilimitado."
          }
        ],
        contenidoHtml: `
          <p>
            Para que la información pueda direccionarse por el mundo, cada interfaz de red necesita una dirección lógica única. El protocolo principal utilizado es el <strong>Protocolo de Internet (IP)</strong>.
          </p>
          <h2>IPv4 (Internet Protocol Version 4)</h2>
          <p>
            Utiliza direcciones de <strong>32 bits</strong> representadas por cuatro números decimales separados por puntos (ej. <code>192.168.10.15</code>). El rango total teórico es de $2^{32}$ (unos 4.300 millones de direcciones), las cuales ya se encuentran completamente agotadas. Las IPs se dividen en:
          </p>
          <ul>
            <li><strong>IPs Públicas:</strong> Direcciones enrutables en todo el Internet global. Deben ser únicas en todo el mundo.</li>
            <li><strong>IPs Privadas:</strong> Utilizadas en redes internas (locales). El estándar <strong>RFC 1918</strong> define tres rangos exclusivos:
              <br>· Clase A: <code>10.0.0.0</code> a <code>10.255.255.255</code>
              <br>· Clase B: <code>172.16.0.0</code> a <code>172.31.255.255</code>
              <br>· Clase C: <code>192.168.0.0</code> a <code>192.168.255.255</code>
            </li>
          </ul>
          <h2>Máscara de Subred y Notación CIDR</h2>
          <p>
            La máscara indica al sistema operativo qué parte de la dirección IP identifica a la red común y qué parte identifica al host específico. Por ejemplo, en una máscara <code>255.255.255.0</code> (o notación CIDR <code>/24</code>), los primeros 24 bits corresponden a la red, dejando los 8 bits finales para direccionar hasta 254 hosts locales independientes.
          </p>
          <h2>IPv6: La Solución al Agotamiento</h2>
          <p>
            Para paliar el agotamiento de IPv4, se creó IPv6. Utiliza direcciones lógicas de <strong>128 bits</strong> escritas en formato hexadecimal (ocho bloques de cuatro dígitos separados por dos puntos, ej. <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>). Permite autoconfiguración nativa (SLAAC) e integra seguridad IPsec de forma obligatoria.
          </p>
        `,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Cuántos bits componen una dirección IPv4 y una dirección IPv6 respectivamente?",
            opciones: [
              "16 bits y 32 bits",
              "32 bits y 64 bits",
              "32 bits y 128 bits",
              "64 bits y 128 bits"
            ],
            respuestaCorrecta: 2,
            explicacion: "IPv4 usa un espacio de 32 bits (representado en decimal) e IPv6 un espacio de 128 bits (representado en hexadecimal)."
          },
          {
            id: 2,
            pregunta: "Si un host tiene la dirección IP 192.168.1.50 con máscara /24 (255.255.255.0), ¿cuál es la dirección de la subred?",
            opciones: [
              "192.168.1.0",
              "192.168.1.255",
              "192.168.0.0",
              "192.0.0.0"
            ],
            respuestaCorrecta: 0,
            explicacion: "Al tener una máscara /24, los primeros tres octetos representan a la red. El valor del host (50) se vuelve 0 para obtener la dirección de subred."
          },
          {
            id: 3,
            pregunta: "¿Cuál de los siguientes es un rango de direcciones IP privadas reservadas por el RFC 1918?",
            opciones: [
              "8.8.8.0 a 8.8.8.255",
              "10.0.0.0 a 10.255.255.255",
              "1.1.1.0 a 1.1.1.255",
              "200.20.20.0 a 200.20.20.255"
            ],
            respuestaCorrecta: 1,
            explicacion: "El rango 10.0.0.0/8 es el bloque privado de Clase A definido en el estándar RFC 1918 para redes corporativas o locales de gran tamaño."
          },
          {
            id: 4,
            pregunta: "¿En qué formato de representación se escriben típicamente las direcciones IPv6?",
            opciones: [
              "Decimal separado por puntos en ocho bloques",
              "Hexadecimal separado por dos puntos en ocho grupos",
              "Binario crudo de 128 caracteres",
              "Octal dividido por barras diagonales en cuatro bloques"
            ],
            respuestaCorrecta: 1,
            explicacion: "Las direcciones IPv6 se representan en formato hexadecimal de 8 bloques separados por dos puntos (ej: 2001:0db8:...)."
          },
          {
            id: 5,
            pregunta: "¿Qué función cumple la máscara de subred en una red IP?",
            opciones: [
              "Cifrar el tráfico local para que no salga al router de borde",
              "Determinar qué parte de la dirección IP corresponde a la red y cuál al dispositivo (host)",
              "Acelerar la descarga de datos desde servidores externos",
              "Asignar la dirección MAC física de forma dinámica a la tarjeta de red"
            ],
            respuestaCorrecta: 1,
            explicacion: "La máscara de subred realiza una operación AND binaria con la dirección IP para dividir lógicamente el identificador de red y el identificador de host."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    titulo: "Monitoreo de Redes",
    descripcionCorto: "Aprende a diagnosticar problemas de rendimiento, medir latencia y dominar protocolos de monitoreo como SNMP e ICMP.",
    duracion: "30 min",
    imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    colorTheme: "from-blue-500 to-cyan-500",
    lecciones: [
      {
        id: 1,
        titulo: "Protocolos de Monitoreo (SNMP)",
        descripcionCorto: "Estudia el estándar SNMP empleado para recopilar datos de rendimiento en infraestructura de red.",
        duracion: "10 min",
        conceptosClave: [
          {
            titulo: "SNMP",
            descripcion: "Simple Network Management Protocol. Protocolo de capa de aplicación para la gestión de dispositivos IP."
          },
          {
            titulo: "MIB",
            descripcion: "Management Information Base. Base de datos estructurada jerárquicamente que define las variables del dispositivo."
          },
          {
            titulo: "Trap SNMP",
            descripcion: "Mensaje de alerta enviado asíncronamente por el agente al NMS cuando ocurre un evento crítico."
          }
        ],
        contenidoHtml: `
          <p>
            El monitoreo de redes es crítico para mantener la continuidad del servicio. El protocolo estándar de la industria para recopilar estadísticas de rendimiento de hardware de red es <strong>SNMP (Simple Network Management Protocol)</strong>.
          </p>
          <h2>Arquitectura SNMP</h2>
          <p>
            SNMP utiliza un modelo basado en los siguientes componentes:
          </p>
          <ul>
            <li><strong>NMS (Network Management System):</strong> El servidor de administración centralizado que recopila estadísticas y genera gráficos e informes de uso.</li>
            <li><strong>Agente SNMP:</strong> Un software que se ejecuta de forma interna en los switches, routers, firewalls o servidores monitoreados.</li>
            <li><strong>MIB (Management Information Base):</strong> Una base de datos jerárquica instalada en el dispositivo que estructura las variables de rendimiento (ej: uso de CPU, bytes transmitidos en puerto 1). Cada variable se identifica por un <strong>OID (Object Identifier)</strong> único.</li>
          </ul>
          <h2>Operaciones Principales de SNMP</h2>
          <p>
            El NMS interactúa con los agentes a través de mensajes de red. Las operaciones clave son:
          </p>
          <ul>
            <li><strong>GET:</strong> El NMS solicita el valor de una variable específica a un dispositivo (ej: 'Dame la temperatura actual').</li>
            <li><strong>SET:</strong> El NMS cambia el valor de una configuración en el dispositivo (ej: 'Desactiva el puerto 5').</li>
            <li><strong>TRAP:</strong> El agente envía una notificación de manera proactiva e inmediata al NMS ante un fallo (ej: '¡Alerta de caída de alimentación eléctrica!'). Esto no requiere una consulta previa del NMS.</li>
          </ul>
          <h2>Seguridad en SNMP</h2>
          <p>
            Las versiones <strong>SNMPv1</strong> y <strong>SNMPv2c</strong> utilizan claves de comunidad en texto plano (sin cifrar). En contraste, <strong>SNMPv3</strong> introduce criptografía fuerte para autenticar a los usuarios y cifrar los paquetes de administración en tránsito.
          </p>
        `,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Cuál es el propósito principal del protocolo SNMP?",
            opciones: [
              "Enviar correos electrónicos de forma cifrada a servidores remotos",
              "Recopilar estadísticas de rendimiento y supervisar de forma remota los dispositivos de red",
              "Asignar direcciones MAC físicas a dispositivos inalámbricos nuevos",
              "Facilitar la carga y descarga de archivos pesados en servidores web"
            ],
            respuestaCorrecta: 1,
            explicacion: "SNMP está diseñado específicamente para recopilar datos del estado y rendimiento (CPU, enlaces, temperatura) de dispositivos en red."
          },
          {
            id: 2,
            pregunta: "En SNMP, ¿cuál es la diferencia principal entre un GET y un TRAP?",
            opciones: [
              "GET configura variables del dispositivo y TRAP limpia las estadísticas de uso",
              "GET es una consulta iniciada por el servidor NMS; TRAP es una alerta asíncrona iniciada proactivamente por el Agente",
              "GET solo funciona en routers y TRAP es exclusivo para switches locales",
              "GET requiere el puerto 80 TCP y TRAP opera sobre fibra óptica monomodo exclusivamente"
            ],
            respuestaCorrecta: 1,
            explicacion: "GET es una petición activa del NMS. TRAP es un aviso inmediato del agente al NMS cuando ocurre un evento crítico predefinido (ej: puerto caído)."
          },
          {
            id: 3,
            pregunta: "¿Qué estructura jerárquica contiene los identificadores lógicos de las variables de dispositivo en SNMP?",
            opciones: [
              "El modelo OSI de red",
              "La MIB (Management Information Base) indexada por OIDs",
              "El protocolo ARP local",
              "La tabla de ruteo IPsec"
            ],
            respuestaCorrecta: 1,
            explicacion: "La MIB define las variables de supervisión disponibles en formato de árbol jerárquico accesible mediante OIDs (Object Identifiers)."
          },
          {
            id: 4,
            pregunta: "¿Qué característica de seguridad fundamental aporta SNMPv3?",
            opciones: [
              "Soporte exclusivo para conexiones Wi-Fi de alta velocidad",
              "Cifrado de datos en tránsito y autenticación criptográfica de los usuarios de gestión",
              "Eliminación automática de correos maliciosos en la red",
              "Bloqueo físico de puertos de switches inactivos"
            ],
            respuestaCorrecta: 1,
            explicacion: "SNMPv3 soluciona los problemas de seguridad de v1 y v2c al encriptar las comunicaciones y validar la identidad de los administradores."
          },
          {
            id: 5,
            pregunta: "¿Qué componente de SNMP recopila la información y responde las solicitudes del NMS?",
            opciones: [
              "El navegador web de administración",
              "El Agente SNMP que corre en el dispositivo",
              "El servidor DNS global",
              "El firewall de borde de la red"
            ],
            respuestaCorrecta: 1,
            explicacion: "El Agente SNMP es el software local residente en el dispositivo que monitoriza su estado local y responde al NMS central."
          }
        ]
      },
      {
        id: 2,
        titulo: "Protocolo de Diagnóstico (ICMP y herramientas Ping/Traceroute)",
        descripcionCorto: "Aprende a diagnosticar conectividad y latencia mediante el protocolo de mensajes de control.",
        duracion: "10 min",
        conceptosClave: [
          {
            titulo: "ICMP",
            descripcion: "Internet Control Message Protocol. Protocolo de nivel de red para reportar errores y diagnosticar."
          },
          {
            titulo: "Ping (Echo)",
            descripcion: "Herramienta que valida el estado activo de un host y el tiempo de respuesta usando mensajes Echo de ICMP."
          },
          {
            titulo: "Traceroute (TTL)",
            descripcion: "Herramienta que rastrea el camino de enrutadores intermedios hasta un host destino manipulando el TTL."
          }
        ],
        contenidoHtml: `
          <p>
            Mientras que SNMP maneja métricas detalladas de rendimiento, el protocolo <strong>ICMP (Internet Control Message Protocol)</strong> maneja el control de flujo y diagnóstico básico en la capa de red (Capa 3). ICMP no transmite datos del usuario; transmite mensajes de servicio y errores.
          </p>
          <h2>Herramienta Ping</h2>
          <p>
            Es la utilidad más básica para verificar conectividad IP. Envía un paquete ICMP de tipo <strong>Echo Request</strong> (Solicitud de eco) al host destino. Si el destino está en línea y su firewall lo permite, responde con un paquete ICMP de tipo <strong>Echo Reply</strong> (Respuesta de eco). Mide el tiempo de ida y vuelta de la señal, llamado <strong>RTT (Round Trip Time)</strong> en milisegundos.
          </p>
          <h2>Herramienta Traceroute (tracert en Windows)</h2>
          <p>
            Permite ver el camino exacto que toma un paquete a través de múltiples routers intermediarios. Lo hace explotando el campo <strong>TTL (Time to Live)</strong> del encabezado IP.
          </p>
          <ol>
            <li>Envía paquetes con TTL=1. El primer router decrementa el TTL a 0, descarta el paquete y devuelve un mensaje ICMP <strong>Time Exceeded</strong> (Tiempo excedido), revelando su dirección IP.</li>
            <li>Envía paquetes con TTL=2. El segundo router lo descarta y revela su IP.</li>
            <li>Este proceso se repite incrementando el TTL secuencialmente hasta alcanzar la dirección IP del destino final.</li>
          </ol>
        `,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Cuál es la función principal de ICMP?",
            opciones: [
              "Enviar archivos y datos en tiempo real entre aplicaciones",
              "Reportar errores de red y proporcionar mensajes de control y diagnóstico",
              "Cifrar el canal de comunicación a nivel de transporte",
              "Convertir nombres de dominio legibles en direcciones IP públicas"
            ],
            respuestaCorrecta: 1,
            explicacion: "ICMP es un protocolo de soporte a nivel de red diseñado para que routers e interfaces notifiquen eventos de error (como host inalcanzable)."
          },
          {
            id: 2,
            pregunta: "¿Qué mensajes ICMP específicos utiliza Ping para medir la conectividad?",
            opciones: [
              "SYN y ACK",
              "Echo Request (Solicitud de eco) y Echo Reply (Respuesta de eco)",
              "GET y SET",
              "Time Exceeded y Host Unreachable"
            ],
            respuestaCorrecta: 1,
            explicacion: "El ping envía una solicitud 'Echo Request' (tipo 8) y espera una respuesta 'Echo Reply' (tipo 0) del host remoto."
          },
          {
            id: 3,
            pregunta: "¿Cómo determina Traceroute las direcciones IP de los routers intermediarios?",
            opciones: [
              "Consultando la tabla de direcciones MAC del switch de salida",
              "Incrementando secuencialmente el TTL de los paquetes IP y capturando los mensajes ICMP Time Exceeded devueltos por cada router",
              "Descargando el mapa postal del proveedor de servicios de Internet",
              "Cifrando los puertos UDP en el host de destino final"
            ],
            respuestaCorrecta: 1,
            explicacion: "Cada salto decrementa el TTL. Al mandar paquetes con TTL=1, 2, 3, etc., Traceroute provoca la caída controlada del paquete en cada router del camino, forzándolo a identificarse."
          },
          {
            id: 4,
            pregunta: "Si un paquete de datos IP tiene un TTL (Time to Live) que llega a 0 en un enrutador en tránsito, ¿qué ocurre?",
            opciones: [
              "El enrutador acelera el paquete duplicando su prioridad",
              "El enrutador descarta el paquete y envía un mensaje ICMP de tiempo excedido al origen",
              "El paquete se almacena indefinidamente en la memoria del enrutador",
              "El remitente es bloqueado permanentemente por violar las normas del protocolo"
            ],
            respuestaCorrecta: 1,
            explicacion: "El TTL es un contador de saltos para evitar bucles infinitos. Si llega a 0, el paquete se destruye y el router envía el mensaje ICMP correspondiente."
          },
          {
            id: 5,
            pregunta: "¿En qué capa del modelo OSI opera el protocolo ICMP?",
            opciones: [
              "Capa 1",
              "Capa 2",
              "Capa 3",
              "Capa 4"
            ],
            respuestaCorrecta: 2,
            explicacion: "ICMP está empaquetado directamente dentro de los datagramas IP, por lo que opera a nivel de red (Capa 3)."
          }
        ]
      },
      {
        id: 3,
        titulo: "Métricas de Rendimiento (Ancho de banda, Latencia y Pérdidas)",
        descripcionCorto: "Comprende los parámetros clave de desempeño: ancho de banda, rendimiento real, latencia y pérdida de paquetes.",
        duracion: "10 min",
        conceptosClave: [
          {
            titulo: "Latency (Latencia)",
            descripcion: "Tiempo requerido para transmitir un paquete de datos a través de la red de origen a destino."
          },
          {
            titulo: "Throughput (Rendimiento)",
            descripcion: "Tasa de datos útiles transferidos con éxito por unidad de tiempo; siempre menor que el ancho de banda."
          },
          {
            titulo: "Jitter",
            descripcion: "Variación o fluctuación en los tiempos de llegada de los paquetes; crítico en audio y video en tiempo real."
          }
        ],
        contenidoHtml: `
          <p>
            El análisis estadístico del flujo de datos se sustenta en tres métricas operativas de rendimiento básicas:
          </p>
          <h2>Ancho de Banda vs. Throughput</h2>
          <p>
            El <strong>Ancho de Banda</strong> es la capacidad de transferencia máxima teórica de un canal físico (ej. fibra de 1 Gbps). El <strong>Throughput (Rendimiento real)</strong> es la velocidad real de transferencia de datos útiles (sin incluir las cabeceras de protocolos) que se logra en un momento dado. El Throughput siempre es inferior al ancho de banda debido al consumo administrativo de los protocolos (overhead), colisiones o congestión temporal.
          </p>
          <h2>Latencia (Retardo)</h2>
          <p>
            Es el tiempo que le toma a un paquete viajar desde el host de origen al host de destino. Está compuesta por:
          </p>
          <ul>
            <li><strong>Retardo de procesamiento:</strong> Tiempo que tardan los routers en analizar los encabezados.</li>
            <li><strong>Retardo de cola:</strong> Tiempo que pasa el paquete en los buffers del switch/router esperando ser transmitido.</li>
            <li><strong>Retardo de transmisión:</strong> Tiempo requerido para empujar los bits físicos al medio de red.</li>
            <li><strong>Retardo de propagación:</strong> Tiempo que le toma a la señal física viajar a la velocidad de la luz/electricidad por la distancia del cable.</li>
          </ul>
          <h2>Pérdida de Paquetes y Jitter</h2>
          <p>
            La <strong>pérdida de paquetes</strong> ocurre cuando los buffers de un router intermedio se llenan por congestión y este se ve obligado a descartar paquetes (Tail Drop), o por ruido físico en el medio. El **Jitter** es la fluctuación temporal en la latencia. Si los paquetes de voz llegan con latencias muy variables (ej: paquete 1 en 20ms, paquete 2 en 180ms), el sonido de la VoIP se escuchará cortado e inteligible.
          </p>
        `,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Qué diferencia al Ancho de Banda del Throughput (Rendimiento real)?",
            opciones: [
              "El Ancho de Banda es real y el Throughput es teórico",
              "El Ancho de Banda es la velocidad máxima teórica del canal, mientras que el Throughput es el flujo real de datos útiles medido",
              "No existe ninguna diferencia; son sinónimos absolutos en redes",
              "El Throughput solo se mide en redes inalámbricas y el Ancho de Banda en redes cableadas"
            ],
            respuestaCorrecta: 1,
            explicacion: "El ancho de banda indica el límite de capacidad de la línea; el throughput es lo que realmente logramos transferir descontando la sobrecarga de protocolos y la atenuación."
          },
          {
            id: 2,
            pregunta: "¿Qué representa la latencia RTT de red?",
            opciones: [
              "La cantidad de usuarios activos conectados al router de acceso",
              "El tiempo de ida y vuelta que toma la señal en ir al destino y retornar",
              "El porcentaje de cables Ethernet dañados en la red",
              "La capacidad de disco duro del servidor de base de datos"
            ],
            respuestaCorrecta: 1,
            explicacion: "RTT (Round-Trip Time) mide el tiempo que un paquete tarda en viajar de ida y vuelta al destino."
          },
          {
            id: 3,
            pregunta: "¿Qué es el Jitter en redes informáticas?",
            opciones: [
              "Un software diseñado para descifrar contraseñas de switches",
              "La variación o fluctuación en el retardo (latencia) de llegada de los paquetes de datos",
              "Un conector físico blindado de cobre para interconectar routers",
              "La tasa máxima de bits perdidos por metro de cable coaxial"
            ],
            respuestaCorrecta: 1,
            explicacion: "El jitter es la variabilidad del retardo de red. Un jitter alto destruye la calidad de las comunicaciones síncronas en tiempo real."
          },
          {
            id: 4,
            pregunta: "¿Cuál es la causa más común de la pérdida de paquetes por saturación?",
            opciones: [
              "Que el cable de red sea de color incorrecto",
              "Que los buffers del enrutador se llenen debido a la congestión de tráfico y comiencen a descartar paquetes",
              "Que el host de destino no tenga un navegador web instalado",
              "Que la dirección MAC se haya cambiado por software"
            ],
            respuestaCorrecta: 1,
            explicacion: "Cuando el volumen de tráfico supera la velocidad de salida de una interfaz, la cola del router se llena. Los paquetes nuevos que lleguen serán inevitablemente descartados."
          },
          {
            id: 5,
            pregunta: "¿Cuál de los siguientes retardos depende directamente de la distancia física que debe recorrer la señal por el cable?",
            opciones: [
              "Retardo de cola",
              "Retardo de procesamiento",
              "Retardo de propagación",
              "Retardo de transmisión"
            ],
            respuestaCorrecta: 2,
            explicacion: "El retardo de propagación se define por la velocidad de la señal en el medio (aprox. 200,000 km/s en cobre/vidrio) multiplicada por la distancia del enlace."
          }
        ]
      }
    ]
  }
];
