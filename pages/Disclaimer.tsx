import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Disclaimer: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Aviso Legal | AMOFARMA</title>
        <meta name="description" content="Aviso legal e informações institucionais da AMOFARMA" />
      </Helmet>

      <div className="bg-white min-h-screen py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-[#e84c5c] rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
              AMF
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a3a] mb-4">
              Aviso Legal
            </h1>
            <p className="text-slate-500 text-lg">
              Última atualização: 14 de Fevereiro de 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-12 text-left">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                1. Informação Geral
              </h2>
              <p className="text-slate-600 leading-relaxed">
                A AMOFARMA - Academia de Farmácia de Angola é uma instituição de formação profissional 
                dedicada à capacitação de farmacêuticos e profissionais da área da saúde em Angola.
              </p>
              <p className="text-slate-600 mt-4">
                <strong>Denominação Social:</strong> AMOFARMA, Lda.<br />
                <strong>NIF:</strong> 5412345678<br />
                <strong>Sede:</strong> Av. Pedro Castro Van-Dunem Loy, Luanda, Angola
              </p>
            </section>

            <section className="mb-12 text-left">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                2. Propriedade Intelectual
              </h2>
              <p className="text-slate-600 mb-4">
                Todo o conteúdo disponível na plataforma AMOFARMA, incluindo mas não limitado a:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Textos, artigos e materiais didáticos</li>
                <li>Logótipos, marcas e elementos gráficos</li>
                <li>Vídeos, imagens e áudios</li>
                <li>Software, código e interface da plataforma</li>
                <li>Certificados e documentos oficiais</li>
              </ul>
              <p className="text-slate-600 mt-4">
                é propriedade exclusiva da AMOFARMA ou utilizado sob licença, sendo proibida a reprodução, 
                distribuição ou modificação sem autorização expressa.
              </p>
            </section>

            <section className="mb-12 text-left">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                3. Isenção de Responsabilidade
              </h2>
              <p className="text-slate-600 mb-4">
                A AMOFARMA não se responsabiliza por:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Danos ou prejuízos decorrentes do uso da plataforma</li>
                <li>Interrupções temporárias do serviço por manutenção ou força maior</li>
                <li>Conteúdos de sites externos linkados</li>
                <li>Perda de dados por falhas técnicas além do nosso controlo</li>
                <li>Decisões tomadas com base nas informações disponibilizadas</li>
              </ul>
            </section>

            <section className="mb-12 text-left">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                4. Precisão da Informação
              </h2>
              <p className="text-slate-600 mb-4">
                Embora nos esforcemos por manter a informação atualizada e precisa, a AMOFARMA:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Não garante a exatidão, completude ou atualidade das informações</li>
                <li>Reserva-se o direito de modificar conteúdos sem aviso prévio</li>
                <li>Não se responsabiliza por erros ou omissões</li>
                <li>Recomenda a verificação direta para informações críticas</li>
              </ul>
            </section>

            <section className="mb-12 text-left">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                5. Links Externos
              </h2>
              <p className="text-slate-600 mb-4">
                A plataforma pode conter links para sites de terceiros. A AMOFARMA:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Não controla o conteúdo desses sites</li>
                <li>Não se responsabiliza pelas práticas de privacidade de terceiros</li>
                <li>Não endossa necessariamente o conteúdo externo</li>
                <li>Recomenda a leitura das políticas de cada site visitado</li>
              </ul>
            </section>

            <section className="mb-12 text-left">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                6. Limitação de Responsabilidade
              </h2>
              <p className="text-slate-600 mb-4">
                Em nenhuma circunstância a AMOFARMA será responsável por:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
                <li>Perda de lucros ou oportunidades de negócio</li>
                <li>Danos por interrupção de serviços</li>
                <li>Perda ou corrupção de dados</li>
              </ul>
            </section>

            <section className="mb-12 text-left">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                7. Legislação Aplicável
              </h2>
              <p className="text-slate-600">
                Este aviso legal é regido pelas leis da República de Angola. Qualquer disputa relacionada 
                com o uso da plataforma será submetida à jurisdição exclusiva dos tribunais de Luanda.
              </p>
            </section>

            <section className="mb-12 text-left">
              <h2 className="text-2xl font-bold text-[#1a1a3a] mb-4 pb-2 border-b-2 border-[#e84c5c] inline-block">
                8. Contacto
              </h2>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="text-slate-600 mb-2">
                  <strong>Email:</strong> legal@amofarma.ao
                </p>
                <p className="text-slate-600 mb-2">
                  <strong>Telefone:</strong> +244 943 574 878
                </p>
                <p className="text-slate-600">
                  <strong>Morada:</strong> Av. Pedro Castro Van-Dunem Loy, Luanda, Angola
                </p>
              </div>
            </section>
          </div>

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-slate-200 text-center space-x-6">
            <Link to="/privacidade" className="text-slate-500 hover:text-[#e84c5c] transition-colors">
              Privacidade
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/termos" className="text-slate-500 hover:text-[#e84c5c] transition-colors">
              Termos
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/cookies" className="text-slate-500 hover:text-[#e84c5c] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;