// CO•RA Level Detector - Identificación automática del nivel del usuario
class CoraLevelDetector {
    constructor() {
        this.userLevel = null;
        this.confidence = 0;
        this.detectionMetrics = {};
        this.redirectionRules = {
            'novice': 'evaluacion_guiada.html',
            'basic': 'evaluacion_basica.html', 
            'intermediate': 'evaluacion_intermedia.html',
            'advanced': 'evaluacion_profunda.html',
            'expert': 'evaluacion_completa.html'
        };
        this.startDetection();
    }

    startDetection() {
        // Detección inmediata basada en comportamiento inicial
        setTimeout(() => this.quickAssessment(), 2000);
        
        // Detección continua durante navegación
        this.setupContinuousDetection();
        
        // Detección basada en interacciones
        this.setupInteractionDetection();
    }

    quickAssessment() {
        const metrics = {
            mouseSpeed: this.analyzeMouseSpeed(),
            scrollPattern: this.analyzeScrollPattern(),
            deviceType: this.getDeviceType(),
            browserAdvanced: this.detectAdvancedBrowser(),
            timeOnPage: Date.now() - window.pageLoadTime
        };

        this.detectionMetrics.quick = metrics;
        this.calculateInitialLevel(metrics);
    }

    analyzeMouseSpeed() {
        if (!window.coraAnalytics) return 0.5;
        const movements = window.coraAnalytics.sessionData.behaviorMetrics.mouse?.movements || [];
        if (movements.length < 5) return 0.5;
        
        const avgVelocity = movements.reduce((sum, m) => sum + (m.velocity || 0), 0) / movements.length;
        return Math.min(avgVelocity / 100, 1);
    }

    analyzeScrollPattern() {
        if (!window.coraAnalytics) return 0.5;
        const scrollData = window.coraAnalytics.sessionData.behaviorMetrics.scroll?.patterns || [];
        
        // Usuarios avanzados tienden a hacer scroll más deliberado
        const deliberateScrolling = scrollData.filter(s => s.direction === 'down').length / Math.max(scrollData.length, 1);
        return deliberateScrolling;
    }

    getDeviceType() {
        const width = window.innerWidth;
        if (width >= 1920) return 1.0; // Desktop avanzado
        if (width >= 1024) return 0.8; // Desktop/laptop
        if (width >= 768) return 0.6;  // Tablet
        return 0.4; // Mobile
    }

    detectAdvancedBrowser() {
        const ua = navigator.userAgent;
        const advanced = /Chrome|Firefox|Safari|Edge/.test(ua) && !/Mobile/.test(ua);
        return advanced ? 0.8 : 0.4;
    }

    calculateInitialLevel(metrics) {
        const score = (
            metrics.mouseSpeed * 0.3 +
            metrics.scrollPattern * 0.2 +
            metrics.deviceType * 0.2 +
            metrics.browserAdvanced * 0.2 +
            (metrics.timeOnPage > 10000 ? 0.1 : 0) // Tiempo de reflexión
        );

        if (score >= 0.8) {
            this.userLevel = 'expert';
            this.confidence = 0.7;
        } else if (score >= 0.6) {
            this.userLevel = 'advanced';
            this.confidence = 0.6;
        } else if (score >= 0.4) {
            this.userLevel = 'intermediate';
            this.confidence = 0.5;
        } else if (score >= 0.2) {
            this.userLevel = 'basic';
            this.confidence = 0.4;
        } else {
            this.userLevel = 'novice';
            this.confidence = 0.6;
        }

        this.detectionMetrics.initialScore = score;
    }

    setupContinuousDetection() {
        setInterval(() => {
            this.updateLevelAssessment();
        }, 5000);
    }

    setupInteractionDetection() {
        // Detectar interacciones con elementos avanzados
        document.addEventListener('click', (e) => {
            this.analyzeClickBehavior(e);
        });

        // Detectar uso de teclado avanzado
        document.addEventListener('keydown', (e) => {
            this.analyzeKeyboardUsage(e);
        });

        // Detectar patrones de lectura
        document.addEventListener('scroll', () => {
            this.analyzeReadingPattern();
        });
    }

    analyzeClickBehavior(event) {
        const target = event.target;
        const isAdvancedElement = target.matches('.eval-card, .test-card, .option, button[data-test]');
        
        if (isAdvancedElement) {
            this.detectionMetrics.advancedClicks = (this.detectionMetrics.advancedClicks || 0) + 1;
            
            // Usuarios avanzados tienden a hacer clic más precisamente
            const precision = this.calculateClickPrecision(event, target);
            this.detectionMetrics.clickPrecision = (this.detectionMetrics.clickPrecision || 0) + precision;
        }
    }

    calculateClickPrecision(event, target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(event.clientX - centerX, 2) + 
            Math.pow(event.clientY - centerY, 2)
        );
        
