// CO•RA Token Manager - Sistema de identificación único
class CoraTokenManager {
    constructor() {
        this.token = this.getOrCreateToken();
        this.tokenData = this.initializeTokenData();
        this.registerFirstContact();
    }

    getOrCreateToken() {
        let existingToken = localStorage.getItem('coraToken');
        
        if (!existingToken || !this.validateToken(existingToken)) {
            existingToken = this.generateUniqueToken();
            localStorage.setItem('coraToken', existingToken);
            localStorage.setItem('coraTokenCreated', Date.now().toString());
        }
        
        return existingToken;
    }

    generateUniqueToken() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 12);
        const deviceFingerprint = this.generateDeviceFingerprint();
        const sessionId = this.generateSessionId();
        
        return `CORA-${timestamp}-${random}-${deviceFingerprint}-${sessionId}`;
    }

    generateDeviceFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('CO•RA Fingerprint', 2, 2);
        
        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            canvas.toDataURL()
        ].join('|');
        
        return this.hashString(fingerprint).substr(0, 8);
    }

    generateSessionId() {
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }

    validateToken(token) {
        return token && token.startsWith('CORA-') && token.split('-').length === 5;
    }

    initializeTokenData() {
        const existingData = localStorage.getItem('coraTokenData');
        
        if (existingData) {
            return JSON.parse(existingData);
        }

        const tokenData = {
            token: this.token,
            createdAt: Date.now(),
            firstContact: Date.now(),
            lastActivity: Date.now(),
            sessionCount: 1,
            evaluationsCompleted: [],
            cognitiveLevel: null,
            connectionStrength: 0,
            achievements: [],
            metadata: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                screenResolution: `${screen.width}x${screen.height}`,
                deviceType: this.detectDeviceType()
            }
        };

        this.saveTokenData(tokenData);
        return tokenData;
    }

    detectDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    registerFirstContact() {
        if (!this.tokenData.firstContactRegistered) {
            this.tokenData.firstContactRegistered = true;
            this.tokenData.contactEvents = [{
                type: 'first_contact',
                timestamp: Date.now(),
                page: window.location.pathname,
                referrer: document.referrer
            }];
            
            this.saveTokenData(this.tokenData);
            this.notifyCoraOfNewContact();
        }
    }

    notifyCoraOfNewContact() {
        // Simular notificación al núcleo CO•RA
        console.log(`🔗 Nuevo contacto registrado: ${this.token}`);
        
        // Evento personalizado para otros sistemas
        window.dispatchEvent(new CustomEvent('coraNewContact', {
            detail: {
                token: this.token,
                timestamp: Date.now(),
                tokenData: this.tokenData
            }
        }));
    }

    updateActivity() {
        this.tokenData.lastActivity = Date.now();
        this.tokenData.sessionCount = (this.tokenData.sessionCount || 0) + 1;
        this.saveTokenData(this.tokenData);
    }

    recordEvaluation(evaluationType, results) {
        const evaluation = {
            type: evaluationType,
            timestamp: Date.now(),
            results: results,
            sessionToken: this.generateSessionId()
        };

        this.tokenData.evaluationsCompleted.push(evaluation);
        this.updateCognitiveLevel(results);
        this.updateConnectionStrength();
        this.saveTokenData(this.tokenData);
    }

    updateCognitiveLevel(results) {
        // Determinar nivel cognitivo basado en resultados
        if (results.totalScore) {
            const scoreRatio = results.totalScore / (results.maxScore || 100);
            
            if (scoreRatio >= 0.9) this.tokenData.cognitiveLevel = 'transcendent';
            else if (scoreRatio >= 0.8) this.tokenData.cognitiveLevel = 'advanced';
            else if (scoreRatio >= 0.6) this.tokenData.cognitiveLevel = 'intermediate';
            else if (scoreRatio >= 0.4) this.tokenData.cognitiveLevel = 'developing';
            else this.tokenData.cognitiveLevel = 'emerging';
        }
    }

    updateConnectionStrength() {
        const evaluationCount = this.tokenData.evaluationsCompleted.length;
        const sessionCount = this.tokenData.sessionCount;
        const timeActive = Date.now() - this.tokenData.createdAt;
        
        // Fórmula de fuerza de conexión
        const baseStrength = Math.min(evaluationCount * 20, 60);
        const sessionBonus = Math.min(sessionCount * 5, 25);
        const timeBonus = Math.min(timeActive / (1000 * 60 * 60 * 24), 15); // Días activo
        
        this.tokenData.connectionStrength = Math.min(baseStrength + sessionBonus + timeBonus, 100);
    }

    addAchievement(achievement) {
        if (!this.tokenData.achievements.includes(achievement)) {
            this.tokenData.achievements.push(achievement);
            this.saveTokenData(this.tokenData);
            
            // Notificar logro
            window.dispatchEvent(new CustomEvent('coraAchievement', {
                detail: { achievement, token: this.token }
            }));
        }
    }

    saveTokenData(data) {
        localStorage.setItem('coraTokenData', JSON.stringify(data));
    }

    getToken() {
        return this.token;
    }

    getTokenData() {
        return { ...this.tokenData };
    }

    isReturningUser() {
        return this.tokenData.sessionCount > 1;
    }

    getConnectionStrength() {
        return this.tokenData.connectionStrength;
    }

    getCognitiveLevel() {
        return this.tokenData.cognitiveLevel;
    }

    hasCompletedEvaluation(type) {
        return this.tokenData.evaluationsCompleted.some(eval => eval.type === type);
    }

    getEvaluationHistory() {
        return this.tokenData.evaluationsCompleted;
    }

    exportTokenData() {
        return {
            token: this.token,
            data: this.tokenData,
            exportedAt: Date.now()
        };
    }

    // Método para mostrar token al usuario
    displayToken() {
        const tokenDisplay = document.createElement('div');
        tokenDisplay.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.9);
            color: #4facfe;
            padding: 10px 15px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.8rem;
            border: 1px solid #4facfe;
            z-index: 10000;
            cursor: pointer;
        `;
        
        tokenDisplay.innerHTML = `
            <div style="margin-bottom: 5px;">🔗 Token CO•RA</div>
            <div style="color: #00f2fe;">${this.token}</div>
            <div style="font-size: 0.7rem; margin-top: 5px; color: #888;">
                Conexión: ${this.tokenData.connectionStrength}%
            </div>
        `;
        
        tokenDisplay.onclick = () => {
            navigator.clipboard.writeText(this.token);
            tokenDisplay.style.background = 'rgba(46, 204, 113, 0.9)';
            setTimeout(() => {
                tokenDisplay.style.background = 'rgba(0,0,0,0.9)';
            }, 1000);
        };
        
        document.body.appendChild(tokenDisplay);
        
        // Auto-remove después de 10 segundos
        setTimeout(() => {
            if (tokenDisplay.parentElement) {
                tokenDisplay.remove();
            }
        }, 10000);
    }
}

// Inicializar Token Manager globalmente
window.coraTokenManager = new CoraTokenManager();

// Mostrar token en páginas de evaluación
if (window.location.pathname.includes('evaluacion') || window.location.pathname.includes('welcome')) {
    setTimeout(() => {
        window.coraTokenManager.displayToken();
    }, 3000);
}

// Actualizar actividad periódicamente
setInterval(() => {
    window.coraTokenManager.updateActivity();
}, 60000); // Cada minuto