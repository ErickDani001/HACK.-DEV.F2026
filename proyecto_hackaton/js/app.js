/*
================================================================================
    APP.JS - LÓGICA DE INTERFAZ CORPORATIVA
    Hackatón Bécalos Traxión Tech Challenge 2025
================================================================================
*/

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Customer Health Dashboard iniciado');
    
    // Inicializar componentes
    initDate();
    initTabs();
    initClientSelector();
    initForm();
    initChat();
    initRadarView();
    
    // Cargar Vista de Cartera (es la pestaña principal ahora)
    updateRadarView();
});

// ============================================================================
// FECHA ACTUAL
// ============================================================================

function initDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // Capitalizar primera letra
        const fecha = new Date().toLocaleDateString('es-MX', options);
        dateElement.textContent = fecha.charAt(0).toUpperCase() + fecha.slice(1);
    }
}

// ============================================================================
// SISTEMA DE TABS
// ============================================================================

function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;
            
            // Remover active de todos
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Activar el seleccionado
            tab.classList.add('active');
            document.getElementById(`tab-${targetId}`).classList.add('active');
            
            // Si es radar, actualizar
            if (targetId === 'radar') {
                updateRadarView();
            }
        });
    });
}

// ============================================================================
// SELECTOR DE CLIENTES
// ============================================================================

