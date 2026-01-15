# Customer Health Dashboard - TRAXIÓN

> **Hackatón Bécalos Traxión Tech Challenge 2025 - Eje 2: Detección Temprana de Clientes en Riesgo**

Sistema de inteligencia artificial para transformar la gestión de clientes de **reactiva a preventiva**, detectando señales de riesgo antes de que escalen.

## 🌐 Demo en Vivo

👉 **[Ver Dashboard en Vivo](https://jocular-sfogliatella-486ff4.netlify.app/)**

---

## 📋 Descripción

Este dashboard permite a los equipos de Customer Success de Traxión:

- **Visualizar la cartera completa** con semáforo de riesgo (Bajo, Medio, Alto, Crítico)
- **Analizar clientes individualmente** con métricas de NPS, puntualidad, nivel de servicio y quejas
- **Recibir recomendaciones de IA** con acciones específicas y plazos
- **Priorizar intervenciones** basadas en impacto financiero

---

## ✨ Características

| Funcionalidad                 | Descripción                                                      |
| ----------------------------- | ---------------------------------------------------------------- |
| 📊 **Vista de Cartera**       | KPIs globales, tabla de priorización, alertas urgentes           |
| 🔍 **Análisis Individual**    | Formulario de métricas, semáforo de riesgo, gráfica de tendencia |
| 🤖 **Asistente IA**           | Chat conversacional para consultas en lenguaje natural           |
| 💬 **Widget Flotante**        | Análisis automático al seleccionar un cliente                    |
| ⚡ **Alertas en Tiempo Real** | Detección inmediata de valores críticos                          |

---

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Gráficas**: Chart.js
- **IA**: Groq API (LLaMA 3.1 8B)
- **Diseño**: Inter Font (Google Fonts)

---

## 🚀 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/ErickDani001/HACK.-DEV.F2026.git

# Entrar al directorio
cd HACK.-DEV.F2026/proyecto_hackaton

# Crear archivo de configuración
echo 'const CONFIG = { GROQ_API_KEY: "tu-api-key-aqui" };' > js/config.js

# Iniciar servidor local
python3 -m http.server 8080

# Abrir en navegador
# http://localhost:8080
```

---

## ⚠️ Limitaciones (MVP)

| Limitante            | Descripción                                    |
| -------------------- | ---------------------------------------------- |
| 📦 Datos simulados   | 5 clientes de ejemplo (sin base de datos real) |
| 🔐 Sin autenticación | No hay login ni roles de usuario               |
| 🌐 Sin backend       | Frontend puro, depende de API externa          |
| 📊 API con límites   | Groq: 14,400 req/día, 30 req/min               |

---

## 📁 Estructura del Proyecto

```
proyecto_hackaton/
├── index.html          # Página principal
├── favicon.svg         # Logo
├── css/
│   ├── styles.css      # Estilos principales
│   └── responsive.css  # Estilos responsivos
└── js/
    ├── agente-ia.js    # Lógica del agente IA + datos
    ├── app.js          # Lógica de interfaz
    └── config.js       # API Key (no incluido en git)
```

---

## 👥 Equipo

**Hackatón Bécalos Traxión Tech Challenge 2025**

Edgar Gerardo Toledano Rocha
Rosario Itzel Gomez Rodriguezs
Erick Daniel Avila Martínez

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del Hackatón Bécalos Traxión Tech Challenge 2025.
