import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+244943574878';
  const message = 'Olá! Gostaria de mais informações sobre os cursos da AMOFARMA.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Falar no WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25 group-hover:opacity-30"></div>
        
        <div className="relative bg-[#25D366] hover:bg-[#128C7E] text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 duration-300 cursor-pointer">
          <svg 
            className="w-8 h-8" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.93 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.772zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.447-1.273.607-1.446c.16-.173.346-.216.462-.216l.332.006c.106.004.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.18-.076.354.101.174.449.742.964 1.201.662.591 1.221.774 1.394.86.173.087.274.072.374-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087.159.058 1.003.473 1.175.559.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
          </svg>
        </div>

        <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-slate-800 px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-slate-100 pointer-events-none">
          <span className="text-sm font-medium">Falar no WhatsApp</span>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-r border-t border-slate-100 rotate-45"></div>
        </div>

        <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
      </div>
    </a>
  );
};

export default WhatsAppButton;