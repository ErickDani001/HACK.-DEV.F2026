/*
================================================================================
    CUSTOMER HEALTH AGENT - DETECCIÓN TEMPRANA DE CLIENTES EN RIESGO
    Hackatón Bécalos Traxión Tech Challenge 2025 - Eje 2
================================================================================
*/

const CustomerHealthAgent = {
    
    // =========================================================================
    // CONFIGURACIÓN - GROQ API (LLaMA 3.3 70B)
    // Límites gratuitos: 14,400 req/día, 30 req/min, 40,000 tokens/min
    // =========================================================================
    GROQ_API_KEY: "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",
    GROQ_MODEL: "llama-3.3-70b-versatile",
    GROQ_URL: "https://api.groq.com/openai/v1/chat/completions",

    // =========================================================================
    // BASE DE DATOS SIMULADA
    // =========================================================================
    clientes: [
        {
            id: 1,
            nombre: "Corporativo ABC",
            industria: "Manufactura",
            antiguedad: 36, // meses
            valorContrato: 2400000, // MXN anual
            metricas: {
                nivelServicio: 87,
                puntualidad: 82,
                nps: 38,
                quejas: 4,
                tendencia: "negativa"
            },
            historico: [
                { mes: "Jul", nps: 60, puntualidad: 95, nivelServicio: 96, quejas: 0 },
                { mes: "Ago", nps: 58, puntualidad: 94, nivelServicio: 95, quejas: 1 },
                { mes: "Sep", nps: 55, puntualidad: 90, nivelServicio: 92, quejas: 1 },
                { mes: "Oct", nps: 48, puntualidad: 88, nivelServicio: 90, quejas: 2 },
                { mes: "Nov", nps: 42, puntualidad: 85, nivelServicio: 88, quejas: 3 },
                { mes: "Dic", nps: 38, puntualidad: 82, nivelServicio: 87, quejas: 4 }
            ],
            contrato: {
                mesesRestantes: 4,
                renovacionAutomatica: false
            }
        },
        {
            id: 2,
            nombre: "Empresa XYZ Tech",
            industria: "Tecnología",
            antiguedad: 12,
            valorContrato: 1200000,
            metricas: {
                nivelServicio: 98,
                puntualidad: 97,
                nps: 85,
                quejas: 0,
                tendencia: "positiva"
            },
            historico: [
                { mes: "Jul", nps: 70, puntualidad: 90, nivelServicio: 92, quejas: 1 },
                { mes: "Ago", nps: 72, puntualidad: 92, nivelServicio: 93, quejas: 0 },
                { mes: "Sep", nps: 75, puntualidad: 93, nivelServicio: 94, quejas: 0 },
                { mes: "Oct", nps: 78, puntualidad: 95, nivelServicio: 96, quejas: 0 },
                { mes: "Nov", nps: 82, puntualidad: 96, nivelServicio: 97, quejas: 0 },
                { mes: "Dic", nps: 85, puntualidad: 97, nivelServicio: 98, quejas: 0 }
            ],
            contrato: {
                mesesRestantes: 8,
                renovacionAutomatica: true
            }
        },
        {
            id: 3,
            nombre: "Logística DEF Express",
            industria: "Logística",
            antiguedad: 24,
            valorContrato: 5000000,
            metricas: {
                nivelServicio: 91,
                puntualidad: 89,
                nps: 60,
                quejas: 2,
                tendencia: "estable"
            },
            historico: [
                { mes: "Jul", nps: 62, puntualidad: 90, nivelServicio: 92, quejas: 1 },
                { mes: "Ago", nps: 61, puntualidad: 89, nivelServicio: 91, quejas: 2 },
                { mes: "Sep", nps: 60, puntualidad: 89, nivelServicio: 91, quejas: 2 },
                { mes: "Oct", nps: 60, puntualidad: 88, nivelServicio: 90, quejas: 2 },
                { mes: "Nov", nps: 59, puntualidad: 89, nivelServicio: 91, quejas: 2 },
                { mes: "Dic", nps: 60, puntualidad: 89, nivelServicio: 91, quejas: 2 }
            ],
            contrato: {
                mesesRestantes: 1,
                renovacionAutomatica: false
            }
        },
        {
            id: 4,
            nombre: "Industrias GHI",
            industria: "Manufactura",
            antiguedad: 60,
            valorContrato: 8500000,
            metricas: {
                nivelServicio: 75,
                puntualidad: 70,
                nps: 10,
                quejas: 8,
                tendencia: "negativa"
            },
            historico: [
                { mes: "Jul", nps: 40, puntualidad: 85, nivelServicio: 88, quejas: 2 },
                { mes: "Ago", nps: 35, puntualidad: 80, nivelServicio: 85, quejas: 3 },
                { mes: "Sep", nps: 30, puntualidad: 78, nivelServicio: 82, quejas: 4 },
                { mes: "Oct", nps: 25, puntualidad: 75, nivelServicio: 80, quejas: 5 },
                { mes: "Nov", nps: 20, puntualidad: 72, nivelServicio: 78, quejas: 6 },
                { mes: "Dic", nps: 10, puntualidad: 70, nivelServicio: 75, quejas: 8 }
            ],
            contrato: {
                mesesRestantes: 2,
                renovacionAutomatica: false
            }
        },
        {
            id: 5,
            nombre: "TransMex Solutions",
            industria: "Transporte",
            antiguedad: 6,
            valorContrato: 800000,
            metricas: {
                nivelServicio: 94,
                puntualidad: 92,
                nps: 75,
                quejas: 1,
                tendencia: "positiva"
            },
            historico: [
                { mes: "Jul", nps: 70, puntualidad: 90, nivelServicio: 92, quejas: 1 },
                { mes: "Ago", nps: 71, puntualidad: 90, nivelServicio: 92, quejas: 1 },
                { mes: "Sep", nps: 72, puntualidad: 91, nivelServicio: 93, quejas: 1 },
                { mes: "Oct", nps: 73, puntualidad: 91, nivelServicio: 93, quejas: 1 },
                { mes: "Nov", nps: 74, puntualidad: 92, nivelServicio: 94, quejas: 1 },
                { mes: "Dic", nps: 75, puntualidad: 92, nivelServicio: 94, quejas: 1 }
            ],
            contrato: {
                mesesRestantes: 6,
                renovacionAutomatica: true
            }
        }
    ],

    // =========================================================================
    // LÓGICA DE SCORING (CORE LOCAL)
    // =========================================================================
    
    calcularScoreRiesgo: function(metricas) {
        let score = 100;
        const desglose = [];

        // 1. Nivel de Servicio (Peso: 30%)
        if (metricas.nivelServicio >= 95) {
            desglose.push({ metrica: "Nivel de Servicio", valor: `${metricas.nivelServicio}%`, impacto: 0, mensaje: "Excelente", estado: "excelente" });
        } else if (metricas.nivelServicio >= 90) {
            score -= 10;
            desglose.push({ metrica: "Nivel de Servicio", valor: `${metricas.nivelServicio}%`, impacto: -10, mensaje: "Aceptable", estado: "aceptable" });
        } else if (metricas.nivelServicio >= 85) {
            score -= 20;
            desglose.push({ metrica: "Nivel de Servicio", valor: `${metricas.nivelServicio}%`, impacto: -20, mensaje: "Riesgo Moderado", estado: "alerta" });
        } else {
            score -= 35;
            desglose.push({ metrica: "Nivel de Servicio", valor: `${metricas.nivelServicio}%`, impacto: -35, mensaje: "Crítico", estado: "critico" });
        }

        // 2. Puntualidad (Peso: 25%)
        if (metricas.puntualidad >= 95) {
            desglose.push({ metrica: "Puntualidad", valor: `${metricas.puntualidad}%`, impacto: 0, mensaje: "Excelente", estado: "excelente" });
        } else if (metricas.puntualidad >= 90) {
            score -= 10;
            desglose.push({ metrica: "Puntualidad", valor: `${metricas.puntualidad}%`, impacto: -10, mensaje: "Aceptable", estado: "aceptable" });
        } else if (metricas.puntualidad >= 85) {
            score -= 20;
            desglose.push({ metrica: "Puntualidad", valor: `${metricas.puntualidad}%`, impacto: -20, mensaje: "Riesgo Moderado", estado: "alerta" });
        } else {
            score -= 30;
            desglose.push({ metrica: "Puntualidad", valor: `${metricas.puntualidad}%`, impacto: -30, mensaje: "Crítico", estado: "critico" });
        }

        // 3. NPS (Peso: 20%)
        if (metricas.nps >= 70) {
            desglose.push({ metrica: "NPS", valor: metricas.nps, impacto: 0, mensaje: "Promotor", estado: "excelente" });
        } else if (metricas.nps >= 50) {
            score -= 15;
            desglose.push({ metrica: "NPS", valor: metricas.nps, impacto: -15, mensaje: "Neutro", estado: "aceptable" });
        } else if (metricas.nps >= 30) {
            score -= 25;
            desglose.push({ metrica: "NPS", valor: metricas.nps, impacto: -25, mensaje: "Detractor", estado: "alerta" });
        } else {
            score -= 40;
            desglose.push({ metrica: "NPS", valor: metricas.nps, impacto: -40, mensaje: "Detractor Crítico", estado: "critico" });
        }

        // 4. Quejas Abiertas (Peso: 15%)
        if (metricas.quejas === 0) {
            desglose.push({ metrica: "Quejas Abiertas", valor: metricas.quejas, impacto: 0, mensaje: "Sin quejas", estado: "excelente" });
        } else if (metricas.quejas === 1) {
            score -= 5;
            desglose.push({ metrica: "Quejas Abiertas", valor: metricas.quejas, impacto: -5, mensaje: "Atención requerida", estado: "aceptable" });
        } else if (metricas.quejas === 2) {
            score -= 15;
            desglose.push({ metrica: "Quejas Abiertas", valor: metricas.quejas, impacto: -15, mensaje: "Riesgo operativo", estado: "alerta" });
        } else if (metricas.quejas === 3) {
            score -= 25;
            desglose.push({ metrica: "Quejas Abiertas", valor: metricas.quejas, impacto: -25, mensaje: "Riesgo alto", estado: "critico" });
        } else {
            score -= 35;
            desglose.push({ metrica: "Quejas Abiertas", valor: metricas.quejas, impacto: -35, mensaje: "Situación crítica", estado: "critico" });
        }

        // 5. Tendencia (Peso: 10%)
        if (metricas.tendencia === "positiva") {
            score += 10;
            desglose.push({ metrica: "Tendencia", valor: "Positiva", impacto: +10, mensaje: "Mejora continua", estado: "excelente" });
        } else if (metricas.tendencia === "estable") {
            desglose.push({ metrica: "Tendencia", valor: "Estable", impacto: 0, mensaje: "Sin cambios", estado: "aceptable" });
        } else {
            score -= 20;
            desglose.push({ metrica: "Tendencia", valor: "Negativa", impacto: -20, mensaje: "Deterioro", estado: "critico" });
        }

        // Normalizar score entre 0 y 100
        score = Math.max(0, Math.min(100, score));

        return {
            score: score,
            desglose: desglose
        };
    },

    clasificarRiesgo: function(score) {
        if (score >= 80) {
            return {
                nivel: "BAJO",
                emoji: "",
                color: "low",
                descripcion: "Cliente saludable. Mantener monitoreo regular.",
                prioridad: 4
            };
        } else if (score >= 50) {
            return {
                nivel: "MEDIO",
                emoji: "",
                color: "medium",
                descripcion: "Requiere atención. Agendar seguimiento preventivo.",
                prioridad: 3
            };
        } else if (score >= 20) {
            return {
                nivel: "ALTO",
                emoji: "",
                color: "high",
                descripcion: "Riesgo elevado. Acción correctiva inmediata.",
                prioridad: 2
            };
        } else {
            return {
                nivel: "CRÍTICO",
                emoji: "",
                color: "critical",
                descripcion: "URGENTE. Alto riesgo de pérdida de cuenta.",
                prioridad: 1
            };
        }
    },

    generarRecomendaciones: function(cliente, analisis) {
        const acciones = [];
        const metricas = cliente.metricas;
        const clasificacion = analisis.clasificacion;

        // Acciones Urgentes (Próximas 48 horas)
        if (metricas.quejas >= 3) {
            acciones.push({
                prioridad: "URGENTE",
                icono: "",
                accion: "Llamada ejecutiva al cliente",
                razon: `${metricas.quejas} quejas abiertas sin resolver`,
                plazo: "48 horas",
                responsable: "Director de Operaciones"
            });
        }
        
        if (metricas.nps < 30) {
            acciones.push({
                prioridad: "URGENTE",
                icono: "",
                accion: "Revisión de cuenta (Business Review)",
                razon: "NPS en nivel crítico (Detractor)",
                plazo: "72 horas",
                responsable: "Gerente de Cuenta"
            });
        }

        if (cliente.contrato.mesesRestantes <= 3 && analisis.score < 60) {
            acciones.push({
                prioridad: "URGENTE",
                icono: "",
                accion: "Presentar plan de mejora para renovación",
                razon: "Vencimiento próximo con bajo desempeño",
                plazo: "1 semana",
                responsable: "Director Comercial"
            });
        }

        // Acciones Esta Semana
        if (metricas.quejas > 0 && metricas.quejas < 3) {
            acciones.push({
                prioridad: "ESTA SEMANA",
                icono: "",
                accion: `Resolver ${metricas.quejas} quejas pendientes`,
                razon: "Evitar escalamiento de incidencias",
                plazo: "5 días",
                responsable: "Servicio al Cliente"
            });
        }

        if (metricas.puntualidad < 90) {
            acciones.push({
                prioridad: "ESTA SEMANA",
                icono: "",
                accion: "Análisis causa-raíz de retrasos",
                razon: "Puntualidad por debajo del objetivo",
                plazo: "5 días",
                responsable: "Jefe de Tráfico"
            });
        }

        // Acciones Próximo Mes
        if (metricas.tendencia === "negativa") {
            acciones.push({
                prioridad: "PRÓXIMO MES",
                icono: "",
                accion: "Implementar monitoreo semanal",
                razon: "Tendencia negativa sostenida",
                plazo: "30 días",
                responsable: "Account Manager"
            });
        }

        if (metricas.nivelServicio < 95 && metricas.nivelServicio >= 90) {
            acciones.push({
                prioridad: "PRÓXIMO MES",
                icono: "",
                accion: "Plan de optimización operativa",
                razon: "Mejorar nivel de servicio a excelencia",
                plazo: "30 días",
                responsable: "Operaciones"
            });
        }

        // Acciones de Mantenimiento (Si todo está bien)
        if (clasificacion.nivel === "BAJO") {
            acciones.push({
                prioridad: "MANTENIMIENTO",
                icono: "",
                accion: "Revisión trimestral estándar",
                razon: "Cliente estable",
                plazo: "Trimestral",
                responsable: "Account Manager"
            });
        }

        // Ordenar por prioridad
        const ordenPrioridad = { "URGENTE": 1, "ESTA SEMANA": 2, "PRÓXIMO MES": 3, "MANTENIMIENTO": 4 };
        acciones.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);

        return acciones;
    },

    calcularImpactoFinanciero: function(cliente, analisis) {
        const valorAnual = cliente.valorContrato;
        
        // Probabilidad de pérdida basada en score
        let probabilidadPerdida;
        if (analisis.score >= 80) probabilidadPerdida = 0.05; // 5%
        else if (analisis.score >= 50) probabilidadPerdida = 0.25; // 25%
        else if (analisis.score >= 20) probabilidadPerdida = 0.60; // 60%
        else probabilidadPerdida = 0.85; // 85%

        const perdidaEsperada = valorAnual * probabilidadPerdida;
        
        // Costo estimado de intervención
        let costoIntervencion;
        if (analisis.clasificacion.nivel === "CRÍTICO") costoIntervencion = valorAnual * 0.05; // 5%
        else if (analisis.clasificacion.nivel === "ALTO") costoIntervencion = valorAnual * 0.03; // 3%
        else if (analisis.clasificacion.nivel === "MEDIO") costoIntervencion = valorAnual * 0.01; // 1%
        else costoIntervencion = valorAnual * 0.005; // 0.5%

        const roiIntervencion = (perdidaEsperada - costoIntervencion) / costoIntervencion;

        return {
            valorAnualContrato: valorAnual,
            probabilidadPerdida: probabilidadPerdida,
            perdidaEsperada: perdidaEsperada,
            costoIntervencion: costoIntervencion,
            roiIntervencion: roiIntervencion
        };
    },

    analizarCliente: function(cliente) {
        // 1. Calcular score
        const resultadoScore = this.calcularScoreRiesgo(cliente.metricas);
        
        // 2. Clasificar riesgo
        const clasificacion = this.clasificarRiesgo(resultadoScore.score);
        
        const analisis = {
            score: resultadoScore.score,
            desglose: resultadoScore.desglose,
            clasificacion: clasificacion
        };

        // 3. Generar recomendaciones
        const recomendaciones = this.generarRecomendaciones(cliente, analisis);
        
        // 4. Calcular impacto financiero
        const impactoFinanciero = this.calcularImpactoFinanciero(cliente, analisis);
        
        return {
            cliente: cliente,
            analisis: analisis,
            recomendaciones: recomendaciones,
            impactoFinanciero: impactoFinanciero
        };
    },

    analizarCartera: function(clientes) {
        const resultados = clientes.map(c => this.analizarCliente(c));
        
        // Ordenar por prioridad (menor score = mayor prioridad)
        resultados.sort((a, b) => a.analisis.score - b.analisis.score);
        
        const distribucion = {
            bajo: resultados.filter(r => r.analisis.clasificacion.nivel === "BAJO").length,
            medio: resultados.filter(r => r.analisis.clasificacion.nivel === "MEDIO").length,
            alto: resultados.filter(r => r.analisis.clasificacion.nivel === "ALTO").length,
            critico: resultados.filter(r => r.analisis.clasificacion.nivel === "CRÍTICO").length
        };

        const valorTotal = clientes.reduce((sum, c) => sum + c.valorContrato, 0);
        const valorRiesgo = resultados.reduce((sum, r) => sum + r.impactoFinanciero.perdidaEsperada, 0);
        const alertasUrgentes = resultados.filter(r => r.analisis.clasificacion.nivel === "ALTO" || r.analisis.clasificacion.nivel === "CRÍTICO").length;

        return {
            clientesPorPrioridad: resultados,
            distribucion: distribucion,
            valorTotalCartera: valorTotal,
            valorEnRiesgo: valorRiesgo,
            alertasUrgentes: alertasUrgentes
        };
    },

    // =========================================================================
    // CHATBOT HÍBRIDO (OPENROUTER + FALLBACK)
    // =========================================================================
    
    // WIDGET FLOTANTE - Usa Groq (misma API que chatbot)
    consultarGemini: async function(mensaje, contexto) {
        if (!this.GROQ_API_KEY) {
            throw new Error("API Key de Groq no configurada");
        }

        const systemPrompt = `# AGENTE DE DETECCIÓN TEMPRANA DE CLIENTES EN RIESGO
## Hackatón Bécalos Traxión Tech Challenge 2025 - Eje 2

Eres un agente de IA especializado en **Detección Temprana de Clientes en Riesgo** para Traxión, empresa líder en logística y transporte en México.

---

# TU MISIÓN PRINCIPAL
Transformar la gestión de clientes de REACTIVA a PREVENTIVA mediante:
1. Análisis integral de múltiples métricas en una sola lectura
2. Detección temprana de tendencias negativas ANTES de que escalen
3. Clasificación precisa del nivel de riesgo
4. Generación de acciones concretas de prevención
5. Priorización de clientes para atención proactiva

---

# FRAMEWORK DE ANÁLISIS DE MÉTRICAS

## 1. NIVEL DE SERVICIO (Peso: 30% del score)
| Rango | Estado | Señal | Interpretación |
|-------|--------|-------|----------------|
| 95-100% | SALUDABLE | Verde | Operación óptima, cliente satisfecho |
| 90-94% | ATENCIÓN | Amarillo | Degradación leve, monitorear semanalmente |
| 85-89% | ALERTA | Naranja | Problemas recurrentes, cliente notando fallas |
| <85% | CRÍTICO | Rojo | Fallas sistémicas, cliente considerando alternativas |

## 2. PUNTUALIDAD EN ENTREGAS (Peso: 25% del score)
| Rango | Estado | Señal | Interpretación |
|-------|--------|-------|----------------|
| 95-100% | SALUDABLE | Verde | Entregas consistentemente a tiempo |
| 90-94% | ATENCIÓN | Amarillo | Retrasos ocasionales, cliente tolerante |
| 85-89% | ALERTA | Naranja | Patrón de retrasos, afectando operación del cliente |
| <85% | CRÍTICO | Rojo | Retrasos frecuentes, cliente perdiendo confianza |

## 3. NPS - NET PROMOTER SCORE (Peso: 25% del score)
| Rango | Clasificación | Señal | Interpretación |
|-------|--------------|-------|----------------|
| 70-100 | PROMOTOR | Verde | Cliente leal, recomienda activamente |
| 50-69 | NEUTRO | Amarillo | Satisfecho pero vulnerable a competencia |
| 30-49 | DETRACTOR | Naranja | Insatisfecho, puede hablar mal de nosotros |
| 0-29 | DETRACTOR CRÍTICO | Rojo | Alto riesgo de churn, buscando alternativas |
| <0 | EMERGENCIA | Negro | Cancelación inminente |

## 4. QUEJAS ABIERTAS (Peso: 10% del score)
| Cantidad | Estado | Señal | Interpretación |
|----------|--------|-------|----------------|
| 0 | SALUDABLE | Verde | Sin incidencias pendientes |
| 1 | ATENCIÓN | Amarillo | Atender antes de 48 horas |
| 2 | ALERTA | Naranja | Patrón de problemas, revisar causa raíz |
| 3-4 | CRÍTICO | Rojo | Cliente acumulando frustración |
| 5+ | EMERGENCIA | Negro | Escalación ejecutiva inmediata |

## 5. TENDENCIA HISTÓRICA (Peso: 10% del score)
| Tendencia | Estado | Señal | Interpretación |
|-----------|--------|-------|----------------|
| Positiva | MEJORANDO | Verde | Reforzar acciones actuales |
| Estable | MANTENIENDO | Amarillo | Buscar oportunidades de mejora |
| Negativa | DETERIORANDO | Rojo | ALERTA TEMPRANA: Intervenir antes de crisis |

---

# DETECCIÓN DE TENDENCIAS NEGATIVAS 

Analiza el histórico del cliente para detectar:

1. **Caída sostenida de NPS**: Si baja >5 puntos en 2 meses consecutivos = ALERTA
2. **Deterioro de puntualidad**: Si baja >3% en 2 meses = ALERTA
3. **Acumulación de quejas**: Si aumenta >1 queja/mes = ALERTA
4. **Patrón de degradación**: Si 2+ métricas empeoran simultáneamente = CRÍTICO
5. **Proximidad a renovación con métricas bajas**: <6 meses + score <60 = URGENTE

---

# CLASIFICACIÓN DE NIVEL DE RIESGO

Calcula el SCORE DE SALUD (0-100) y clasifica:

| Score | Nivel | Prioridad | Acción Requerida |
|-------|-------|-----------|------------------|
| 80-100 | BAJO | 4 | Mantenimiento trimestral |
| 50-79 | MEDIO | 3 | Seguimiento mensual preventivo |
| 20-49 | ALTO | 2 | Intervención semanal correctiva |
| 0-19 | CRÍTICO | 1 | Escalación ejecutiva en 24h |

---

# PROTOCOLO DE ACCIONES INMEDIATAS

## Si el riesgo es CRÍTICO (Score 0-19):
- Llamada del Director Comercial al cliente en las próximas 4 HORAS
- Agendar reunión presencial de emergencia en 24-48 horas
- Preparar propuesta de recuperación con descuentos/mejoras
- Notificar a Dirección General sobre cuenta en riesgo

## Si el riesgo es ALTO (Score 20-49):
- Llamada del Account Manager en las próximas 24 HORAS
- Revisar todas las quejas abiertas y resolver en 48 horas
- Agendar Business Review en la próxima semana
- Implementar monitoreo diario de métricas

## Si el riesgo es MEDIO (Score 50-79):
- Contacto proactivo del Account Manager esta semana
- Revisar causa raíz de métricas debajo del objetivo
- Proponer plan de mejora en los próximos 15 días

## Si el riesgo es BAJO (Score 80-100):
- Mantener contacto trimestral de rutina
- Buscar oportunidades de upselling
- Solicitar referidos/testimoniales

---

# FORMATO DE RESPUESTA OBLIGATORIO

## PRIMERO: LA ACCIÓN INMEDIATA (LO MÁS IMPORTANTE)

**ACCIÓN INMEDIATA - HACER AHORA**
[Esta es LA PRIMERA Y MÁS URGENTE acción que debe ejecutarse]

Qué hacer: [Descripción concreta en 1 línea]
Quién: [Nombre del rol responsable]
Cuándo: [HOY / En 4 horas / En 24 horas / Esta semana]
Cómo: [Llamada / Visita / Email / Reunión presencial]
Qué decir: [Script o mensaje clave para el cliente]

---

## DESPUÉS: EL DIAGNÓSTICO COMPLETO

**CLASIFICACIÓN DE RIESGO**
Nivel: [BAJO/MEDIO/ALTO/CRÍTICO]
Score de Salud: [X]/100
Probabilidad de Churn: [X]%

---

**LECTURA INTEGRAL DE MÉTRICAS**
(Análisis de todas las métricas en una sola vista)

| Métrica | Valor Actual | Estado | Tendencia |
|---------|-------------|--------|-----------|
| Nivel de Servicio | [X]% | [Estado] | [↑/→/↓] |
| Puntualidad | [X]% | [Estado] | [↑/→/↓] |
| NPS | [X] | [Estado] | [↑/→/↓] |
| Quejas | [X] | [Estado] | [↑/→/↓] |
| Renovación | [X] meses | [Estado] | - |

---

**TENDENCIAS NEGATIVAS DETECTADAS**
(Si hay deterioro en el histórico, descríbelo aquí)

1. [Tendencia negativa 1 con datos específicos]
2. [Tendencia negativa 2 si existe]
3. [Tendencia negativa 3 si existe]

---

**PLAN DE ACCIONES (3 niveles de urgencia)**

**URGENTE (Próximas 24-48 horas):**
1. [Acción] - [Responsable] - [Canal]

**ESTA SEMANA (Próximos 7 días):**
1. [Acción] - [Responsable] - [Canal]

**PRÓXIMO MES (Próximos 30 días):**
1. [Acción] - [Responsable] - [Canal]

---

**SCRIPT SUGERIDO PARA LLAMAR AL CLIENTE**
(Qué decir exactamente cuando contactes al cliente)

"[Guión de 2-3 oraciones para iniciar la conversación con el cliente]"

---

**IMPACTO SI NO ACTUAMOS**
- Valor del contrato en riesgo: $[X] MXN
- Pérdida esperada: $[X] MXN
- Tiempo estimado para churn: [X] meses

---

# REGLAS ESTRICTAS

1. SIEMPRE empieza con la ACCIÓN INMEDIATA (lo más urgente primero)
2. SIEMPRE responde en español profesional y ejecutivo
3. NUNCA uses emojis
4. SIEMPRE analiza TODAS las métricas disponibles
5. SIEMPRE detecta tendencias comparando datos históricos
6. SIEMPRE clasifica el riesgo con el semáforo correcto
7. SIEMPRE incluye un SCRIPT para llamar al cliente
8. SIEMPRE da plazos ESPECÍFICOS (HOY, 24h, 48h, 1 semana)
9. USA negritas (**texto**) para secciones y datos críticos
10. SÉ ESPECÍFICO: nombres de roles, plazos exactos, KPIs medibles

---

# FILOSOFÍA DEL EJE 2

> "Transformar la gestión de clientes de REACTIVA a PREVENTIVA"
> "Detectar problemas ANTES de que el cliente nos llame a quejarse"
> "Cada número cuenta una historia, tu trabajo es leerla a tiempo"
> "LA ACCIÓN INMEDIATA ES LO QUE SALVA LA CUENTA"

Tu objetivo es que el equipo pueda:
- Reducir el churn reactivo
- Mejorar el NPS general
- Priorizar mejor las visitas y llamadas
- Adoptar una cultura preventiva en la gestión de clientes`;

        const userMessage = typeof mensaje === 'string' ? mensaje : `
# SOLICITUD DE ANÁLISIS DE DETECCIÓN TEMPRANA

## DATOS DEL CLIENTE PARA ANÁLISIS:

${JSON.stringify(contexto, null, 2)}

---

## INSTRUCCIONES:
1. Realiza una LECTURA INTEGRAL de todas las métricas
2. DETECTA cualquier tendencia negativa en el histórico
3. CLASIFICA el nivel de riesgo correctamente
4. GENERA acciones PREVENTIVAS concretas (no reactivas)
5. PRIORIZA al cliente para atención proactiva
6. CALCULA el impacto financiero si no actuamos

Responde siguiendo EXACTAMENTE el formato establecido.
`;

        try {
            const response = await fetch(this.GROQ_URL, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: this.GROQ_MODEL,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: 2000,
                    temperature: 0.2
                })
            });

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message || JSON.stringify(data.error));
            }

            if (!data.choices || !data.choices[0]) {
                throw new Error("Sin respuesta del servidor");
            }

            return data.choices[0].message.content;

        } catch (error) {
            console.error("Error Groq:", error);
            throw error;
        }
    },

    procesarMensaje: async function(mensaje) {
        const msg = mensaje.toLowerCase();
        
        // Construir contexto para el prompt
        let contextoStr = "";
        const clienteEncontrado = this.clientes.find(c => msg.includes(c.nombre.toLowerCase()));
        
        if (clienteEncontrado) {
            const analisis = this.analizarCliente(clienteEncontrado);
            contextoStr = `
CLIENTE ESPECÍFICO:
${JSON.stringify(analisis, null, 2)}
`;
        } else {
            // Cartera general
            const cartera = this.analizarCartera(this.clientes);
            contextoStr = `
RESUMEN DE CARTERA:
- Total Clientes: ${this.clientes.length}
- En Riesgo Alto/Crítico: ${cartera.alertasUrgentes}
- Valor Total: $${(cartera.valorTotalCartera / 1000000).toFixed(1)}M
- Valor en Riesgo: $${(cartera.valorEnRiesgo / 1000000).toFixed(1)}M

CLIENTES:
${this.clientes.map(c => `- ${c.nombre}: NPS ${c.metricas.nps}, Puntualidad ${c.metricas.puntualidad}%`).join('\n')}
`;
        }

        // Usar Groq API - Agente IA Conversacional
        if (this.GROQ_API_KEY && this.GROQ_API_KEY !== "") {
            const systemPrompt = `# ASISTENTE DE CUSTOMER SUCCESS - TRAXIÓN
Eres un asistente conversacional experto en retención de clientes para Traxión, empresa líder en logística y transporte en México.

## TU PERSONALIDAD
- Eres un colega experto, amigable pero profesional
- Respondes de forma directa y clara
- Siempre priorizas lo más urgente
- Das respuestas cortas pero útiles (máximo 80-100 palabras)
- Hablas en español natural, como un ejecutivo de cuenta experimentado

## LO QUE SABES HACER
1. **Priorizar**: Identificar qué clientes necesitan atención AHORA
2. **Resumir**: Dar el estado de la cartera en segundos
3. **Comparar**: Analizar diferencias entre clientes
4. **Recomendar**: Sugerir la siguiente acción más importante
5. **Explicar**: Aclarar métricas, KPIs y conceptos
6. **Alertar**: Identificar señales de riesgo que otros no ven

## CÓMO RESPONDES

**Para preguntas de priorización** ("¿a quién llamo?", "¿qué hago primero?"):
→ Lista máximo 3 clientes ordenados por urgencia
→ Incluye el PORQUÉ de cada uno
→ Termina con: "Empieza con [nombre], es el más urgente porque [razón]."

**Para preguntas de resumen** ("¿cómo está la cartera?", "dame un resumen"):
→ 3-4 datos clave máximo
→ Destaca lo preocupante  primero
→ Termina con la acción más importante del día

**Para preguntas sobre un cliente específico** ("cuéntame de X", "¿cómo está X?"):
→ Estado en una oración
→ El problema principal
→ Qué hacer y cuándo

**Para comparaciones** ("compara X con Y", "¿cuál está peor?"):
→ Tabla mental rápida de diferencias
→ Cuál es más urgente y por qué
→ Recomendación clara

**Para dudas conceptuales** ("¿qué es NPS?", "¿cómo se calcula el riesgo?"):
→ Explicación simple en 2 oraciones
→ Ejemplo práctico con datos reales de la cartera

## REGLAS DE ORO

1. **NUNCA** des respuestas largas - el usuario tiene prisa
2. **SIEMPRE** termina con una acción concreta cuando sea relevante
3. **NUNCA** uses emojis
4. **SIEMPRE** cita números específicos de los datos
5. **NUNCA** repitas el formato largo del análisis individual (eso ya lo hace el widget)
6. **SIEMPRE** sé directo - ve al grano en la primera oración

## MÉTRICAS CLAVE (para tu referencia)
- NPS < 30 = Cliente detractor, alto riesgo de perderlo
- NPS ≥ 70 = Cliente promotor, está contento
- Puntualidad < 85% = Problemas operativos serios
- Quejas ≥ 3 = Situación crítica
- Renovación < 3 meses = Urgente actuar

## DATOS DE LA CARTERA ACTUAL
${contextoStr}

## EJEMPLOS DE CÓMO RESPONDER

Usuario: "¿A quién debo llamar primero?"
Tú: "Llama a **Industrias GHI** primero. Tiene NPS de 10, 8 quejas abiertas y su contrato vence en 2 meses. Es la cuenta más crítica con $8.5M en riesgo. Después atiende a Corporativo ABC (NPS 38, tendencia negativa)."

Usuario: "¿Cómo está la cartera?"
Tú: "Tienes 2 clientes en riesgo alto que suman $10.9M en peligro. Industrias GHI es crítico y Corporativo ABC está deteriorándose. El resto está estable. **Prioridad del día**: llamar a Industrias GHI antes de las 5pm."

Usuario: "¿Qué es el score de salud?"
Tú: "Es un número de 0 a 100 que combina todas las métricas del cliente. Arriba de 80 está saludable, debajo de 50 requiere atención urgente. Por ejemplo, Industrias GHI tiene score 0 - es crítico."`;

            const userPrompt = `${mensaje}`;

            try {
                const response = await fetch(this.GROQ_URL, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.GROQ_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: this.GROQ_MODEL,
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: userPrompt }
                        ],
                        temperature: 0.4,
                        max_tokens: 400
                    })
                });

                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error.message);
                }
                
                if (!data.choices?.[0]?.message?.content) {
                    throw new Error("Sin respuesta del servidor");
                }
                
                return { tipo: "ia", mensaje: data.choices[0].message.content };

            } catch (e) {
                console.error("Error:", e);
                return { 
                    tipo: "error", 
                    mensaje: `Error de conexión: ${e.message}` 
                };
            }
        }

        return { 
            tipo: "error", 
            mensaje: "API no configurada. Revise la configuración del sistema." 
        };
    }
};

// Exponer al scope global
window.CustomerHealthAgent = CustomerHealthAgent;
