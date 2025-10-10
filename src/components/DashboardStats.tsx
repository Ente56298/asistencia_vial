import React from 'react';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Usuarios Activos</h3>
        <p className="text-3xl font-bold text-gray-900">1,234</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Emergencias Hoy</h3>
        <p className="text-3xl font-bold text-gray-900">45</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Tiempo Respuesta</h3>
        <p className="text-3xl font-bold text-gray-900">12 min</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Satisfacción</h3>
        <p className="text-3xl font-bold text-gray-900">4.8/5</p>
      </div>
    </div>
  );
};

export default DashboardStats;
