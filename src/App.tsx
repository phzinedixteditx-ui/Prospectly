import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LeadsProvider } from './context/LeadsContext';
import { BuilderProvider } from './context/BuilderContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SearchPage } from './pages/SearchPage';
import { LeadsPage } from './pages/LeadsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BuilderPage } from './pages/BuilderPage';
import { PublicSitePage } from './pages/PublicSitePage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { PricingPage } from './pages/PricingPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  // Check if URL has ?demo=slug query param
  const urlParams = new URLSearchParams(window.location.search);
  const demoParam = urlParams.get('demo');

  const [currentPage, setCurrentPage] = useState<string>(
    demoParam ? 'public-demo' : (isAuthenticated ? 'dashboard' : 'landing')
  );
  const [navigationData, setNavigationData] = useState<any>(
    demoParam ? { slug: demoParam } : null
  );

  const navigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setNavigationData(data || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated full-screen public demo mode
  if (currentPage === 'public-demo') {
    return <PublicSitePage slug={navigationData?.slug || demoParam} onNavigate={navigate} />;
  }


  // Builder Page has its own full layout
  if (currentPage === 'builder') {
    return (
      <div className="min-h-screen flex flex-col bg-[#090a0f]">
        <Navbar onNavigate={navigate} currentPage={currentPage} />
        <main className="flex-1">
          <BuilderPage siteId={navigationData?.siteId} onNavigate={navigate} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100">
      <Navbar onNavigate={navigate} currentPage={currentPage} />

      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
        {currentPage === 'login' && <LoginPage onNavigate={navigate} />}
        {currentPage === 'register' && <RegisterPage onNavigate={navigate} />}
        {currentPage === 'onboarding' && <OnboardingPage onNavigate={navigate} />}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={navigate} />}
        {currentPage === 'search' && <SearchPage onNavigate={navigate} />}
        {currentPage === 'projects' && <ProjectsPage onNavigate={navigate} />}
        {currentPage === 'leads' && <LeadsPage onNavigate={navigate} />}
        {currentPage === 'subscription' && <SubscriptionPage onNavigate={navigate} />}
        {currentPage === 'pricing' && <PricingPage onNavigate={navigate} />}
      </main>


      {currentPage !== 'onboarding' && <Footer onNavigate={navigate} />}
    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LeadsProvider>
          <BuilderProvider>
            <AppContent />
          </BuilderProvider>
        </LeadsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
