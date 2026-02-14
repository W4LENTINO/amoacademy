import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { FiSend, FiX, FiCpu } from 'react-icons/fi';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Bom dia. Sou o Concierge Virtual da Academia AMOFARMA. Como posso auxiliá-lo hoje, Digníssimo Profissional?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: 'Você é o Concierge Académico Oficial da Academia AMOFARMA em Angola. Trate os usuários por "Digníssimo Profissional". Foco em rigor científico e regulação ARMED.',
        }
      });

      const text = response.text || 'Ocorreu uma falha no protocolo.';
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Offline. Tente mais tarde.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150]">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[450px] h-[600px] rounded-[3rem] shadow-premium border border-slate-100 flex flex-col overflow-hidden animate-reveal">
          <div className="bg-[#1a1a3a] p-8 text-white flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#e84c5c] rounded-xl flex items-center justify-center font-black">AMF</div>
              <p className="font-black text-xs uppercase tracking-widest">Concierge Virtual</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-2xl hover:text-[#e84c5c]"><FiX /></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50 student-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm ${
                  m.role === 'user' ? 'bg-[#1a1a3a] text-white' : 'bg-white text-slate-800 shadow-sm italic'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100 flex space-x-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sua consulta técnica..."
              className="flex-1 border-b-2 border-slate-100 py-3 text-sm outline-none focus:border-[#e84c5c]"
            />
            <button disabled={isTyping} className="bg-[#1a1a3a] hover:bg-[#e84c5c] text-white w-12 h-12 flex items-center justify-center rounded-2xl transition-all">
              <FiSend />
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-[#1a1a3a] text-white w-16 h-16 rounded-full shadow-premium flex items-center justify-center hover:scale-110 transition-all border-4 border-white">
           <FiCpu size={24} />
        </button>
      )}
    </div>
  );
};

export default AiAssistant;