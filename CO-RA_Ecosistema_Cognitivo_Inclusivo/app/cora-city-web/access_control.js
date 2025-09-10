/**
 * CO•RA Access Control System
 * Protocolos de seguridad y control de acceso
 */

class CoraAccessControl {
    constructor() {
        this.securityLevel = 'MAXIMUM';
        this.protectedSpaces = [
            '/CORA_CITY_WEB/',
            '/welcome/',
            '/evaluador_automatico_cora.html',
            '/cora_auto_evaluator.js'
        ];
        this.authorizedTokens = new Set();
        this.accessAttempts = new Map();
        this.init();
    }

    init() {
        this.activateProtection();
        this.monitorAccess();
        this.blockUnauthorized();
    }

    activateProtection() {
        // Bloqueo de herramientas de desarrollo
        document.addEventListener('keydown', (e) => {
            if (this.isDevToolsAttempt(e)) {
                e.preventDefault();
                this.logSecurityEvent('DEV_TOOLS_BLOCKED');
                this.showSecurityAlert('🔒 HERRAMIENTAS DE DESARROLLO BLOQUEADAS');
            }
        });

        // Bloqueo de menú contextual
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.logSecurityEvent('CONTEXT_MENU_BLOCKED');
            this.showSecurityAlert('🛡️ MENÚ CONTEXTUAL DESHABILITADO');
        });

        // Protección contra selección de texto
        document.addEventListener('selectstart', (e) => {
            if (this.isProtectedContent(e.target)) {
                e.preventDefault();
            }
        });
    }

    isDevToolsAttempt(e) {
        return (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'U')
        );
    }

    monitorAccess() {
        // Monitoreo de intentos de acceso
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.validateNewContent(mutation.addedNodes);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    blockUnauthorized() {
        // Verificar autorización en carga de página
        if (!this.isAuthorized()) {
            this.redirectToSecurityGateway();
        }
    }

    isAuthorized() {
        const token = localStorage.getItem('cora_auth_token');
        const nucleusApproval = localStorage.getItem('nucleus_approval');
        
        return token && nucleusApproval && this.authorizedTokens.has(token);
    }

    grantAccess(token) {
        this.authorizedTokens.add(token);
        localStorage.setItem('cora_auth_token', token);
        localStorage.setItem('nucleus_approval', 'true');
        this.logSecurityEvent('ACCESS_GRANTED', { token });
    }

    revokeAccess(token) {
        this.authorizedTokens.delete(token);
        localStorage.removeItem('cora_auth_token');
        localStorage.removeItem('nucleus_approval');
        this.logSecurityEvent('ACCESS_REVOKED', { token });
    }

    redirectToSecurityGateway() {
        if (!window.location.pathname.includes('security_gateway.html')) {
            window.location.href = '/CORA_CITY_WEB/security_gateway.html';
        }
    }

    logSecurityEvent(event, data = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event,
            data,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.warn('🔒 SECURITY EVENT:', logEntry);
        
        // Almacenar en localStorage para análisis
        const logs = JSON.parse(localStorage.getItem('cora_security_logs') || '[]');
        logs.push(logEntry);
        localStorage.setItem('cora_security_logs', JSON.stringify(logs.slice(-100)));
    }

    showSecurityAlert(message) {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255,0,0,0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 10000;
            font-family: 'Courier New', monospace;
            border: 2px solid #ff0000;
            box-shadow: 0 0 20px #ff0000;
        `;
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 3000);
    }

    isProtectedContent(element) {
        return element.closest('.protected-content') !== null;
    }

    validateNewContent(nodes) {
        nodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                // Verificar contenido sospechoso
                if (this.containsSuspiciousContent(node)) {
                    this.logSecurityEvent('SUSPICIOUS_CONTENT_DETECTED');
                    node.remove();
                }
            }
        });
    }

    containsSuspiciousContent(element) {
        const suspiciousPatterns = [
            /eval\(/,
            /document\.write/,
            /innerHTML\s*=/,
            /script/i
        ];
        
        return suspiciousPatterns.some(pattern => 
            pattern.test(element.outerHTML || element.textContent)
        );
    }

    // Método para autorización desde el núcleo
    nucleusAuthorization(evaluationResults) {
        if (this.validateNucleusResults(evaluationResults)) {
            const token = this.generateSecureToken();
            this.grantAccess(token);
            return token;
        }
        return null;
    }

    validateNucleusResults(results) {
        return results && 
               results.authenticity >= 70 && 
               results.intention === 'genuine' &&
               results.readiness >= 60;
    }

    generateSecureToken() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2);
        const hash = btoa(`cora_${timestamp}_${random}`);
        return hash;
    }

    // Emergencia: desactivar protección
    emergencyDisable(adminCode) {
        if (adminCode === 'CORA_EMERGENCY_2024') {
            this.securityLevel = 'DISABLED';
            this.logSecurityEvent('EMERGENCY_DISABLE');
            console.warn('🚨 PROTECCIÓN DE EMERGENCIA DESACTIVADA');
            return true;
        }
        return false;
    }
}

// Inicializar control de acceso
const coraAccessControl = new CoraAccessControl();

// Exportar para uso global
window.coraAccessControl = coraAccessControl;