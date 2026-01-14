# REPORTE DE SOLUCIÓN: Customer Health AI Agent

## Hackatón Bécalos Traxión Tech Challenge 2025

Este documento explica en lenguaje sencillo qué construimos, por qué es innovador y cómo funciona la solución. Úsalo como guía para entender el proyecto o como guion para presentarlo ante los jueces.

---

### 1. ¿Cuál es el Problema? (El "Dolor")

Las empresas de logística pierden millones cuando clientes importantes se van (Churn). El problema es que **nos damos cuenta demasiado tarde**, cuando el cliente ya está enojado o ya canceló el contrato. Los reportes tradicionales solo nos dicen lo que pasó ayer, no lo que pasará mañana.

### 2. Nuestra Solución (La "Medicina")

Creamos el **Customer Health AI Agent**, una plataforma inteligente que no solo monitorea, sino que **predice** el riesgo y **recomienda** qué hacer para salvar al cliente.

No es solo un tablero con gráficas; es un **asistente proactivo** que combina matemáticas precisas con inteligencia artificial generativa.

### 3. ¿Qué hace la herramienta? (Las 3 Vistas)

#### A. Análisis Individual (El Microscopio)

Permite a un Gerente de Cuenta (KAM) revisar a un cliente específico.

- **Semáforo de Riesgo:** Te dice al instante si el cliente está en Verde (Sano), Amarillo (Alerta), Rojo (Alto Riesgo) o Negro (Crítico).
- **Cálculo Matemático:** Usamos una fórmula ponderada (Nivel de Servicio 30%, Puntualidad 25%, NPS 20%, etc.) para que el resultado sea 100% objetivo.
- **Proyección Financiera:** Calcula cuánto dinero perderíamos si el cliente se va y si vale la pena invertir para retenerlo (ROI).

#### B. Vista de Cartera (El Radar)

Es la vista para el Director.

- Muestra el **Valor Total en Riesgo** (ej. "$4.5 Millones en peligro").
- Identifica cuántos clientes necesitan atención urgente hoy mismo.
- Prioriza a quién llamar primero basándose en el dinero que nos pagan.

#### C. El Chatbot Híbrido (El Cerebro)

Aquí está la innovación técnica. Implementamos una **Arquitectura Híbrida**:

1.  **Cálculo Local (Seguridad):** Las matemáticas del riesgo se hacen en tu computadora. Esto garantiza que los números siempre sean exactos y rápidos, sin depender de internet.
2.  **Inteligencia Gemini (Razonamiento):** Conectamos el chat a la IA de Google (Gemini). Tú puedes preguntarle _"¿Qué estrategia uso con este cliente enojado?"_ y la IA leerá los datos del cliente y te dará una respuesta profesional y empática.
    - _Nota:_ Si no tienes internet o API Key, el sistema tiene un "piloto automático" que responde con frases pre-cargadas para que la demo nunca falle.

### 4. ¿Por qué esta solución gana el Hackatón?

1.  **Impacto de Negocio Real:** No es un juguete tecnológico. Ataca directamente la pérdida de dinero (Churn).
2.  **Diseño Profesional:** Eliminamos los emojis y colores chillones. Se ve como un software corporativo real que Traxión podría usar mañana.
3.  **Tecnología Sensata:** No usamos IA para sumar 2+2 (eso falla). Usamos IA para lo que es buena: entender el contexto y recomendar estrategias humanas.

### 5. Instrucciones para la Demo

1.  Abre el archivo `index.html` en tu navegador.
2.  Ve a la pestaña **"Análisis Individual"** y presiona "Ejecutar Análisis". Verás cómo el semáforo cambia y aparecen recomendaciones.
3.  Ve a **"Vista de Cartera"** para mostrar los números grandes (Dinero en riesgo).
4.  Ve al **"Asistente IA"** y escribe: _"Analiza a Corporativo ABC"_.
    - Si configuraste la API Key, verás a Gemini pensando y respondiendo.
    - Si no, verás la respuesta automática de respaldo.

---

**Conclusión:**
Hemos construido una herramienta que **convierte datos en acciones**. No solo avisa que un cliente está en riesgo, sino que le dice al ejecutivo exactamente qué hacer y cuánto dinero salvará. Eso es valor real.
