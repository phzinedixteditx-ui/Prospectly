import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LeadsProvider } from './context/LeadsContext';
import { BuilderProvider } from './context/BuilderContext';
import { ToastProvider, useToast } from './context/ToastContext';
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
  const { isAuthenticated, user, changePlan } = useAuth();
  const toast = useToast();
  
  // Check if URL has ?site=slug, ?p=slug or ?demo=slug query param
  const urlParams = new URLSearchParams(window.location.search);
  const siteParam = urlParams.get('site') || urlParams.get('p') || urlParams.get('demo') || (window.location.pathname.startsWith('/site/') ? window.location.pathname.replace('/site/', '') : null);

  const [currentPage, setCurrentPage] = useState<string>(
    siteParam ? 'public-site' : (isAuthenticated ? 'dashboard' : 'landing')
  );
  const [navigationData, setNavigationData] = useState<any>(
    siteParam ? { slug: siteParam } : null
  );

  useEffect(() => {
    const paymentStatus = urlParams.get('payment');
    const planParam = urlParams.get('plan') as any;

    if (paymentStatus === 'success' && planParam) {
      changePlan(planParam);
      toast.success(`🎉 Pagamento confirmado na Stripe! Seu plano ${planParam.toUpperCase()} foi ativado com sucesso.`);
      window.history.replaceState({}, document.title, window.location.pathname);
      setCurrentPage('dashboard');
    } else if (paymentStatus === 'canceled') {
      toast.info('Checkout na Stripe cancelado.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const navigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setNavigationData(data || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated full-screen public site mode (professional, without "demo" in URL)
  if (currentPage === 'public-site' || currentPage === 'public-demo') {
    return <PublicSitePage slug={navigationData?.slug || siteParam} onNavigate={navigate} />;
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
