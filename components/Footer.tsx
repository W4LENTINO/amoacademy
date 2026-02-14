import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { name: 'LinkedIn', url: '#', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'Facebook', url: '#', path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
    { name: 'Instagram', url: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }
  ];

  return (
    <footer className="bg-[#1a1a3a] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Coluna 1: Identidade */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-[#e84c5c] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-2xl group-hover:scale-105 transition-transform">AMF</div>
              <span className="font-bold text-2xl tracking-tighter uppercase">AMOFARMA</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed italic opacity-80">
              "Fazendo a Diferença a Cada Dose". A instituição angolana de referência para a capacitação farmacêutica avançada e estratégica.
            </p>
            <div className="flex space-x-5">
              {socialIcons.map(icon => (
                <a key={icon.name} href={icon.url} className="w-10 h-10 bg-white/5 hover:bg-[#e84c5c] rounded-xl flex items-center justify-center transition-all group" aria-label={icon.name}>
                  <svg className="w-5 h-5 fill-slate-400 group-hover:fill-white" viewBox="0 0 24 24"><path d={icon.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#e84c5c]">Ecosistema Académico</h4>
            <ul className="space-y-5 text-slate-400 text-sm font-medium">
              <li><Link to="/cursos" className="hover:text-white transition-colors">Oferta Formativa</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Insights Técnicos</Link></li>
              <li><Link to="/validar" className="hover:text-white transition-colors">Validar Diploma</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">Nossa Identidade</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Suporte */}
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#e84c5c]">Canais Oficiais</h4>
            <ul className="space-y-5 text-slate-400 text-sm font-medium">
              <li className="flex items-start space-x-3">
                <span className="text-lg">📧</span>
                <a href="mailto:cursos@amofarma.ao" className="hover:text-white transition-colors break-all">cursos@amofarma.ao</a>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-lg">📞</span>
                <div className="space-y-1">
                  <a href="tel:+244943574878" className="hover:text-white transition-colors block">+244 943 574 878</a>
                  <a href="tel:+244951005363" className="hover:text-white transition-colors block">+244 951 005 363</a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-lg">📍</span>
                <span>Av. Pedro Castro Van-Dunem Loy, Luanda</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Segurança */}
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-[#e84c5c]">Conformidade & Rigor</h4>
            <div className="space-y-6">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 shadow-inner">
                <p className="text-[9px] font-black text-slate-500 uppercase mb-3 tracking-widest">Protocolo de Segurança</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">SSL Secure</span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase">AES-256</span>
                </div>
              </div>
              <ul className="text-[9px] font-black text-slate-500 uppercase tracking-widest space-y-3">
                <li><Link to="/privacidade" className="hover:text-white">Privacidade</Link> • <Link to="/termos" className="hover:text-white">Termos de Uso</Link></li>
                <li className="text-[#e84c5c] flex items-center">
                   <span className="w-1.5 h-1.5 bg-[#e84c5c] rounded-full mr-2"></span>
                   Inscrita na ARMED
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] text-center md:text-left">
            &copy; {currentYear} Academia AMOFARMA. Direitos Reservados. Centro de Excelência Científica.
          </p>
          <div className="flex items-center space-x-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
             <div className="bg-white text-[#1a1a3a] px-2 py-1 rounded text-[8px] font-black">VISA</div>
             <div className="bg-white text-[#1a1a3a] px-2 py-1 rounded text-[8px] font-black">MCX</div>
             <div className="bg-white text-[#1a1a3a] px-2 py-1 rounded text-[8px] font-black">EXP</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;