// CO•RA Analytics Engine - Análisis continuo del usuario durante evaluación
class CoraAnalyticsEngine {
    constructor() {
        this.sessionData = {
            startTime: Date.now(),
            userId: this.generateUserId(),
            behaviorMetrics: {},
            cognitivePatterns: {},
            interactionData: [],
            biometricData: {},
            environmentalData: {}
        };
        this.initializeTracking();
    }

    generateUserId() {
        return 'cora_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    initializeTracking() {
        this.trackMouseBehavior();
        this.trackKeyboardPatterns();
        this.trackScrollBehavior();
        this.trackTimePatterns();
        this.trackDeviceMetrics();
        this.trackCognitiveLoad();
        this.startContinuousAnalysis();
    }

    // Análisis de comportamiento del mouse
    trackMouseBehavior() {
        let mouseData = { movements: [], clicks: [], hesitations: 0 };
        
        document.addEventListener('mousemove', (e) => {
            mouseData.movements.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
                velocity: this.calculateVelocity(e)
            });
            
            this.analyzeMicromovements(mouseData.movements);
        });

        document.addEventListener('click', (e) => {
            mouseData.clicks.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
                hesitationTime: this.calculateHesitation(e)
            });
        });

        this.sessionData.behaviorMetrics.mouse = mouseData;
    }

    // Análisis de patrones de teclado
    trackKeyboardPatterns() {
        let keyData = { rhythm: [], pauses: [], corrections: 0 };
        
        document.addEventListener('keydown', (e) => {
            keyData.rhythm.push({
                key: e.key,
                timestamp: Date.now(),
                pressure: e.force || 1
            });
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Backspace') keyData.corrections++;
        });

        this.sessionData.behaviorMetrics.keyboard = keyData;
    }

    // Análisis de scroll y atención
    trackScrollBehavior() {
        let scrollData = { patterns: [], focusAreas: [], readingSpeed: 0 };
        
        document.addEventListener('scroll', (e) => {
            scrollData.patterns.push({
                position: window.scrollY,
                timestamp: Date.now(),
                direction: this.getScrollDirection()
            });
        });

        this.sessionData.behaviorMetrics.scroll = scrollData;
    }

    // Análisis de patrones temporales
    trackTimePatterns() {
        let timeData = { 
            questionTimes: [],
            pausePatterns: [],
            rushBehavior: false,
            deliberationIndex: 0
        };

        this.sessionData.cognitivePatterns.timing = timeData;
    }

    // Métricas del dispositivo y entorno
    trackDeviceMetrics() {
        this.sessionData.environmentalData = {
            screenSize: { width: screen.width, height: screen.height },
            viewport: { width: window.innerWidth, height: window.innerHeight },
            deviceType: this.detectDeviceType(),
            browser: navigator.userAgent,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            connectionType: navigator.connection?.effectiveType || 'unknown'
        };
    }

    // Análisis de carga cognitiva
    trackCognitiveLoad() {
        let cognitiveData = {
            decisionTime: [],
            changeFrequency: 0,
            uncertaintyMarkers: [],
            confidenceLevel: 0
        };

        this.sessionData.cognitivePatterns.load = cognitiveData;
    }

    // Análisis continuo en tiempo real
    startContinuousAnalysis() {
        setInterval(() => {
            this.analyzeCurrentState();
            this.updateCognitiveProfile();
            this.detectAnomalies();
        }, 2000);
    }

    // Análisis del estado actual
    analyzeCurrentState() {
        const currentTime = Date.now();
        const sessionDuration = currentTime - this.sessionData.startTime;
        
        // Análisis de fatiga cognitiva
        this.detectCognitiveFatigue(sessionDuration);
        
        // Análisis de patrones de atención
        this.analyzeAttentionPatterns();
        
        // Análisis de consistencia de respuestas
        this.analyzeResponseConsistency();
    }

    // Detección de fatiga cognitiva
    detectCognitiveFatigue(duration) {
        const fatigueIndicators = {
            increasedResponseTime: this.calculateResponseTimeIncrease(),
            decreasedMousePrecision: this.calculateMousePrecisionDecrease(),
            increasedCorrections: this.calculateCorrectionIncrease(),
            scrollingPatterns: this.analyzeScrollFatigue()
        };

        this.sessionData.cognitivePatterns.fatigue = fatigueIndicators;
    }

    // Análisis de patrones de atención
    analyzeAttentionPatterns() {
        const attentionMetrics = {
            focusStability: this.calculateFocusStability(),
            distractionEvents: this.countDistractionEvents(),
            engagementLevel: this.calculateEngagementLevel(),
            multitaskingDetection: this.detectMultitasking()
        };

        this.sessionData.cognitivePatterns.attention = attentionMetrics;
    }

    // Análisis de consistencia
    analyzeResponseConsistency() {
        const consistencyMetrics = {
            responseVariability: this.calculateResponseVariability(),
            patternStability: this.calculatePatternStability(),
            contradictionDetection: this.detectContradictions(),
            authenticityScore: this.calculateAuthenticityScore()
        };

        this.sessionData.cognitivePatterns.consistency = consistencyMetrics;
    }

    // Actualización del perfil cognitivo
    updateCognitiveProfile() {
        const profile = {
            cognitiveStyle: this.determineCognitiveStyle(),
            processingSpeed: this.calculateProcessingSpeed(),
            decisionMakingPattern: this.analyzeDecisionPattern(),
            stressLevel: this.calculateStressLevel(),
            authenticityLevel: this.calculateAuthenticity(),
            engagementQuality: this.assessEngagementQuality()
        };

        this.sessionData.cognitivePatterns.profile = profile;
    }

    // Detección de anomalías
    detectAnomalies() {
        const anomalies = {
            botBehavior: this.detectBotBehavior(),
            randomResponses: this.detectRandomResponses(),
            speedingBehavior: this.detectSpeeding(),
            inattentiveBehavior: this.detectInattention(),
            inconsistentBehavior: this.detectInconsistency()
        };

        this.sessionData.behaviorMetrics.anomalies = anomalies;
    }

    // Métodos de cálculo específicos
    calculateVelocity(event) {
        // Implementación simplificada
        return Math.random() * 100;
    }

    calculateHesitation(event) {
        return Math.random() * 1000;
    }

    getScrollDirection() {
        return Math.random() > 0.5 ? 'down' : 'up';
    }

    detectDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    calculateResponseTimeIncrease() {
        return Math.random() * 0.3;
    }

    calculateMousePrecisionDecrease() {
        return Math.random() * 0.2;
    }

    calculateCorrectionIncrease() {
        return Math.random() * 0.15;
    }

    analyzeScrollFatigue() {
        return Math.random() * 0.25;
    }

    calculateFocusStability() {
        return 0.7 + Math.random() * 0.3;
    }

    countDistractionEvents() {
        return Math.floor(Math.random() * 5);
    }

    calculateEngagementLevel() {
        return 0.6 + Math.random() * 0.4;
    }

    detectMultitasking() {
        return Math.random() > 0.8;
    }

    calculateResponseVariability() {
        return Math.random() * 0.3;
    }

    calculatePatternStability() {
        return 0.7 + Math.random() * 0.3;
    }

    detectContradictions() {
        return Math.random() > 0.9;
    }

    calculateAuthenticityScore() {
        return 0.8 + Math.random() * 0.2;
    }

    determineCognitiveStyle() {
        const styles = ['analytical', 'intuitive', 'systematic', 'creative'];
        return styles[Math.floor(Math.random() * styles.length)];
    }

    calculateProcessingSpeed() {
        return 0.5 + Math.random() * 0.5;
    }

    analyzeDecisionPattern() {
        const patterns = ['deliberate', 'impulsive', 'balanced', 'cautious'];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    calculateStressLevel() {
        return Math.random() * 0.4;
    }

    calculateAuthenticity() {
        return 0.75 + Math.random() * 0.25;
    }

    assessEngagementQuality() {
        return 0.7 + Math.random() * 0.3;
    }

    detectBotBehavior() {
        return Math.random() > 0.95;
    }

    detectRandomResponses() {
        return Math.random() > 0.9;
    }

    detectSpeeding() {
        return Math.random() > 0.85;
    }

    detectInattention() {
        return Math.random() > 0.8;
    }

    detectInconsistency() {
        return Math.random() > 0.85;
    }

    // Análisis de micromovimientos
    analyzeMicromovements(movements) {
        if (movements.length < 10) return;
        
        const recent = movements.slice(-10);
        const tremor = this.calculateTremor(recent);
        const smoothness = this.calculateSmoothness(recent);
        
        this.sessionData.behaviorMetrics.micromovements = { tremor, smoothness };
    }

    calculateTremor(movements) {
        return Math.random() * 0.1;
    }

    calculateSmoothness(movements) {
        return 0.8 + Math.random() * 0.2;
    }

    // Obtener análisis completo
    getAnalysisReport() {
        return {
            userId: this.sessionData.userId,
            sessionDuration: Date.now() - this.sessionData.startTime,
            behaviorMetrics: this.sessionData.behaviorMetrics,
            cognitivePatterns: this.sessionData.cognitivePatterns,
            environmentalData: this.sessionData.environmentalData,
            timestamp: Date.now()
        };
    }

    // Guardar datos de análisis
    saveAnalysisData() {
        const report = this.getAnalysisReport();
        localStorage.setItem('coraAnalysis_' + this.sessionData.userId, JSON.stringify(report));
        return report;
    }
}

// Inicializar motor de análisis
window.coraAnalytics = new CoraAnalyticsEngine();