function initClientSelector() {
    const select = document.getElementById('selectCliente');
    if (!select || !window.CustomerHealthAgent) return;
    
    const clientes = window.CustomerHealthAgent.clientes;
    
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nombre}`;
        select.appendChild(option);
    });
    
    // Evento de cambio
    select.addEventListener('change', (e) => {
        if (!e.target.value) return;
        
        const clienteId = parseInt(e.target.value);
        const cliente = clientes.find(c => c.id === clienteId);
        
        if (cliente) {
            // Llenar formulario con datos del cliente
            document.getElementById('nombreCliente').value = cliente.nombre;
            document.getElementById('nivelServicio').value = cliente.metricas.nivelServicio;
            document.getElementById('puntualidad').value = cliente.metricas.puntualidad;
            document.getElementById('nps').value = cliente.metricas.nps;
            document.getElementById('quejas').value = cliente.metricas.quejas;
            document.getElementById('tendencia').value = cliente.metricas.tendencia;
            document.getElementById('valorContrato').value = cliente.valorContrato;
            document.getElementById('mesesContrato').value = cliente.contrato.mesesRestantes;
        }
    });
}

// ============================================================================
// FORMULARIO DE EVALUACIÓN
// ============================================================================

function initForm() {
    const form = document.getElementById('formEvaluar');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        evaluarCliente();
    });
    
    // MONITOREO EN TIEMPO REAL
    initRealTimeMonitoring();
}

// ============================================================================
// ALERTAS EN TIEMPO REAL
// ============================================================================

function initRealTimeMonitoring() {
    const camposMonitoreados = [
        { id: 'nivelServicio', nombre: 'Nivel de Servicio', umbralCritico: 85, umbralAlerta: 90, unidad: '%' },
        { id: 'puntualidad', nombre: 'Puntualidad', umbralCritico: 85, umbralAlerta: 90, unidad: '%' },
        { id: 'nps', nombre: 'NPS', umbralCritico: 30, umbralAlerta: 50, unidad: '' },
        { id: 'quejas', nombre: 'Quejas Abiertas', umbralCritico: 3, umbralAlerta: 2, unidad: '', esInverso: true },
        { id: 'mesesContrato', nombre: 'Renovación', umbralCritico: 3, umbralAlerta: 6, unidad: ' meses', esInverso: false }
    ];
    
    camposMonitoreados.forEach(campo => {
        const input = document.getElementById(campo.id);
        if (!input) return;
        
        // Evento al cambiar el valor
        input.addEventListener('input', () => {
            evaluarCampoEnTiempoReal(campo, parseFloat(input.value));
        });
        
        // También al perder el foco
        input.addEventListener('change', () => {
            evaluarCampoEnTiempoReal(campo, parseFloat(input.value));
        });
    });
    
    // Monitorear tendencia
    const tendencia = document.getElementById('tendencia');
    if (tendencia) {
        tendencia.addEventListener('change', () => {
            if (tendencia.value === 'negativa') {
                mostrarAlertaTiempoReal('Alerta de Tendencia', 'La tendencia negativa indica deterioro continuo. Se recomienda acción preventiva.', 'warning');
            }
        });
    }
}

function evaluarCampoEnTiempoReal(campo, valor) {
    if (isNaN(valor)) return;
    
    const alertBox = document.getElementById('realTimeAlert');
    const alertTitle = document.getElementById('alertTitle');
    const alertMessage = document.getElementById('alertMessage');
    
    let nivel = 'ok';
    let mensaje = '';
    
    if (campo.esInverso) {
        // Para quejas: mayor valor es peor
        if (valor >= campo.umbralCritico) {
            nivel = 'critical';
            mensaje = `${campo.nombre} en nivel CRÍTICO (${valor}${campo.unidad}). Requiere atención inmediata.`;
        } else if (valor >= campo.umbralAlerta) {
            nivel = 'warning';
            mensaje = `${campo.nombre} elevado (${valor}${campo.unidad}). Monitorear de cerca.`;
        }
    } else {
        // Para métricas normales: menor valor es peor
        if (valor < campo.umbralCritico) {
            nivel = 'critical';
            mensaje = `${campo.nombre} por debajo del umbral crítico (${valor}${campo.unidad} < ${campo.umbralCritico}${campo.unidad}). Acción urgente requerida.`;
        } else if (valor < campo.umbralAlerta) {
            nivel = 'warning';
            mensaje = `${campo.nombre} en zona de alerta (${valor}${campo.unidad} < ${campo.umbralAlerta}${campo.unidad}). Requiere atención.`;
        }
    }
    
    if (nivel !== 'ok') {
        mostrarAlertaTiempoReal(campo.nombre, mensaje, nivel);
    }
}

function mostrarAlertaTiempoReal(titulo, mensaje, nivel) {
    const alertBox = document.getElementById('realTimeAlert');
    const alertTitle = document.getElementById('alertTitle');
    const alertMessage = document.getElementById('alertMessage');
    
    alertTitle.textContent = titulo;
    alertMessage.textContent = mensaje;
    
    // Remover clases anteriores y añadir nueva
    alertBox.classList.remove('hidden', 'alert-warning', 'alert-critical');
    alertBox.classList.add(nivel === 'critical' ? 'alert-critical' : 'alert-warning');
    
    // Animación de aparición
    alertBox.style.animation = 'none';
    alertBox.offsetHeight; // Trigger reflow
    alertBox.style.animation = 'slideIn 0.3s ease';
    
    // Ocultar después de 5 segundos
    clearTimeout(window.alertTimeout);
    window.alertTimeout = setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 5000);
}

function evaluarCliente() {
    // Obtener valores del formulario
    const nombre = document.getElementById('nombreCliente').value || 'Cliente Anónimo';
    const nivelServicio = parseFloat(document.getElementById('nivelServicio').value) || 90;
    const puntualidad = parseFloat(document.getElementById('puntualidad').value) || 90;
    const nps = parseFloat(document.getElementById('nps').value) || 50;
    const quejas = parseInt(document.getElementById('quejas').value) || 0;
    const tendencia = document.getElementById('tendencia').value || 'estable';
    const valorContrato = parseFloat(document.getElementById('valorContrato').value) || 1000000;
    const mesesContrato = parseInt(document.getElementById('mesesContrato').value) || 12;
    
    // Buscar cliente en datos simulados para histórico
    const clienteSimulado = window.CustomerHealthAgent.clientes.find(
        c => c.nombre.toLowerCase() === nombre.toLowerCase()
    );
    
    // Crear objeto de cliente para análisis
    const cliente = {
        id: clienteSimulado?.id || 0,
        nombre: nombre,
        industria: clienteSimulado?.industria || 'General',
        antiguedad: clienteSimulado?.antiguedad || 12,
        valorContrato: valorContrato,
        metricas: {
            nivelServicio,
            puntualidad,
            nps,
            quejas,
            tendencia
        },
        historico: clienteSimulado?.historico || generarHistoricoSimulado(nivelServicio, puntualidad, nps, quejas),
        contrato: {
            mesesRestantes: mesesContrato,
            renovacionAutomatica: mesesContrato > 6
        }
    };
    
    // Analizar cliente
    const resultado = window.CustomerHealthAgent.analizarCliente(cliente);
    
    // Mostrar resultados
    mostrarResultados(resultado);
}

function generarHistoricoSimulado(ns, punt, nps, quejas) {
    // Genera un histórico simulado basado en las métricas actuales
    const meses = ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses.map((mes, i) => ({
        mes,
        nivelServicio: Math.min(100, ns + (5 - i) * 2),
        puntualidad: Math.min(100, punt + (5 - i) * 2),
        nps: Math.min(100, nps + (5 - i) * 4),
        quejas: Math.max(0, quejas - (5 - i))
    }));
}

// ============================================================================
// MOSTRAR RESULTADOS
// ============================================================================

function mostrarResultados(resultado) {
    // Ocultar estado vacío, mostrar contenido
    document.getElementById('resultsEmpty').classList.add('hidden');
    document.getElementById('resultsContent').classList.remove('hidden');
    
    const { analisis, cliente, recomendaciones, impactoFinanciero } = resultado;
    const clasificacion = analisis.clasificacion;
    
    // Actualizar semáforo
    actualizarSemaforo(analisis.score, clasificacion);
    
    // Nombre del cliente
    document.getElementById('resultsClientName').textContent = cliente.nombre;
    
    // Desglose de métricas
    actualizarMetricas(analisis.desglose);
    
    // Gráfica de tendencias
    actualizarGrafica(resultado);
    
    // Acciones recomendadas
    actualizarAcciones(recomendaciones);
    
    // Impacto financiero
    actualizarFinanciero(impactoFinanciero);
    
    // NUEVO: Generar análisis del Agente IA automáticamente
    generarAnalisisIA(resultado);
}

function actualizarSemaforo(score, clasificacion) {
    const circle = document.getElementById('semaphoreCircle');
    const level = document.getElementById('semaphoreLevel');
    const scoreEl = document.getElementById('semaphoreScore');
    
    // Limpiar clases anteriores
    circle.className = 'semaphore-indicator';
    
    // Asignar clase de color (low, medium, high, critical)
    circle.classList.add(clasificacion.color);
    
    level.textContent = clasificacion.nivel;
    scoreEl.textContent = `${score}/100`;
}

function actualizarMetricas(desglose) {
    const container = document.getElementById('metricsList');
    container.innerHTML = '';
    
    desglose.forEach(item => {
        const div = document.createElement('div');
        div.className = 'metric-item';
        
        const impactClass = item.impacto > 0 ? 'impact-pos' : item.impacto < 0 ? 'impact-neg' : 'impact-neu';
        const impactText = item.impacto > 0 ? `+${item.impacto}` : item.impacto;
        
        div.innerHTML = `
            <span class="metric-name">${item.metrica}</span>
            <div class="metric-value">
                <span class="metric-val">${item.valor}</span>
                <span class="impact-tag ${impactClass}">${impactText}</span>
            </div>
        `;
        
        container.appendChild(div);
    });
}

function actualizarGrafica(resultado) {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    // Destruir gráfica anterior si existe
    if (window.trendChartInstance) {
        window.trendChartInstance.destroy();
    }
    
    // Obtener datos del cliente para el histórico
    const clienteSimulado = window.CustomerHealthAgent.clientes.find(
        c => c.nombre === resultado.cliente.nombre
    );
    
    const historico = clienteSimulado?.historico || [];
    const labels = historico.map(h => h.mes);
    
    // Configuración minimalista de Chart.js
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#64748b';
    
    window.trendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'NPS',
                    data: historico.map(h => h.nps),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    pointRadius: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#2563eb'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#0f172a',
                    padding: 10,
                    cornerRadius: 4,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function actualizarAcciones(recomendaciones) {
    const container = document.getElementById('actionsList');
    container.innerHTML = '';
    
    // Mostrar máximo 4 acciones
    const acciones = recomendaciones.slice(0, 4);
    
    acciones.forEach(accion => {
        // Mapear prioridad a clases CSS (urgente, esta-semana -> week, proximo-mes -> month)
        let prioClass = 'prio-month';
        if (accion.prioridad === 'URGENTE') prioClass = 'prio-urgent';
        else if (accion.prioridad === 'ESTA SEMANA') prioClass = 'prio-week';
        
        const div = document.createElement('div');
        div.className = 'action-item';
        
        div.innerHTML = `
            <div class="action-header">
                <span class="action-title">${accion.accion}</span>
                <span class="priority-badge ${prioClass}">${accion.prioridad}</span>
            </div>
            <div class="action-meta">
                Responsable: ${accion.responsable} • Plazo: ${accion.plazo}
            </div>
        `;
        
        container.appendChild(div);
    });
}

function actualizarFinanciero(financiero) {
    const container = document.getElementById('financialGrid');
    container.innerHTML = '';
    
    const items = [
        {
            label: 'Valor Contrato',
            value: `$${(financiero.valorAnualContrato / 1000000).toFixed(1)}M`
        },
        {
            label: 'Prob. Pérdida',
            value: `${(financiero.probabilidadPerdida * 100).toFixed(0)}%`
        },
        {
            label: 'Pérdida Esperada',
            value: `$${(financiero.perdidaEsperada / 1000000).toFixed(2)}M`
        },
        {
            label: 'ROI Acción',
            value: `${(financiero.roiIntervencion * 100).toFixed(0)}%`
        }
    ];
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'fin-item';
        
        div.innerHTML = `
            <div class="fin-label">${item.label}</div>
            <div class="fin-value">${item.value}</div>
        `;
        
        container.appendChild(div);
    });
}

// ============================================================================
// ANÁLISIS AUTOMÁTICO DEL AGENTE IA (GEMINI) - WIDGET FLOTANTE
// ============================================================================

// Toggle del widget flotante
function toggleAgentWidget() {
    const panel = document.getElementById('agentPanel');
    const badge = document.getElementById('agentBadge');
    
    panel.classList.toggle('hidden');
    
    // Ocultar badge cuando se abre
    if (!panel.classList.contains('hidden')) {
        badge.classList.add('hidden');
    }
}

// Mostrar notificación en el badge del widget
function notificarAgentWidget() {
    const badge = document.getElementById('agentBadge');
    const panel = document.getElementById('agentPanel');
    
    // Solo mostrar badge si el panel está cerrado
    if (panel.classList.contains('hidden')) {
        badge.classList.remove('hidden');
    }
}

async function generarAnalisisIA(resultado) {
    // Actualizar tanto el panel embebido como el widget flotante
    const containerEmbedded = document.getElementById('agentResponse');
    const containerWidget = document.getElementById('agentPanelContent');
    
    const { cliente, analisis, recomendaciones, impactoFinanciero } = resultado;
    
    // Mostrar estado de carga en ambos lugares
    const loadingHTML = '<div class="agent-loading">Generando análisis del agente...</div>';
    if (containerEmbedded) containerEmbedded.innerHTML = loadingHTML;
    if (containerWidget) containerWidget.innerHTML = loadingHTML;
    
    // Crear prompt MEJORADO con todas las métricas y contexto detallado
    const historicoStr = cliente.historico ? cliente.historico.map(h => 
        `${h.mes}: NPS=${h.nps}, Puntualidad=${h.puntualidad}%, NS=${h.nivelServicio}%, Quejas=${h.quejas}`
    ).join('\n        ') : 'No disponible';
    
    const prompt = `
ERES UN CONSULTOR EXPERTO EN CUSTOMER SUCCESS PARA TRAXIÓN (EMPRESA DE LOGÍSTICA Y TRANSPORTE EN MÉXICO).

===== DATOS DEL CLIENTE =====
NOMBRE: ${cliente.nombre}
INDUSTRIA: ${cliente.industria}
ANTIGÜEDAD COMO CLIENTE: ${cliente.antiguedad} meses

===== MÉTRICAS OPERATIVAS ACTUALES =====
• Nivel de Servicio: ${cliente.metricas.nivelServicio}% ${cliente.metricas.nivelServicio < 90 ? '⚠️ BAJO' : cliente.metricas.nivelServicio < 95 ? '⚡ MEJORABLE' : '✓ OK'}
• Puntualidad en Entregas: ${cliente.metricas.puntualidad}% ${cliente.metricas.puntualidad < 90 ? '⚠️ CRÍTICO' : cliente.metricas.puntualidad < 95 ? '⚡ ATENCIÓN' : '✓ OK'}
• NPS (Net Promoter Score): ${cliente.metricas.nps} ${cliente.metricas.nps < 30 ? '🔴 DETRACTOR CRÍTICO' : cliente.metricas.nps < 50 ? '🟡 PASIVO' : '🟢 PROMOTOR'}
• Quejas Abiertas Sin Resolver: ${cliente.metricas.quejas} ${cliente.metricas.quejas >= 3 ? '🔴 URGENTE' : cliente.metricas.quejas > 0 ? '🟡 PENDIENTE' : '✓ SIN QUEJAS'}
• Tendencia General: ${cliente.metricas.tendencia.toUpperCase()} ${cliente.metricas.tendencia === 'negativa' ? '📉 DETERIORO' : cliente.metricas.tendencia === 'positiva' ? '📈 MEJORA' : '➡️ ESTABLE'}

