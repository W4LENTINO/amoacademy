import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

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
    <>
      <Helmet>
        <title>Política de Cookies | AMOFARMA</title>
        <meta name="description" content="Política de cookies da Academia AMOFARMA" />
      </Helmet>

      <div className="bg-white min-h-screen py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
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

          {/* Content */}
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
                Como usamos cookies
              </h2>
              <p className="text-slate-600 mb-4">
                A AMOFARMA utiliza cookies para:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Cookies essenciais:</strong> Necessários para o funcionamento do site (autenticação, segurança)</li>
                <li><strong>Cookies de analytics:</strong> Ajudam-nos a entender como os visitantes interagem com o site</li>
                <li><strong>Cookies de marketing:</strong> Utilizados para mostrar anúncios relevantes</li>
                <li><strong>Cookies de preferências:</strong> Lembram as suas escolhas (idioma, região)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                Tipos de cookies que utilizamos
              </h2>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-[#1a1a3a] mb-3">Cookies Essenciais</h3>
                  <p className="text-slate-600 mb-3">
                    Estes cookies são necessários para o funcionamento do site e não podem ser desativados.
                  </p>
                  <table className="w-full text-sm">
                    <thead className="bg-[#1a1a3a] text-white">
                      <tr>
                        <th className="p-3 text-left">Nome</th>
                        <th className="p-3 text-left">Finalidade</th>
                        <th className="p-3 text-left">Duração</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3">session_id</td>
                        <td className="p-3">Manter sessão do utilizador</td>
                        <td className="p-3">Sessão</td>
                      </tr>
                      <tr>
                        <td className="p-3">csrf_token</td>
                        <td className="p-3">Proteção contra CSRF</td>
                        <td className="p-3">1 hora</td>
                      </tr>
                      <tr>
                        <td className="p-3">auth_token</td>
                        <td className="p-3">Autenticação do utilizador</td>
                        <td className="p-3">7 dias</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-[#1a1a3a] mb-3">Cookies de Analytics</h3>
                  <p className="text-slate-600 mb-3">
                    Ajudam-nos a melhorar o site através da análise de como os utilizadores interagem.
                  </p>
                  <table className="w-full text-sm">
                    <thead className="bg-[#1a1a3a] text-white">
                      <tr>
                        <th className="p-3 text-left">Nome</th>
                        <th className="p-3 text-left">Finalidade</th>
                        <th className="p-3 text-left">Duração</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3">_ga</td>
                        <td className="p-3">Google Analytics - distinguir utilizadores</td>
                        <td className="p-3">2 anos</td>
                      </tr>
                      <tr>
                        <td className="p-3">_gid</td>
                        <td className="p-3">Google Analytics - distinguir utilizadores</td>
                        <td className="p-3">24 horas</td>
                      </tr>
                      <tr>
                        <td className="p-3">_gat</td>
                        <td className="p-3">Limitar taxa de pedidos</td>
                        <td className="p-3">1 minuto</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-[#1a1a3a] mb-3">Cookies de Marketing</h3>
                  <p className="text-slate-600 mb-3">
                    Utilizados para mostrar anúncios relevantes e medir a eficácia das campanhas.
                  </p>
                  <table className="w-full text-sm">
                    <thead className="bg-[#1a1a3a] text-white">
                      <tr>
                        <th className="p-3 text-left">Nome</th>
                        <th className="p-3 text-left">Finalidade</th>
                        <th className="p-3 text-left">Duração</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3">_fbp</td>
                        <td className="p-3">Facebook Pixel</td>
                        <td className="p-3">3 meses</td>
                      </tr>
                      <tr>
                        <td className="p-3">_gcl_au</td>
                        <td className="p-3">Google Ads</td>
                        <td className="p-3">3 meses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-[#1a1a3a]">Cookies de Marketing</p>
                      <p className="text-sm text-slate-500">Para anúncios personalizados</p>
                    </div>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        preferences.marketing ? 'bg-[#e84c5c] justify-end' : 'bg-slate-300 justify-start'
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
                  <button
                    onClick={rejectAll}
                    className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Rejeitar Todos
                  </button>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                Cookies de terceiros
              </h2>
              <p className="text-slate-600 mb-4">
                Alguns cookies são colocados por serviços de terceiros que utilizamos:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Google Analytics:</strong> Análise de tráfego</li>
                <li><strong>Google reCAPTCHA:</strong> Proteção contra bots</li>
                <li><strong>Facebook Pixel:</strong> Marketing e análises</li>
                <li><strong>Hotjar:</strong> Análise de comportamento do utilizador</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                Como controlar cookies no seu navegador
              </h2>
              <p className="text-slate-600 mb-4">
                Pode controlar e/ou eliminar cookies através das configurações do seu navegador:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Google Chrome:</strong> Configurações → Privacidade e segurança → Cookies</li>
                <li><strong>Mozilla Firefox:</strong> Opções → Privacidade e Segurança → Cookies</li>
                <li><strong>Safari:</strong> Preferências → Privacidade → Cookies</li>
                <li><strong>Microsoft Edge:</strong> Configurações → Cookies e permissões do site</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                Contacto
              </h2>
              <p className="text-slate-600">
                Para questões relacionadas com cookies, contacte-nos através do email{' '}
                <a href="mailto:privacidade@amofarma.ao" className="text-[#e84c5c] hover:text-[#1a1a3a]">
                  privacidade@amofarma.ao
                </a>
              </p>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-slate-200 text-center space-x-6">
            <Link to="/privacidade" className="text-slate-500 hover:text-[#e84c5c] transition-colors">
              Política de Privacidade
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/termos" className="text-slate-500 hover:text-[#e84c5c] transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>

      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl p-6 z-50 animate-reveal">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-[#1a1a3a] mb-2">🍪 Este site utiliza cookies</h3>
              <p className="text-slate-600 text-sm">
                Utilizamos cookies para melhorar a sua experiência, analisar o tráfego e personalizar conteúdo.
                <Link to="/cookies" className="text-[#e84c5c] hover:text-[#1a1a3a] ml-1">
                  Saiba mais
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={rejectAll}
                className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                Rejeitar
              </button>
              <button
                onClick={savePreferences}
                className="px-6 py-2 bg-[#1a1a3a] hover:bg-[#e84c5c] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Preferências
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2 bg-[#e84c5c] hover:bg-[#1a1a3a] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cookies;