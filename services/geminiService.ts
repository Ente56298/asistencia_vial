import { GoogleGenAI, Type } from "@google/genai";
// FIX: Changed Part to VehiclePart to use the specific type for vehicle parts.
import { VehiclePart, Service, TrafficReport, AssistanceType, Content, WeatherReport, LocationCoords } from '../types';

// FIX: Removed mock API key setup. Per guidelines, process.env.API_KEY must be assumed to exist.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schemas for structured responses
const partsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            nombre: { type: Type.STRING, description: "Nombre de la refacción." },
            descripcion: { type: Type.STRING, description: "Breve descripción de la refacción y compatibilidad." },
            proveedor_sugerido: { type: Type.STRING, description: "Nombre de una tienda o proveedor conocido en México." },
            precio_estimado: { type: Type.NUMBER, description: "Precio promedio estimado en pesos mexicanos (MXN)." },
        },
        required: ["nombre", "descripcion", "proveedor_sugerido", "precio_estimado"],
    },
};

const servicesSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            nombre: { type: Type.STRING, description: "Nombre del establecimiento o servicio." },
            tipo: { type: Type.STRING, description: "Tipo de servicio (ej. 'Gasolinera', 'Taller Mecánico')." },
            ubicacion_aproximada: { type: Type.STRING, description: "Dirección o referencia de la ubicación." },
            telefono: { type: Type.STRING, description: "Número de teléfono, si está disponible." },
            latitud: { type: Type.NUMBER, description: "Coordenada de latitud geográfica." },
            longitud: { type: Type.NUMBER, description: "Coordenada de longitud geográfica." },
        },
        required: ["nombre", "tipo", "ubicacion_aproximada", "latitud", "longitud"],
    },
};

const trafficReportSchema = {
    type: Type.OBJECT,
    properties: {
        resumen: { type: Type.STRING, description: "Un resumen general de las condiciones del tráfico en la zona." },
        incidentes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista de incidentes específicos (accidentes, obras, etc.).",
        },
        rutas_alternas: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Sugerencias de rutas alternativas si el tráfico es denso.",
        },
        alerta_critica: {
            type: Type.STRING,
            description: "Si existe un incidente mayor que requiera atención inmediata (ej. 'CIERRE TOTAL por accidente', 'Inundación bloquea carriles'), resume la alerta aquí en una frase corta y directa. De lo contrario, omite este campo."
        }
    },
    required: ["resumen"],
};

const weatherReportSchema = {
    type: Type.OBJECT,
    properties: {
        resumen: { type: Type.STRING, description: "Un resumen general de las condiciones del clima." },
        temperatura_celsius: { type: Type.NUMBER, description: "La temperatura actual en grados Celsius." },
        condiciones: { type: Type.STRING, description: "Descripción de las condiciones (ej. 'Soleado', 'Nublado', 'Lluvia ligera')." },
        alerta_critica: {
            type: Type.STRING,
            description: "Si existe una alerta meteorológica severa (ej. 'Alerta de Tormenta Eléctrica', 'Fuertes vientos con granizo'), resume la alerta aquí en una frase corta y directa. De lo contrario, omite este campo."
        }
    },
    required: ["resumen", "temperatura_celsius", "condiciones"],
};


const generateJson = async (prompt: string, schema: object): Promise<string> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });
    return response.text;
};

const generateText = async (prompt: string, history: Content[] = [], systemInstruction?: string): Promise<string> => {
    // FIX: Pass the entire conversation history to the `contents` parameter to maintain context.
    // The previous implementation was only sending the last message as a simple string.
    const contents = history.length > 0 ? history : [{ role: 'user' as const, parts: [{ text: prompt }] }];
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
           ...(systemInstruction && { systemInstruction }),
        },
    });
    return response.text;
};

// FIX: Changed return type from Part[] to VehiclePart[] to match the specific type definition.
export const findParts = async (query: string): Promise<VehiclePart[]> => {
    const prompt = `Encuentra refacciones para: "${query}". Devuelve una lista de 3 opciones populares o compatibles.`;
    const jsonString = await generateJson(prompt, partsSchema);
    return JSON.parse(jsonString);
};

export const getTrafficReport = async (location: string): Promise<TrafficReport> => {
    const prompt = `Genera un reporte de tráfico detallado para la siguiente ubicación en México: "${location}". Incluye un resumen, incidentes relevantes, posibles rutas alternas y, si aplica, una 'alerta_critica' para eventos muy graves.`;
    const jsonString = await generateJson(prompt, trafficReportSchema);
    return JSON.parse(jsonString);
};

export const findServices = async (query: string, location: string, radius: number): Promise<Service[]> => {
    const prompt = `Busca servicios de "${query}" en un radio de ${radius} kilómetros alrededor de "${location}" en México. Proporciona una lista de 2 a 3 opciones, incluyendo sus coordenadas geográficas (latitud y longitud) precisas para poder ubicarlas en un mapa.`;
    const jsonString = await generateJson(prompt, servicesSchema);
    return JSON.parse(jsonString);
};

export const getWeatherReport = async (location: string): Promise<WeatherReport> => {
    const prompt = `Genera un reporte del clima para la siguiente ubicación en México: "${location}". Incluye un resumen, la temperatura actual en grados Celsius, las condiciones generales y, si aplica, una 'alerta_critica' para fenómenos meteorológicos severos.`;
    const jsonString = await generateJson(prompt, weatherReportSchema);
    return JSON.parse(jsonString);
};

export const getConversion = async (amount: number, from: string, to: string): Promise<string> => {
    const prompt = `Convierte ${amount} ${from} a ${to}. Responde únicamente con el valor numérico final, sin unidades, comas de miles ni texto adicional. Usa un punto como separador decimal. Ejemplo de respuesta: 1234.56`;
    const responseText = await generateText(prompt);
    // The response should be a number-like string, we trim to be safe.
    return responseText.trim();
};

export const getEmergencyResponse = async (): Promise<string> => {
    const prompt = "Actúa como un despachador de emergencias 911 en México. Confirma que la alerta SOS ha sido recibida, que la ubicación ha sido triangulada y que la unidad de la Guardia Nacional más cercana está en camino. Menciona que los servicios de emergencia locales también han sido notificados. Proporciona un tiempo estimado de llegada de 10-15 minutos. Termina con una nota tranquilizadora pidiendo al usuario que se mantenga a salvo.";
    return generateText(prompt);
};

export const getEvaluationResponse = async (history: Content[]): Promise<string> => {
    const systemInstruction = `Eres un asistente de evaluación de situaciones para conductores en México. Tu objetivo es entender el problema del usuario y guiarlo hacia la herramienta correcta dentro de la app.
- Si el problema es sobre una pieza del auto, recomienda usar la función "Buscar Refacciones".
- Si necesita un lugar físico (taller, gasolinera), recomienda usar la función "Buscar Servicios".
- Si el problema es sobre congestión vehicular o condiciones de la carretera, recomienda usar la función "Generar Reporte de Tráfico".
- Responde de forma concisa y directa a la pregunta del usuario, guiándolo a la herramienta más adecuada. No saludes ni te presentes, ve directo a la recomendación.`;

    return generateText("", history, systemInstruction);
};