        return Math.max(0, 1 - (distance / 100));
    }

    analyzeKeyboardUsage(event) {
        // Detectar uso de atajos avanzados
        const advancedKeys = ['F12', 'F5', 'Tab', 'Escape'];
        const modifierCombos = event.ctrlKey || event.altKey || event.metaKey;
        
        if (advancedKeys.includes(event.key) || modifierCombos) {
            this.detectionMetrics.advancedKeyboard = (this.detectionMetrics.advancedKeyboard || 0) + 1;
        }
    }

    analyzeReadingPattern() {
        const scrollSpeed = window.scrollY - (this.lastScrollY || 0);
        this.lastScrollY = window.scrollY;
        
        // Usuarios avanzados tienden a leer más deliberadamente
        if (Math.abs(scrollSpeed) < 50) {
            this.detectionMetrics.deliberateReading = (this.detectionMetrics.deliberateReading || 0) + 1;
        }
    }

    updateLevelAssessment() {
        if (!this.detectionMetrics.quick) return;

        const behaviorScore = this.calculateBehaviorScore();
        const interactionScore = this.calculateInteractionScore();
        const timeScore = this.calculateTimeScore();

        const totalScore = (
            this.detectionMetrics.initialScore * 0.4 +
            behaviorScore * 0.3 +
            interactionScore * 0.2 +
            timeScore * 0.1
        );

        const newLevel = this.scoreToLevel(totalScore);
        const newConfidence = this.calculateConfidence(totalScore);

        if (newConfidence > this.confidence) {
            this.userLevel = newLevel;
            this.confidence = newConfidence;
        }
    }

    calculateBehaviorScore() {
        if (!window.coraAnalytics) return 0.5;
        
        const profile = window.coraAnalytics.sessionData.cognitivePatterns.profile || {};
        return (
            (profile.processingSpeed || 0.5) * 0.4 +
            (profile.authenticityLevel || 0.5) * 0.3 +
            (profile.engagementQuality || 0.5) * 0.3
        );
    }

    calculateInteractionScore() {
        const metrics = this.detectionMetrics;
        return (
            Math.min((metrics.advancedClicks || 0) / 10, 1) * 0.4 +
            Math.min((metrics.clickPrecision || 0) / 5, 1) * 0.3 +
            Math.min((metrics.advancedKeyboard || 0) / 3, 1) * 0.2 +
            Math.min((metrics.deliberateReading || 0) / 20, 1) * 0.1
        );
    }

    calculateTimeScore() {
        const timeOnPage = Date.now() - (window.pageLoadTime || Date.now());
        
        // Usuarios avanzados tienden a tomar más tiempo para evaluar opciones
        if (timeOnPage > 30000) return 0.8;
        if (timeOnPage > 15000) return 0.6;
        if (timeOnPage > 5000) return 0.4;
        return 0.2;
    }

    scoreToLevel(score) {
        if (score >= 0.8) return 'expert';
        if (score >= 0.65) return 'advanced';
        if (score >= 0.45) return 'intermediate';
        if (score >= 0.25) return 'basic';
        return 'novice';
    }

    calculateConfidence(score) {
        const sessionLength = Date.now() - (window.pageLoadTime || Date.now());
        const baseConfidence = Math.min(score, 0.9);
        const timeBonus = Math.min(sessionLength / 60000, 0.2); // Max 0.2 bonus after 1 minute
        
        return Math.min(baseConfidence + timeBonus, 0.95);
    }

    shouldRedirect() {
        return this.confidence > 0.7 && this.userLevel !== null;
    }

    getRecommendedEvaluation() {
        return this.redirectionRules[this.userLevel] || 'evaluacion_basica.html';
    }

    autoRedirect() {
        if (this.shouldRedirect()) {
            const recommended = this.getRecommendedEvaluation();
            const currentPage = window.location.pathname.split('/').pop();
            
            if (currentPage === 'selector_evaluacion.html' && recommended !== currentPage) {
                this.showRedirectionSuggestion(recommended);
            }
        }
    }

    showRedirectionSuggestion(recommendedUrl) {
        const suggestion = document.createElement('div');
        suggestion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: #000;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(79, 172, 254, 0.3);
            z-index: 10000;
            font-family: Arial, sans-serif;
            max-width: 300px;
            animation: slideIn 0.5s ease-out;
        `;

        suggestion.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">🎯 Recomendación CO•RA</div>
            <div style="font-size: 0.9rem; margin-bottom: 12px;">
                Basándome en tu comportamiento, recomiendo: <strong>${this.getLevelName()}</strong>
            </div>
            <button onclick="location.href='${recommendedUrl}'" style="
                background: #000;
                color: #fff;
                border: none;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                margin-right: 10px;
            ">Ir ahora</button>
            <button onclick="this.parentElement.remove()" style="
                background: transparent;
                color: #000;
                border: 1px solid #000;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
            ">Después</button>
        `;

        document.body.appendChild(suggestion);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (suggestion.parentElement) {
                suggestion.remove();
            }
        }, 10000);
    }

    getLevelName() {
        const names = {
            'novice': 'Evaluación Guiada',
            'basic': 'Evaluación Básica',
            'intermediate': 'Evaluación Intermedia', 
            'advanced': 'Evaluación Profunda',
            'expert': 'Batería Completa'
        };
        return names[this.userLevel] || 'Evaluación Básica';
    }

    getDetectionReport() {
        return {
            level: this.userLevel,
            confidence: this.confidence,
            recommendedEvaluation: this.getRecommendedEvaluation(),
            metrics: this.detectionMetrics,
            timestamp: Date.now()
        };
    }
}

// Inicializar detector de nivel
window.pageLoadTime = Date.now();
window.coraLevelDetector = new CoraLevelDetector();

// Auto-redirección después de 15 segundos si hay alta confianza
setTimeout(() => {
    if (window.coraLevelDetector.shouldRedirect()) {
        window.coraLevelDetector.autoRedirect();
    }
}, 15000);