# 🚛 Customer Health Dashboard - TRAXIÓN

## Hackatón Bécalos Traxión Tech Challenge 2025

### Eje 2: Detección Temprana de Clientes en Riesgo

---

## 📁 Estructura del Proyecto

```
proyecto_hackaton/
├── index.html              # Dashboard principal
├── documento-ejecutivo.html # Documento de 1 página (para imprimir a PDF)
├── css/
│   └── styles.css          # Estilos del dashboard
└── js/
    ├── agente-ia.js        # Agente de IA (scoring, análisis, recomendaciones)
    └── app.js              # Lógica de la interfaz
```

---

## 🚀 Cómo Usar

### 1. Abrir el Dashboard

Simplemente abre `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).

```bash
# Opción 1: Doble clic en index.html

# Opción 2: Desde terminal
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### 2. Navegar por las 3 Vistas

| Vista                   | Descripción                                              |
| ----------------------- | -------------------------------------------------------- |
| **Análisis Individual** | Evalúa un cliente específico con sus métricas            |
| **Vista Radar**         | Resumen de toda la cartera con KPIs y tabla de prioridad |
| **Agente IA**           | Chat conversacional para consultas                       |

### 3. Generar Documento Ejecutivo

1. Abre `documento-ejecutivo.html` en el navegador
2. Imprime a PDF (Ctrl+P o Cmd+P)
3. Selecciona "Guardar como PDF"

---

## 🤖 Funcionalidades del Agente de IA

### Sistema de Scoring (0-100 puntos)

| Métrica           | Peso | Umbrales                                             |
| ----------------- | ---- | ---------------------------------------------------- |
| Nivel de Servicio | 30%  | <85%: -35 pts \| 85-89%: -20 pts \| 90-94%: -10 pts  |
| Puntualidad       | 25%  | <85%: -30 pts \| 85-89%: -20 pts \| 90-94%: -10 pts  |
| NPS               | 20%  | <30: -40 pts \| 30-49: -25 pts \| 50-69: -15 pts     |
| Quejas Abiertas   | 15%  | 4+: -35 pts \| 3: -25 pts \| 2: -15 pts \| 1: -5 pts |
| Tendencia         | 10%  | Negativa: -20 pts \| Positiva: +10 pts               |

### Clasificación de Riesgo

| Emoji | Nivel   | Score  | Acción                |
| ----- | ------- | ------ | --------------------- |
| 🟢    | BAJO    | 80-100 | Monitoreo regular     |
| 🟡    | MEDIO   | 50-79  | Seguimiento proactivo |
| 🔴    | ALTO    | 20-49  | Acción inmediata      |
| ⚫    | CRÍTICO | 0-19   | Escalación urgente    |

### Comandos del Chat

```
"Analiza [nombre del cliente]"  → Análisis detallado
"Muestra la cartera"           → Resumen general
"Clientes en riesgo alto"      → Lista de alertas
"Ayuda"                        → Comandos disponibles
```

---

## 📊 Clientes Simulados Incluidos

| Cliente               | Industria   | Score | Riesgo     |
| --------------------- | ----------- | ----- | ---------- |
| Corporativo ABC       | Manufactura | 28    | 🔴 Alto    |
| Empresa XYZ Tech      | Tecnología  | 87    | 🟢 Bajo    |
| Logística DEF Express | Logística   | 55    | 🟡 Medio   |
| Industrias GHI        | Manufactura | 12    | ⚫ Crítico |
| TransMex Solutions    | Transporte  | 75    | 🟡 Medio   |

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables CSS, Grid, Flexbox
- **JavaScript ES6** - Lógica del agente y UI
- **Chart.js** - Gráficas de tendencias
- **Google Fonts (Inter)** - Tipografía profesional

---

## 📄 Entregables del Hackatón

1. ✅ **Agente de IA** → `js/agente-ia.js`
2. ✅ **Prototipo Web** → `index.html` + CSS + JS
3. ✅ **Documento Ejecutivo** → `documento-ejecutivo.html`

---

## 👥 Equipo

**[Nombre del Equipo]**

- [Nombre 1] - Desarrollo
- [Nombre 2] - Estrategia de Negocio / Documento Ejecutivo
- [Nombre 3] - Diseño / Prompt Engineering

---

## 📅 Deadline

**Jueves 15 de enero, 2025 - 11:59 AM**

---

© 2025 Hackatón Bécalos Traxión Tech Challenge