export const getAgentResponse = async (history: Content[], assistanceType: AssistanceType): Promise<string> => {
    let systemInstruction = `Eres un agente de asistencia especializado. Sé empático, profesional y da instrucciones claras y concisas. Estás en México.`;
    switch (assistanceType) {
        case AssistanceType.Mechanic:
            systemInstruction += ` Eres un mecánico experto. Tu objetivo es ayudar a diagnosticar problemas mecánicos simples y dar consejos de seguridad. Si el problema es complejo, recomienda buscar un taller profesional.`;
            break;
        case AssistanceType.Medical:
            systemInstruction += ` Eres un paramédico. Tu objetivo es dar primeros auxilios básicos por teléfono mientras llega la ayuda profesional. Pregunta por el estado de la persona y da instrucciones claras. Siempre enfatiza que no reemplazas a un médico y que la ayuda profesional está en camino.`;
            break;
        case AssistanceType.Legal:
            systemInstruction += ` Eres un asistente legal virtual especializado en incidentes de tráfico en México. Tu objetivo es proporcionar orientación general y los siguientes pasos a seguir. NO ofreces asesoramiento legal formal. Aconseja al usuario sobre cómo documentar la escena, qué información intercambiar y la importancia de contactar a su compañía de seguros. Sé claro, calmado y enfatiza que no reemplazas a un abogado.`;
            break;
        case AssistanceType.Other:
             systemInstruction += ` Eres un asistente general de servicios viales. Tu objetivo es entender la necesidad específica del usuario que no encaja en las categorías de mecánica, médica o legal. Haz preguntas para aclarar la situación y ofrece sugerencias lógicas y seguras. Si no puedes ayudar directamente, sé honesto y sugiere contactar a las autoridades locales si es apropiado.`;
            break;
    }
     return generateText("", history, systemInstruction);
};

export interface AgentContext {
    traffic: string;
    weather: string;
    infrastructure: string;
    safety: string;
}

export const getSituationAnalysis = async (userProblem: string, context: AgentContext): Promise<string> => {
    const prompt = `
        Eres un agente coordinador de asistencia vial en México. Has recibido la siguiente información de tus agentes especializados y del usuario.

        **Reporte del Usuario:**
        "${userProblem}"

        **Contexto de los Agentes:**
        - **Tráfico:** ${context.traffic}
        - **Clima:** ${context.weather}
        - **Infraestructura:** ${context.infrastructure}
        - **Seguridad:** ${context.safety}

        **Tu Tarea:**
        Sintetiza toda la información en un reporte claro y accionable para el usuario. El reporte debe tener las siguientes secciones en formato markdown:

        **Análisis de la Situación**
        (Un párrafo que resuma la situación general, combinando el problema del usuario con el contexto).

        **Nivel de Riesgo**
        (Evalúa el riesgo general como BAJO, MEDIO o ALTO y explica brevemente por qué).

        **Plan de Acción Recomendado**
        (Una lista de 3 a 5 pasos claros y priorizados que el usuario debe seguir. Empieza con lo más urgente).

        **Recursos Disponibles**
        (Menciona las herramientas de la app que pueden ser útiles, como "Contactar Asistencia" o "Ver Servicios Cercanos").
    `;
    return generateText(prompt);
};

export const getProactiveAlert = async (location: LocationCoords, routeGeoJSON: any): Promise<string> => {
    const prompt = `
        Actúa como un asistente de IA de vigilancia vial proactivo.
        El usuario se encuentra en la ubicación: latitud ${location.lat}, longitud ${location.lon}.
        Está siguiendo una ruta definida por el siguiente GeoJSON: ${JSON.stringify(routeGeoJSON)}.

        Tu única tarea es determinar si existe alguna alerta de tráfico *crítica y nueva* que afecte directamente su ruta.
        Las alertas críticas son únicamente eventos como:
        - "CIERRE TOTAL por accidente"
        - "Inundación bloqueando carriles"
        - "Manifestación bloquea la autopista"
        - "Derrumbe en la carretera"

        Si encuentras una alerta crítica que afecte la ruta, responde **únicamente con el texto de la alerta**.
        Ejemplo de respuesta: "ALERTA: Cierre total en la Autopista México-Puebla a la altura del km 45 por accidente."

        Si NO hay alertas críticas nuevas y relevantes, responde con la cadena de texto exacta: "NO_ALERT".
    `;
    return generateText(prompt);
};