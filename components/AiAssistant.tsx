import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { FiSend, FiX, FiCpu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Bom dia. Sou o Concierge Virtual da Academia AMOFARMA. Como posso auxiliá-lo tecnicamente hoje, Digníssimo Profissional?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      // Inicialização correta seguindo as normas da SDK v0.15+
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: 'Você é o Concierge Virtual da Academia AMOFARMA em Angola. Trate os usuários por "Digníssimo Profissional". Seu tom deve ser institucional, polido e de extremo prestígio. Foco em rigor científico, ética farmacêutica angolana e conformidade com a ARMED.',
        },
      });

      // Acesso direto à propriedade .text (não invocar como função)
      const text = response.text || 'Protocolo de comunicação interrompido pelo sistema central.';
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'O sistema de inteligência estratégica encontra-se momentaneamente offline para manutenção de rotina.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white w-[350px] md:w-[450px] h-[600px] rounded-[3.5rem] shadow-[0_30px_100px_rgba(26,26,58,0.25)] border border-slate-100 flex flex-col overflow-hidden"
          >
            <div className="bg-[#1a1a3a] p-10 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e84c5c] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-[#e84c5c] rounded-2xl flex items-center justify-center font-black text-sm shadow-xl">AMF</div>
                <div>
                  <p className="font-black text-[10px] uppercase tracking-[0.4em]">Concierge Virtual</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">Academia AMOFARMA</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors relative z-10"><FiX size={24} /></button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50 student-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#1a1a3a] text-white shadow-xl rounded-tr-none' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 italic rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[9px] text-slate-400 animate-pulse font-black uppercase tracking-[0.6em] ml-2">Auditando Protocolo de Resposta...</div>}
            </div>

            <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-slate-100 flex space-x-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Introduza a sua consulta técnica..."
                className="flex-1 bg-slate-50 border-none px-6 py-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#e84c5c] transition-all font-medium"
              />
              <button disabled={isTyping || !input.trim()} className="bg-[#1a1a3a] hover:bg-[#e84c5c] text-white w-14 h-14 flex items-center justify-center rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50 shrink-0">
                <FiSend size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-[#1a1a3a] text-white w-20 h-20 rounded-[2rem] shadow-premium flex items-center justify-center border-4 border-white relative group"
      >
        <div className="absolute inset-0 bg-[#e84c5c] rounded-[1.8rem] scale-0 group-hover:scale-100 transition-transform opacity-10"></div>
        <FiCpu size={32} className="group-hover:text-[#e84c5c] transition-colors" />
      </motion.button>
    </div>
  );
};

export default AiAssistant;