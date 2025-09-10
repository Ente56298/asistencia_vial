// Base de datos de tests psicológicos profesionales integrados
// Basado en recursos de ADIPA y RyA Psicólogos

const PROFESSIONAL_TESTS_DATABASE = {
    // Tests de Personalidad
    personality: {
        bigFive: {
            name: "Big Five (NEO-PI-R Adaptado)",
            description: "Evaluación de los cinco grandes factores de personalidad",
            source: "Costa & McCrae (1992)",
            dimensions: ["Apertura", "Consciencia", "Extraversión", "Amabilidad", "Neuroticismo"],
            questions: [
                {text: "Soy hablador y expresivo", dimension: "E", reverse: false},
                {text: "Tiendo a encontrar defectos en otros", dimension: "A", reverse: true},
                {text: "Hago un trabajo minucioso", dimension: "C", reverse: false},
                {text: "Me deprimo, me pongo triste", dimension: "N", reverse: false},
                {text: "Soy original, se me ocurren ideas nuevas", dimension: "O", reverse: false},
                {text: "Soy reservado", dimension: "E", reverse: true},
                {text: "Soy servicial y desinteresado con otros", dimension: "A", reverse: false},
                {text: "Puedo ser algo descuidado", dimension: "C", reverse: true},
                {text: "Soy relajado, manejo bien el estrés", dimension: "N", reverse: true},
                {text: "Tengo curiosidad por muchas cosas diferentes", dimension: "O", reverse: false},
                {text: "Estoy lleno de energía", dimension: "E", reverse: false},
                {text: "Comienzo peleas con otros", dimension: "A", reverse: true},
                {text: "Soy un trabajador confiable", dimension: "C", reverse: false},
                {text: "Puedo estar tenso", dimension: "N", reverse: false},
                {text: "Soy ingenioso, un pensador profundo", dimension: "O", reverse: false},
                {text: "Genero mucho entusiasmo", dimension: "E", reverse: false},
                {text: "Tengo una naturaleza perdonadora", dimension: "A", reverse: false},
                {text: "Tiendo a ser desorganizado", dimension: "C", reverse: true},
                {text: "Me preocupo mucho", dimension: "N", reverse: false},
                {text: "Tengo una imaginación activa", dimension: "O", reverse: false}
            ]
        },
        mbti: {
            name: "Indicador Myers-Briggs (MBTI)",
            description: "Tipología de personalidad basada en las funciones cognitivas de Jung",
            source: "Myers & Briggs (1962)",
            dimensions: ["EI", "SN", "TF", "JP"],
            questions: [
                {text: "Prefiero trabajar en equipo que solo", dimension: "EI", direction: "E"},
                {text: "Me enfoco más en hechos concretos que en posibilidades", dimension: "SN", direction: "S"},
                {text: "Tomo decisiones basándome en la lógica más que en los sentimientos", dimension: "TF", direction: "T"},
                {text: "Prefiero tener las cosas planificadas que improvisar", dimension: "JP", direction: "J"},
                {text: "Me energizo más en grupos sociales que en soledad", dimension: "EI", direction: "E"},
                {text: "Confío más en mi experiencia que en mi intuición", dimension: "SN", direction: "S"},
                {text: "Valoro más la armonía que tener razón", dimension: "TF", direction: "F"},
                {text: "Prefiero mantener mis opciones abiertas", dimension: "JP", direction: "P"},
                {text: "Hablo para pensar en voz alta", dimension: "EI", direction: "E"},
                {text: "Me interesan más los patrones que los detalles", dimension: "SN", direction: "N"},
                {text: "Critico ideas para mejorarlas", dimension: "TF", direction: "T"},
                {text: "Me gusta terminar proyectos antes de comenzar otros", dimension: "JP", direction: "J"}
            ]
        },
        enneagram: {
            name: "Eneagrama de la Personalidad",
            description: "Sistema de nueve tipos de personalidad interconectados",
            source: "Riso & Hudson (1996)",
            types: [1,2,3,4,5,6,7,8,9],
            questions: [
                {text: "Me esfuerzo por ser perfecto y correcto", type: 1},
                {text: "Me enfoco en ayudar y cuidar a otros", type: 2},
                {text: "Me motiva el éxito y ser admirado", type: 3},
                {text: "Siento que soy diferente y único", type: 4},
                {text: "Necesito entender cómo funciona todo", type: 5},
                {text: "Busco seguridad y apoyo en otros", type: 6},
                {text: "Quiero experimentar todo lo que la vida ofrece", type: 7},
                {text: "Me gusta tener control y ser fuerte", type: 8},
                {text: "Prefiero mantener la paz y evitar conflictos", type: 9}
            ]
        }
    },

    // Tests Cognitivos
    cognitive: {
        attention: {
            name: "Test de Atención Sostenida (CPT)",
            description: "Evaluación de capacidad atencional y concentración",
            source: "Conners (2000)",
            measures: ["Atención sostenida", "Vigilancia", "Control inhibitorio"],
            questions: [
                {text: "Puedo mantener mi atención en tareas largas sin distraerme", type: "sustained"},
                {text: "Noto fácilmente cuando algo cambia en mi entorno", type: "selective"},
                {text: "Puedo concentrarme incluso con ruido de fondo", type: "focused"},
                {text: "Mi mente tiende a divagar durante conversaciones", type: "sustained", reverse: true},
                {text: "Puedo alternar entre diferentes tareas sin perder el hilo", type: "divided"},
                {text: "Me doy cuenta rápidamente de errores en mi trabajo", type: "monitoring"},
                {text: "Puedo ignorar distracciones cuando me concentro", type: "inhibitory"},
                {text: "Mantengo el foco incluso en tareas aburridas", type: "sustained"}
            ]
        },
        memory: {
            name: "Índice de Memoria de Trabajo (WMI)",
            description: "Evaluación de memoria de trabajo y procesamiento cognitivo",
            source: "Wechsler (2008)",
            components: ["Memoria auditiva", "Memoria visual", "Procesamiento secuencial"],
            questions: [
                {text: "Puedo recordar fácilmente listas de elementos mientras trabajo con ellos", type: "working"},
                {text: "Mantengo información en mente mientras resuelvo problemas", type: "working"},
                {text: "Puedo seguir instrucciones complejas de múltiples pasos", type: "sequential"},
                {text: "Recuerdo conversaciones recientes con claridad", type: "auditory"},
                {text: "Puedo hacer cálculos mentales complejos", type: "processing"},
                {text: "Visualizo fácilmente objetos en mi mente", type: "visual"},
                {text: "Puedo repetir secuencias de números hacia atrás", type: "sequential"},
                {text: "Mantengo el hilo de conversaciones largas", type: "auditory"}
            ]
        },
        executive: {
            name: "Funciones Ejecutivas (EF)",
            description: "Evaluación de planificación, flexibilidad y control cognitivo",
            source: "Diamond (2013)",
            functions: ["Inhibición", "Flexibilidad", "Memoria de trabajo", "Planificación"],
            questions: [
                {text: "Puedo cambiar fácilmente entre diferentes tipos de tareas", type: "flexibility"},
                {text: "Planifico mis actividades con anticipación", type: "planning"},
                {text: "Puedo detener comportamientos automáticos cuando es necesario", type: "inhibition"},
                {text: "Me adapto rápidamente a nuevas reglas o situaciones", type: "flexibility"},
                {text: "Organizo mis tareas por prioridad", type: "planning"},
                {text: "Controlo mis impulsos efectivamente", type: "inhibition"},
                {text: "Puedo mantener múltiples objetivos en mente", type: "working_memory"},
                {text: "Anticipo las consecuencias de mis acciones", type: "planning"}
            ]
        }
    },

    // Tests de Inteligencia Emocional
    emotional: {
        eq_i: {
            name: "EQ-i 2.0 Adaptado",
            description: "Inventario de Cociente Emocional",
            source: "Bar-On (2006)",
            competencies: ["Autoconciencia", "Autorregulación", "Motivación", "Empatía", "Habilidades sociales"],
            questions: [
                {text: "Reconozco fácilmente mis emociones cuando las experimento", competency: "self_awareness"},
                {text: "Puedo controlar mis emociones cuando es necesario", competency: "self_regulation"},
                {text: "Me siento motivado para alcanzar mis objetivos", competency: "motivation"},
                {text: "Entiendo fácilmente las emociones de otras personas", competency: "empathy"},
                {text: "Manejo bien las relaciones sociales", competency: "social_skills"},
                {text: "Soy consciente de cómo mis emociones afectan mi comportamiento", competency: "self_awareness"},
                {text: "Puedo calmarme cuando estoy alterado", competency: "self_regulation"},
                {text: "Persisto ante los obstáculos", competency: "motivation"},
                {text: "Puedo 'leer' las emociones en las expresiones faciales", competency: "empathy"},
                {text: "Influyo positivamente en otros", competency: "social_skills"}
            ]
        },
        erq: {
            name: "Cuestionario de Regulación Emocional (ERQ)",
            description: "Evaluación de estrategias de regulación emocional",
            source: "Gross & John (2003)",
            strategies: ["Reevaluación cognitiva", "Supresión expresiva"],
            questions: [
                {text: "Cuando quiero sentir emociones más positivas, cambio en qué pienso", strategy: "reappraisal"},
                {text: "Controlo mis emociones cambiando mi forma de pensar sobre la situación", strategy: "reappraisal"},
                {text: "Cuando siento emociones negativas, me aseguro de no expresarlas", strategy: "suppression"},
                {text: "Cuando estoy sintiendo emociones positivas, tengo cuidado de no expresarlas", strategy: "suppression"},
                {text: "Controlo mis emociones no expresándolas", strategy: "suppression"},
                {text: "Para cambiar mis emociones, pienso en algo diferente", strategy: "reappraisal"}
            ]
        }
    },

    // Tests de Bienestar
    wellbeing: {
        pwbs: {
            name: "Escala de Bienestar Psicológico (PWBS)",
            description: "Evaluación multidimensional del bienestar psicológico",
            source: "Ryff (1989)",
            dimensions: ["Autoaceptación", "Relaciones positivas", "Autonomía", "Dominio del entorno", "Propósito en la vida", "Crecimiento personal"],
            questions: [
                {text: "En general, me siento satisfecho conmigo mismo", dimension: "self_acceptance"},
                {text: "Mantengo relaciones cálidas y confiables con otros", dimension: "positive_relations"},
                {text: "Tengo confianza en mis opiniones, incluso si van contra el consenso", dimension: "autonomy"},
                {text: "Soy capaz de manejar las responsabilidades de mi vida diaria", dimension: "environmental_mastery"},
                {text: "Tengo una sensación clara de propósito en la vida", dimension: "purpose_in_life"},
                {text: "Para mí, la vida ha sido un proceso continuo de aprendizaje y crecimiento", dimension: "personal_growth"}
            ]
        },
        cd_risc: {
            name: "Escala de Resiliencia Connor-Davidson (CD-RISC)",
            description: "Evaluación de la capacidad de resiliencia",
            source: "Connor & Davidson (2003)",
            factors: ["Competencia personal", "Tolerancia al afecto negativo", "Aceptación positiva del cambio", "Control", "Influencias espirituales"],
            questions: [
                {text: "Soy capaz de adaptarme cuando ocurren cambios", factor: "adaptability"},
                {text: "Tengo al menos una relación cercana y segura que me ayuda cuando estoy estresado", factor: "support"},
                {text: "Cuando no hay soluciones claras a mis problemas, a veces el destino o Dios pueden ayudar", factor: "spiritual"},
                {text: "Puedo lidiar con cualquier cosa que se me presente", factor: "competence"},
                {text: "Los éxitos pasados me dan confianza para enfrentar nuevos desafíos", factor: "competence"},
                {text: "Trato de ver el lado humorístico de las cosas cuando enfrento problemas", factor: "coping"}
            ]
        },
        maas: {
            name: "Escala de Atención Plena Mindful (MAAS)",
            description: "Evaluación de la atención plena y consciencia del momento presente",
            source: "Brown & Ryan (2003)",
            aspects: ["Atención", "Consciencia", "Momento presente"],
            questions: [
                {text: "Podría experimentar alguna emoción y no ser consciente de ella hasta tiempo después", reverse: true},
                {text: "Rompo o derramo cosas por descuido, por no prestar atención, o por estar pensando en otra cosa", reverse: true},
                {text: "Me resulta difícil mantenerme enfocado en lo que está pasando en el presente", reverse: true},
                {text: "Tiendo a caminar rápidamente para llegar a donde voy sin prestar atención a lo que experimento en el camino", reverse: true},
                {text: "Tiendo a no notar sentimientos de tensión física o incomodidad hasta que realmente captan mi atención", reverse: true},
                {text: "Me olvido del nombre de una persona casi tan pronto como me lo dicen por primera vez", reverse: true}
            ]
        }
    },

    // Tests Especializados
    specialized: {
        creativity: {
            name: "Test de Pensamiento Creativo de Torrance (TTCT)",
            description: "Evaluación de creatividad y pensamiento divergente",
            source: "Torrance (1974)",
            measures: ["Fluidez", "Flexibilidad", "Originalidad", "Elaboración"],
            questions: [
                {text: "Genero muchas ideas diferentes para resolver un problema", measure: "fluency"},
                {text: "Mis ideas suelen ser poco convencionales", measure: "originality"},
                {text: "Puedo ver problemas desde múltiples perspectivas", measure: "flexibility"},
                {text: "Desarrollo mis ideas con gran detalle", measure: "elaboration"},
                {text: "Disfruto creando cosas nuevas y únicas", measure: "originality"},
                {text: "Puedo combinar ideas de formas inesperadas", measure: "flexibility"}
            ]
        },
        motivation: {
            name: "Escala de Motivación Intrínseca (IMI)",
            description: "Evaluación de motivación intrínseca y autodeterminación",
            source: "Deci & Ryan (1985)",
            subscales: ["Interés/Disfrute", "Competencia percibida", "Esfuerzo/Importancia", "Presión/Tensión"],
            questions: [
                {text: "Disfruto mucho realizando esta actividad", subscale: "interest"},
                {text: "Creo que soy bastante bueno en esta actividad", subscale: "competence"},
                {text: "Es importante para mí hacerlo bien en esta actividad", subscale: "effort"},
                {text: "No me siento nervioso mientras realizo esta actividad", subscale: "pressure", reverse: true},
                {text: "Esta actividad es divertida", subscale: "interest"},
                {text: "Me siento satisfecho con mi desempeño", subscale: "competence"}
            ]
        }
    }
};

// Funciones de cálculo y análisis
const TEST_CALCULATORS = {
    calculateBigFive: function(responses) {
        const dimensions = {O: [], C: [], E: [], A: [], N: []};
        
        responses.forEach(response => {
            const question = response.question;
            const value = question.reverse ? (6 - response.value) : response.value;
            if (dimensions[question.dimension]) {
                dimensions[question.dimension].push(value);
            }
        });
        
        const result = {};
        Object.keys(dimensions).forEach(dim => {
            if (dimensions[dim].length > 0) {
                const avg = dimensions[dim].reduce((a,b) => a+b, 0) / dimensions[dim].length;
                result[dim] = Math.round(avg * 20);
            }
        });
        
        return {
            openness: result.O || 0,
            conscientiousness: result.C || 0,
            extraversion: result.E || 0,
            agreeableness: result.A || 0,
            neuroticism: result.N || 0,
            interpretation: this.interpretBigFive(result)
        };
    },

    interpretBigFive: function(scores) {
        const interpretations = {
            O: scores.O > 70 ? "Muy abierto a experiencias" : scores.O > 30 ? "Moderadamente abierto" : "Convencional",
            C: scores.C > 70 ? "Muy consciente y organizado" : scores.C > 30 ? "Moderadamente organizado" : "Flexible y espontáneo",
            E: scores.E > 70 ? "Muy extrovertido" : scores.E > 30 ? "Ambivertido" : "Introvertido",
            A: scores.A > 70 ? "Muy amable y cooperativo" : scores.A > 30 ? "Moderadamente amable" : "Competitivo",
            N: scores.N > 70 ? "Emocionalmente reactivo" : scores.N > 30 ? "Moderadamente estable" : "Muy estable emocionalmente"
        };
        return interpretations;
    },

    calculateMBTI: function(responses) {
        const preferences = {EI: 0, SN: 0, TF: 0, JP: 0};
        
        responses.forEach(response => {
            const question = response.question;
            const value = response.value;
            
            if (question.dimension && preferences.hasOwnProperty(question.dimension)) {
                if (question.direction === question.dimension[0]) {
                    preferences[question.dimension] += (value - 3);
                } else {
                    preferences[question.dimension] -= (value - 3);
                }
            }
        });
        
        const type = 
            (preferences.EI > 0 ? 'E' : 'I') +
            (preferences.SN > 0 ? 'S' : 'N') +
            (preferences.TF > 0 ? 'T' : 'F') +
            (preferences.JP > 0 ? 'J' : 'P');
            
        return {
            type: type,
            preferences: preferences,
            description: this.getMBTIDescription(type)
        };
    },

    getMBTIDescription: function(type) {
        const descriptions = {
            'INTJ': 'Arquitecto - Pensador imaginativo y estratégico',
            'INTP': 'Pensador - Innovador flexible y curioso',
            'ENTJ': 'Comandante - Líder audaz e imaginativo',
            'ENTP': 'Innovador - Visionario entusiasta y creativo',
            'INFJ': 'Abogado - Idealista creativo e insightful',
            'INFP': 'Mediador - Idealista leal a sus valores',
            'ENFJ': 'Protagonista - Líder carismático e inspirador',
            'ENFP': 'Activista - Entusiasta, creativo y sociable',
            'ISTJ': 'Logista - Práctico y orientado a hechos',
            'ISFJ': 'Protector - Protector cálido y dedicado',
            'ESTJ': 'Ejecutivo - Excelente administrador',
            'ESFJ': 'Cónsul - Extraordinariamente cuidadoso y popular',
            'ISTP': 'Virtuoso - Experimentador audaz y práctico',
            'ISFP': 'Aventurero - Artista flexible y encantador',
            'ESTP': 'Emprendedor - Perceptivo, enérgico y espontáneo',
            'ESFP': 'Animador - Espontáneo, energético y entusiasta'
        };
        return descriptions[type] || 'Tipo único de personalidad';
    },

    calculateEmotionalIntelligence: function(responses) {
        const competencies = {
            self_awareness: [],
            self_regulation: [],
            motivation: [],
            empathy: [],
            social_skills: []
        };
        
        responses.forEach(response => {
            const competency = response.question.competency;
            if (competencies[competency]) {
                competencies[competency].push(response.value);
            }
        });
        
        const scores = {};
        let totalScore = 0;
        let totalCount = 0;
        
        Object.keys(competencies).forEach(comp => {
            if (competencies[comp].length > 0) {
                const avg = competencies[comp].reduce((a,b) => a+b, 0) / competencies[comp].length;
                scores[comp] = Math.round(avg * 20);
                totalScore += avg;
                totalCount++;
            }
        });
        
        const overallScore = totalCount > 0 ? Math.round((totalScore / totalCount) * 20) : 0;
        
        return {
            overall: overallScore,
            competencies: scores,
            level: this.getEQLevel(overallScore),
            interpretation: this.interpretEQ(scores)
        };
    },

    getEQLevel: function(score) {
        if (score >= 80) return "Muy Alto";
        if (score >= 60) return "Alto";
        if (score >= 40) return "Moderado";
        if (score >= 20) return "Bajo";
        return "Muy Bajo";
    },

    interpretEQ: function(scores) {
        const interpretations = {};
        Object.keys(scores).forEach(comp => {
            const score = scores[comp];
            if (score >= 70) interpretations[comp] = "Fortaleza";
            else if (score >= 40) interpretations[comp] = "Adecuado";
            else interpretations[comp] = "Área de desarrollo";
        });
        return interpretations;
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PROFESSIONAL_TESTS_DATABASE,
        TEST_CALCULATORS
    };
}