===== HISTÓRICO ÚLTIMOS 6 MESES =====
${historicoStr}

===== ANÁLISIS DE RIESGO =====
• SCORE DE SALUD: ${analisis.score}/100 puntos
• CLASIFICACIÓN: ${analisis.clasificacion.nivel}
• DESCRIPCIÓN: ${analisis.clasificacion.descripcion}

===== INFORMACIÓN CONTRACTUAL =====
• Valor Anual del Contrato: $${(cliente.valorContrato / 1000000).toFixed(2)} millones MXN
• Meses para Renovación: ${cliente.contrato.mesesRestantes} meses ${cliente.contrato.mesesRestantes <= 3 ? '⚠️ URGENTE' : ''}
• Renovación Automática: ${cliente.contrato.renovacionAutomatica ? 'SÍ' : 'NO - REQUIERE NEGOCIACIÓN'}

===== IMPACTO FINANCIERO PROYECTADO =====
• Probabilidad de Perder al Cliente: ${(impactoFinanciero.probabilidadPerdida * 100).toFixed(0)}%
• Pérdida Esperada si se va: $${(impactoFinanciero.perdidaEsperada / 1000000).toFixed(2)} millones MXN
• Costo de Intervención Recomendado: $${(impactoFinanciero.costoIntervencion / 1000).toFixed(0)} mil MXN
• ROI de Intervenir: ${(impactoFinanciero.roiIntervencion * 100).toFixed(0)}%

===== INSTRUCCIONES PARA TU RESPUESTA =====

Basándote en TODOS los datos anteriores, proporciona:

1. **DIAGNÓSTICO EJECUTIVO** (máximo 3 líneas)
   - ¿Cuál es el problema principal?
   - ¿Qué tan urgente es?

2. **PLAN DE ACCIÓN INMEDIATO** (exactamente 3 acciones)
   Para CADA acción indica:
   - Qué hacer específicamente
   - Quién es responsable (cargo)
   - Plazo exacto (ej: "48 horas", "esta semana", "15 días")
   - Resultado esperado

3. **INDICADOR DE ÉXITO**
   - ¿Cómo sabremos que funcionó?

FORMATO: Usa **negritas** para destacar. NO uses emojis en tu respuesta. Sé CONCRETO y ACCIONABLE.
`;

    let contenidoFinal = '';
    
    try {
        // Consultar Gemini
        const respuestaIA = await window.CustomerHealthAgent.consultarGemini(prompt, resultado);
        
        // Formatear respuesta
        contenidoFinal = respuestaIA
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/- /g, '• ');
        
    } catch (error) {
        console.error('Error en análisis IA:', error);
        
        // Fallback silencioso: Mostrar análisis sin mencionar que es local
        contenidoFinal = `
            <strong>Diagnóstico:</strong> Cliente con riesgo ${analisis.clasificacion.nivel}. 
            Score actual de ${analisis.score}/100 con tendencia ${cliente.metricas.tendencia}.<br><br>
            
            <strong>Acciones Prioritarias:</strong><br>
            ${recomendaciones.slice(0, 3).map((r, i) => 
                `${i+1}. <strong>${r.accion}</strong> - ${r.responsable} (${r.plazo})`
            ).join('<br>')}
        `;
    }
    
    // Actualizar ambos contenedores
    const htmlFinal = `<div class="agent-content">${contenidoFinal}</div>`;
    if (containerEmbedded) containerEmbedded.innerHTML = htmlFinal;
    if (containerWidget) containerWidget.innerHTML = htmlFinal;
    
    // Notificar que hay nuevo contenido en el widget
    notificarAgentWidget();
}

// ============================================================================
// VISTA RADAR (CARTERA COMPLETA)
// ============================================================================

function initRadarView() {
    // Inicializar vacío
}

function updateRadarView() {
    if (!window.CustomerHealthAgent) return;
    
    const cartera = window.CustomerHealthAgent.analizarCartera(
        window.CustomerHealthAgent.clientes
    );
    
    // Actualizar KPIs
    document.getElementById('kpiBajo').textContent = cartera.distribucion.bajo;
    document.getElementById('kpiMedio').textContent = cartera.distribucion.medio;
    document.getElementById('kpiAlto').textContent = cartera.distribucion.alto;
    document.getElementById('kpiCritico').textContent = cartera.distribucion.critico;
    
    // Actualizar resumen financiero
    document.getElementById('valorTotalCartera').textContent = 
        `$${(cartera.valorTotalCartera / 1000000).toFixed(1)}M`;
    document.getElementById('valorEnRiesgo').textContent = 
        `$${(cartera.valorEnRiesgo / 1000000).toFixed(1)}M`;
    document.getElementById('alertasUrgentes').textContent = cartera.alertasUrgentes;
    
    // Actualizar panel de alertas urgentes
    actualizarAlertas(cartera.clientesPorPrioridad);
    
    // Actualizar tabla
    actualizarTablaClientes(cartera.clientesPorPrioridad);
}

// Función para mostrar SOLO clientes en riesgo ALTO y CRÍTICO
function actualizarAlertas(clientes) {
    const container = document.getElementById('alertsList');
    const section = document.getElementById('alertsSection');
    
    // Filtrar solo alto y crítico
    const urgentes = clientes.filter(item => 
        item.analisis.clasificacion.nivel === 'ALTO' || 
        item.analisis.clasificacion.nivel === 'CRÍTICO'
    );
    
    // Si no hay urgentes, ocultar la sección
    if (urgentes.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    container.innerHTML = '';
    
    urgentes.forEach(item => {
        const { cliente, analisis, recomendaciones } = item;
        const nivel = analisis.clasificacion.nivel;
        const badgeClass = nivel === 'CRÍTICO' ? 'critico' : 'alto';
        
        const div = document.createElement('div');
        div.className = 'alert-item';
        
        div.innerHTML = `
            <div class="alert-info">
                <span class="alert-badge ${badgeClass}">${nivel}</span>
                <strong class="alert-client">${cliente.nombre}</strong>
                <span class="alert-meta">Score: ${analisis.score} | Valor: $${(cliente.valorContrato / 1000000).toFixed(1)}M | Renovación: ${cliente.contrato.mesesRestantes} meses</span>
            </div>
            <div class="alert-action">
                <span class="alert-action-text">${recomendaciones[0]?.accion || 'Revisar'}</span>
            </div>
        `;
        
        // Click para analizar
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => {
            document.querySelector('[data-tab="individual"]').click();
            document.getElementById('selectCliente').value = cliente.id;
            document.getElementById('selectCliente').dispatchEvent(new Event('change'));
            setTimeout(evaluarCliente, 100);
        });
        
        container.appendChild(div);
    });
}

function actualizarTablaClientes(clientes) {
    const tbody = document.getElementById('clientesTableBody');
    tbody.innerHTML = '';
    
    clientes.forEach((item, index) => {
        const { cliente, analisis, recomendaciones } = item;
        const clasificacion = analisis.clasificacion;
        
        // Mapear nivel a clase de badge
        let badgeClass = 'bajo'; // default
        if (clasificacion.nivel === 'MEDIO') badgeClass = 'medio';
        if (clasificacion.nivel === 'ALTO') badgeClass = 'alto';
        if (clasificacion.nivel === 'CRÍTICO') badgeClass = 'critico';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${cliente.nombre}</strong></td>
            <td>${analisis.score}</td>
            <td><span class="risk-badge ${badgeClass}">${clasificacion.nivel}</span></td>
            <td>${cliente.contrato.mesesRestantes} meses</td>
            <td>$${(cliente.valorContrato / 1000000).toFixed(1)}M</td>
            <td>${recomendaciones[0]?.accion || 'Monitorear'}</td>
        `;
        
        // Click para analizar
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => {
            // Cambiar a tab individual
            document.querySelector('[data-tab="individual"]').click();
            // Seleccionar cliente
            document.getElementById('selectCliente').value = cliente.id;
            document.getElementById('selectCliente').dispatchEvent(new Event('change'));
            // Evaluar
            setTimeout(evaluarCliente, 100);
        });
        
        tbody.appendChild(tr);
    });
}

