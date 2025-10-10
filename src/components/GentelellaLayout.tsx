import React, { ReactNode } from 'react';

interface GentelellaLayoutProps {
  title: string;
  children: ReactNode;
}

const GentelellaLayout: React.FC<GentelellaLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-800 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🚗</span>
              <h1 className="text-xl font-semibold text-white">{title}</h1>
            </div>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default GentelellaLayout;
