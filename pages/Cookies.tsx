import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';

const Cookies: React.FC = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
  };

  const acceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true };
    setPreferences(all);
    localStorage.setItem('cookieConsent', JSON.stringify(all));
    setShowBanner(false);
  };

  const rejectAll = () => {
    const necessary = { necessary: true, analytics: false, marketing: false };
    setPreferences(necessary);
    localStorage.setItem('cookieConsent', JSON.stringify(necessary));
    setShowBanner(false);
  };

  return (
    <div className="bg-white min-h-screen py-16 lg:py-24">
      <SEO title="Política de Cookies" description="Gestão de cookies e preferências de privacidade na AMOFARMA." />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-[#e84c5c] rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
            AMF
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a3a] mb-4">
            Política de Cookies
          </h1>
          <p className="text-slate-500 text-lg">
            Última atualização: 14 de Fevereiro de 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
              O que são cookies?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um site. 
              Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente, 
              bem como para fornecer informações aos proprietários do site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
              Gerir as suas preferências
            </h2>
            
            <div className="bg-white border border-slate-200 rounded-xl p-8 mb-6">
              <h3 className="text-xl font-bold text-[#1a1a3a] mb-6">Configuração de Cookies</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-[#1a1a3a]">Cookies Essenciais</p>
                    <p className="text-sm text-slate-500">Necessários para o funcionamento do site</p>
                  </div>
                  <div className="w-12 h-6 bg-[#1a1a3a] rounded-full flex items-center justify-end px-1 opacity-50 cursor-not-allowed">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-[#1a1a3a]">Cookies de Analytics</p>
                    <p className="text-sm text-slate-500">Ajudam-nos a melhorar o site</p>
                  </div>
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.analytics ? 'bg-[#e84c5c] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={savePreferences}
                  className="bg-[#e84c5c] hover:bg-[#1a1a3a] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Guardar Preferências
                </button>
                <button
                  onClick={acceptAll}
                  className="bg-[#1a1a3a] hover:bg-[#e84c5c] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Aceitar Todos
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl p-6 z-50 animate-reveal">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-[#1a1a3a] mb-2">🍪 Este site utiliza cookies</h3>
              <p className="text-slate-600 text-sm">
                Utilizamos cookies para melhorar a sua experiência.
                <Link to="/cookies" className="text-[#e84c5c] hover:text-[#1a1a3a] ml-1">
                  Saiba mais
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={rejectAll} className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors">Rejeitar</button>
              <button onClick={acceptAll} className="px-6 py-2 bg-[#e84c5c] hover:bg-[#1a1a3a] text-white rounded-lg text-sm font-medium transition-colors">Aceitar Todos</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cookies;