// ============================================================================
// CHAT CON AGENTE IA
// ============================================================================

function initChat() {
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const suggestions = document.querySelectorAll('.suggestion-btn');
    
    if (!form) return;
    
    // Enviar mensaje
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const mensaje = input.value.trim();
        if (!mensaje) return;
        
        enviarMensajeChat(mensaje);
        input.value = '';
    });
    
    // Sugerencias
    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            enviarMensajeChat(btn.dataset.msg);
        });
    });
}

async function enviarMensajeChat(mensaje) {
    const history = document.getElementById('chatHistory');
    
    // Agregar mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.textContent = mensaje;
    history.appendChild(userMsg);
    
    // Scroll al final
    history.scrollTop = history.scrollHeight;

    // Mostrar indicador de "Escribiendo..."
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'chat-msg bot loading';
    loadingMsg.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    history.appendChild(loadingMsg);
    history.scrollTop = history.scrollHeight;
    
    try {
        // Procesar con el agente (ahora es async)
        const respuesta = await window.CustomerHealthAgent.procesarMensaje(mensaje);
        
        // Remover loading
        history.removeChild(loadingMsg);

        // Agregar respuesta del bot
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot';
        
        // Formatear mensaje (convertir markdown básico a HTML simple)
        let mensajeFormateado = respuesta.mensaje
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negritas
            .replace(/\n/g, '<br>') // Saltos de línea
            .replace(/- (.*?)(<br>|$)/g, '• $1<br>'); // Listas
        
        botMsg.innerHTML = mensajeFormateado;
        history.appendChild(botMsg);
        
    } catch (error) {
        // Remover loading
        if (loadingMsg.parentNode) history.removeChild(loadingMsg);
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'chat-msg bot error';
        errorMsg.textContent = "Lo siento, tuve un problema al procesar tu solicitud.";
        history.appendChild(errorMsg);
    }
    
    // Scroll al final
    history.scrollTop = history.scrollHeight;
}
