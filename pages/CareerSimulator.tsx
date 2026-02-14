import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Link } from 'react-router-dom';

const CareerSimulator: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const simulatePath = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Como consultor estratégico da Academia AMOFARMA em Angola, forneça um roteiro académico formal para o seguinte objetivo de carreira: ${goal}. Destaque cursos como Farmacovigilância, Gestão Hospitalar e Legislação Farmacêutica Angolana. Use um tom institucional de extremo prestígio, mencionando o rigor da ARMED e a excelência científica da AMOFARMA.`,
      });
      
      const text = response.text || 'Não foi possível estabelecer um roteiro neste momento.';
      setSuggestion(text);
    } catch (error) {
      setSuggestion('Ocorreu uma interrupção no protocolo de simulação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] py-32 px-6 lg:px-12 animate-reveal">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Análise de Trajetória Profissional</span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-tight">Simulador de Carreira <br/> <span className="italic text-slate-400">Estratégica</span></h1>
        </div>

        <div className="bg-white border border-slate-100 p-12 md:p-20 shadow-premium relative overflow-hidden rounded-[3rem]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1a1a3a]"></div>
          {!suggestion ? (
            <div className="space-y-12">
              <div className="space-y-6">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Objetivo Profissional</label>
                <textarea 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Ex: Almejo a Direção Técnica de uma unidade hospitalar central em Luanda..."
                  className="w-full bg-slate-50 border-none p-8 text-xl font-light italic focus:ring-2 focus:ring-[#e84c5c] outline-none transition-all h-60 resize-none rounded-2xl"
                />
              </div>
              <button 
                onClick={simulatePath}
                disabled={loading || !goal}
                className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-8 rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl transition-all disabled:opacity-50"
              >
                {loading ? 'Consultando Conselho Académico...' : 'Gerar Roteiro de Especialização'}
              </button>
            </div>
          ) : (
            <div className="animate-reveal space-y-12">
              <div className="bg-slate-50/50 p-12 border border-slate-100 rounded-3xl">
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-8 pb-4 border-b border-slate-200">Proposta de Itinerário Académico</h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-[2] whitespace-pre-line font-light italic text-lg">
                  {suggestion}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-8">
                <button onClick={() => setSuggestion(null)} className="flex-1 bg-white border border-slate-200 text-slate-400 py-6 font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#e84c5c] transition-all rounded-xl">Nova Simulação</button>
                <Link to="/cursos" className="flex-1 bg-[#1a1a3a] text-white py-6 font-black text-[10px] uppercase tracking-[0.3em] text-center hover:bg-[#e84c5c] transition-all shadow-xl rounded-xl">Explorar Programas</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerSimulator;