import React from 'react';
import EvaluationIcon from './icons/EvaluationIcon';
import TrafficIcon from './icons/TrafficIcon';
import SOSIcon from './icons/SOSIcon';
import MapIcon from './icons/MapIcon';

interface LandingPageProps {
    onShowAuth: () => void;
}

const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 600);
};


const LandingPage: React.FC<LandingPageProps> = ({ onShowAuth }) => {
    return (
        <div className="min-h-screen w-full bg-gray-900 text-white font-sans">
            {/* Hero Section */}
            <div className="relative h-screen flex flex-col items-center justify-center text-center p-4">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30" 
                    style={{backgroundImage: "url('https://picsum.photos/seed/mexico-road/1920/1080')"}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900"></div>

                <header className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Asistente Vial <span className="text-amber-400">México</span></h1>
                    <button 
                        onClick={onShowAuth} 
                        onMouseDown={handleMouseDown}
                        className="bg-amber-500 text-gray-900 font-bold py-2 px-5 rounded-md hover:bg-amber-400 transition-colors ripple-effect"
                    >
                        Acceder
                    </button>
                </header>

                <main className="relative z-10">
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                        El Copiloto Inteligente que <br />
                        <span className="text-amber-400">Transforma tu Viaje</span>
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
                        Navegación en tiempo real, asistencia por IA y seguridad proactiva en las carreteras de México.
                    </p>
                    <div className="mt-8">
                        <button 
                            onClick={onShowAuth}
                            onMouseDown={handleMouseDown}
                            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 ripple-effect"
                        >
                            Crear Cuenta Gratis
                        </button>
                    </div>
                </main>
            </div>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold mb-3">Todo lo que necesitas en el camino</h3>
                    <p className="text-gray-400 mb-12">Desde diagnósticos mecánicos hasta alertas de tráfico, te tenemos cubierto.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-sky-500 transition-colors">
                            <div className="w-16 h-16 mx-auto mb-4 text-sky-400"><EvaluationIcon /></div>
                            <h4 className="font-bold text-xl mb-2">Asistencia con IA</h4>
                            <p className="text-gray-400 text-sm">Resuelve problemas mecánicos, busca refacciones y obtén reportes de tráfico con nuestro asistente inteligente.</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
                            <div className="w-16 h-16 mx-auto mb-4 text-green-400"><MapIcon /></div>
                            <h4 className="font-bold text-xl mb-2">Mapa Interactivo</h4>
                            <p className="text-gray-400 text-sm">Encuentra servicios, planifica rutas con múltiples paradas y visualiza tu viaje en tiempo real.</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-colors">
                            <div className="w-16 h-16 mx-auto mb-4 text-red-400"><SOSIcon className="w-16 h-16" /></div>
                            <h4 className="font-bold text-xl mb-2">Botón de Pánico</h4>
                            <p className="text-gray-400 text-sm">En caso de emergencia, activa la alerta SOS para recibir instrucciones y notificar a los servicios de ayuda.</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors">
                             <div className="w-16 h-16 mx-auto mb-4 text-orange-400"><TrafficIcon /></div>
                            <h4 className="font-bold text-xl mb-2">Alertas de Riesgo</h4>
                            <p className="text-gray-400 text-sm">Visualiza zonas de alta accidentabilidad y recibe notificaciones proactivas sobre peligros en tu ruta.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Final CTA Section */}
            <section className="py-20 bg-gray-800/30">
                 <div className="container mx-auto px-6 text-center">
                    <h3 className="text-4xl font-extrabold text-white">¿Listo para conducir con más seguridad?</h3>
                    <p className="text-gray-300 mt-4 mb-8">Únete a miles de conductores que confían en Asistente Vial México.</p>
                    <button 
                        onClick={onShowAuth}
                        onMouseDown={handleMouseDown}
                        className="bg-amber-500 text-gray-900 font-bold py-4 px-10 text-lg rounded-lg hover:bg-amber-400 transition-transform transform hover:scale-105 ripple-effect"
                    >
                        Comenzar Ahora
                    </button>
                 </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-6">
                <div className="container mx-auto px-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Asistente Vial México. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
