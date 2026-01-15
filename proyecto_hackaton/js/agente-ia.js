/*
================================================================================
    CUSTOMER HEALTH AGENT - LÓGICA HÍBRIDA
    Hackatón Bécalos Traxión Tech Challenge 2025
================================================================================
*/

const CustomerHealthAgent = {
    
    // =========================================================================
    // CONFIGURACIÓN - OPENROUTER (PARA WIDGET FLOTANTE)
    // =========================================================================
    OPENROUTER_API_KEY: "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",
    OPENROUTER_URL: "https://openrouter.ai/api/v1/chat/completions",
    AI_MODEL: "meta-llama/llama-3.3-70b-instruct:free",

    // =========================================================================
    // CONFIGURACIÓN - GROQ (PARA PESTAÑA ASISTENTE IA)
    // =========================================================================
    // Groq: API súper rápida, límites generosos (30 req/min, 15,000 tokens/min)
    GROQ_API_KEY: "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",
    GROQ_MODEL: "llama-3.3-70b-versatile",  // Modelo potente y rápido
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
    
    consultarGemini: async function(mensaje, contexto) {
        // Ahora usa OpenRouter en lugar de Gemini
        if (!this.OPENROUTER_API_KEY) {
            throw new Error("API Key de OpenRouter no configurada");
        }

        const systemPrompt = `Eres el Analista de Customer Success de Traxión, empresa de logística en México.

OBJETIVO: Retener clientes identificando riesgos y proponiendo acciones concretas.

REGLAS:
1. Responde en español profesional
2. NO uses emojis
3. Usa negritas (**texto**) solo para datos críticos
4. Máximo 3 acciones por respuesta
5. Cada acción: Responsable + Plazo

FORMATO:
**Diagnóstico**: [Situación en 2 líneas]
**Riesgo Principal**: [El problema más urgente]
**Plan de Acción**:
1. [Acción] - [Responsable] - [Plazo]
2. [Acción] - [Responsable] - [Plazo]
3. [Acción] - [Responsable] - [Plazo]

Si falta información, indica qué datos necesitas.`;

        const userMessage = typeof mensaje === 'string' ? mensaje : `
ANALIZA ESTE CLIENTE:
${JSON.stringify(contexto, null, 2)}

Proporciona diagnóstico y plan de acción.
`;

        try {
            const response = await fetch(this.OPENROUTER_URL, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": window.location.href,
                    "X-Title": "Customer Health Dashboard - Traxión"
                },
                body: JSON.stringify({
                    model: this.AI_MODEL,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message || JSON.stringify(data.error));
            }

            if (!data.choices || !data.choices[0]) {
                throw new Error("Respuesta vacía de OpenRouter");
            }

            return data.choices[0].message.content;

        } catch (error) {
            console.error("Error OpenRouter:", error);
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

        // Usar Groq API - Agente IA Profesional
        if (this.GROQ_API_KEY && this.GROQ_API_KEY !== "") {
            const systemPrompt = `Eres el Asistente de Customer Success de Traxión, empresa líder en logística y transporte en México.

OBJETIVO PRINCIPAL:
Ayudar al equipo a retener clientes proporcionando análisis precisos y recomendaciones accionables.

REGLAS ESTRICTAS:
1. Responde SIEMPRE en español profesional
2. NO uses emojis bajo ninguna circunstancia
3. Respuestas concisas: máximo 150 palabras
4. Usa negritas (**texto**) solo para datos críticos
5. Siempre incluye datos numéricos cuando estén disponibles
6. Si falta información, indica qué necesitas saber

FORMATO DE RESPUESTA:
- Para análisis de cliente: Diagnóstico -> Riesgo -> Acciones
- Para cartera: Resumen -> Alertas -> Prioridades
- Para recomendaciones: Contexto -> Acción -> Responsable -> Plazo

DATOS DISPONIBLES:
${contextoStr}

MÉTRICAS CLAVE A CONSIDERAR:
- NPS < 30: Cliente detractor (riesgo alto)
- Puntualidad < 85%: Problema operativo crítico
- Quejas >= 3: Requiere atención inmediata
- Renovación < 3 meses: Urgente negociación`;

            const userPrompt = `CONSULTA: ${mensaje}

Responde de forma directa y profesional, siguiendo las reglas establecidas.`;

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
                        temperature: 0.5,
                        max_tokens: 600
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
