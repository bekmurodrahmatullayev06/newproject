import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { PortalPages } from './pages/PortalPages';
import type { PortalSection } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PortalSection>('dashboard');

  return (
    <div className="flex min-h-screen flex-col bg-[#09090B] lg:flex-row">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header activeTab={activeTab} />
        <main className="flex-1">
          {activeTab === 'dashboard' ? (
            <Dashboard />
          ) : (
            <PortalPages section={activeTab} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
