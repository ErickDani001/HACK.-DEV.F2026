### 1. La Visión (El "Por Qué")

Queremos construir la herramienta definitiva para que los Key Account Managers (KAMs) de Traxión dejen de ser "bomberos" (apagando fuegos cuando el cliente ya está enojado) y se conviertan en "estrategas" (anticipándose a los problemas).

**La Meta:** Reducir el Churn (pérdida de clientes) mediante detección temprana y acción prescriptiva.

---

### 2. El Problema a Resolver

Actualmente, detectar que un cliente se quiere ir es difícil porque:

- Los datos están dispersos (Excel, correos, llamadas).
- El análisis es reactivo (nos damos cuenta cuando no renuevan).
- No hay claridad sobre qué cliente priorizar (¿Atiendo al que se queja mucho o al que paga más?).

---

### 3. La Solución Propuesta: "Customer Health AI Agent"

No haremos solo un dashboard. Haremos un **Sistema de Inteligencia Híbrida**.

#### A. El Concepto

Una plataforma web minimalista que centraliza la salud del cliente en un solo indicador (Health Score) y usa IA para decirnos qué hacer.

#### B. Arquitectura Híbrida (Nuestra Ventaja Secreta)

Para ganar, proponemos una arquitectura técnica que combina lo mejor de dos mundos:

1.  **Motor de Reglas (Local - JavaScript):**

    - _Función:_ Calcular el riesgo matemático (0-100).
    - _Por qué:_ Las matemáticas no pueden alucinar. Necesitamos precisión exacta para métricas como "Nivel de Servicio" o "Puntualidad".
    - _Ventaja:_ Funciona instantáneamente y sin internet.

2.  **Cerebro Generativo (Nube - Gemini API):**
    - _Función:_ Analizar el contexto y recomendar estrategias.
    - _Por qué:_ Un `if-else` no puede escribir un correo de disculpa ni sugerir una estrategia de negociación compleja. La IA sí.
    - _Ventaja:_ Factor "Wow" en la demo.

---

### 4. Experiencia de Usuario (UX/UI)

- **Estilo:** "Corporate SaaS". Nada de emojis, nada de gradientes gamer. Fondo gris claro, tarjetas blancas, tipografía 'Inter'. Seriedad total.
- **Flujo:**
  1.  **Radar:** El director ve cuánto dinero está en riesgo hoy.
  2.  **Foco:** El KAM entra al detalle de un cliente específico.
  3.  **Acción:** El Chatbot le dice exactamente qué hacer (ej. "Llama al Director de Operaciones antes del viernes").

---

### 5. Plan de Ejecución (Roadmap)

#### Fase 1: Cimientos (Día 1)

- [ ] Definir las fórmulas de riesgo (pesos porcentuales).
- [ ] Crear la estructura HTML/CSS base (Diseño limpio).
- [ ] Simular datos de clientes realistas (JSON).

#### Fase 2: El Cerebro (Día 2)

- [ ] Programar el cálculo de Score en JS.
- [ ] Integrar Chart.js para tendencias visuales.
- [ ] Conectar la API de Gemini para el chat (con un modo "demo" por si falla el internet).

#### Fase 3: Pulido Final (Día 3)

- [ ] Asegurar que la UI se vea increíble (CSS profesional).
- [ ] Preparar el pitch de venta y el documento ejecutivo.

---

### 6. Preguntas para el Equipo

1.  ¿Estamos de acuerdo con el enfoque "Híbrido"? (Es más seguro para la demo).
2.  ¿Les parece bien eliminar los emojis para vernos más "Enterprise"?
3.  ¿Quién se encarga de definir los pesos de las métricas (ej. qué es más grave: una queja o baja puntualidad)?

---
