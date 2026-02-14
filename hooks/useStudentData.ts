import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useStudentData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cursosInscritos, setCursosInscritos] = useState<any[]>([]);
  const [certificados, setCertificados] = useState<any[]>([]);
  const [pagamentos, setPagamentos] = useState<any[]>([]);
  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0);
  const [estatisticas, setEstatisticas] = useState({
    cursosInscritos: 0,
    cursosConcluidos: 0,
    cursosNovos: 0,
    certificados: 0,
    certificadosNovos: 0,
    totalPago: 0,
    mediaProgresso: 0
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Simulação de carregamento de dados (Mocks)
      const cursosMock = [
        {
          id: '1',
          titulo: 'Farmacovigilância Avançada',
          progresso: 75,
          data_inicio: '2025-01-10',
          data_fim: '2025-03-15',
          carga_horaria: 40,
          imagem: 'https://images.unsplash.com/photo-1576086213369-97a306dca1c5'
        },
        {
          id: '2',
          titulo: 'Gestão de Farmácia Hospitalar',
          progresso: 45,
          data_inicio: '2025-02-05',
          data_fim: '2025-04-20',
          carga_horaria: 30,
          imagem: 'https://images.unsplash.com/photo-1585435557343-3b092031a831'
        },
        {
          id: '3',
          titulo: 'Legislação Farmacêutica Angolana',
          progresso: 100,
          data_inicio: '2025-01-15',
          data_fim: '2025-02-28',
          carga_horaria: 20,
          imagem: 'https://images.unsplash.com/photo-1589210339056-eb3065438682'
        }
      ];
      setCursosInscritos(cursosMock);

      const certificadosMock = [
        {
          id: '1',
          curso_nome: 'Legislação Farmacêutica Angolana',
          data_emissao: '2025-02-28',
          codigo_verificacao: 'AMF-2025-02-042',
          status: 'valido',
          nome_completo: user?.email || 'Aluno',
          data_conclusao: '2025-02-28',
          carga_horaria: 20
        }
      ];
      setCertificados(certificadosMock);

      const pagamentosMock = [
        {
          id: '1',
          valor: 25000,
          metodo: 'multicaixa',
          estado: 'concluido',
          data_pagamento: '2025-01-10',
          created_at: '2025-01-10',
          curso_nome: 'Farmacovigilância Avançada'
        },
        {
          id: '2',
          valor: 15000,
          metodo: 'express',
          estado: 'concluido',
          data_pagamento: '2025-02-05',
          created_at: '2025-02-05',
          curso_nome: 'Gestão de Farmácia Hospitalar'
        }
      ];
      setPagamentos(pagamentosMock);

      const notificacoesMock = [
        {
          id: '1',
          tipo: 'certificado',
          titulo: 'Novo Certificado Disponível',
          mensagem: 'Seu certificado de Legislação Farmacêutica já está disponível.',
          lida: false,
          created_at: new Date().toISOString(),
          acao_link: '/area-do-aluno/certificados/1',
          acao_texto: 'Ver Certificado'
        }
      ];
      setNotificacoes(notificacoesMock);
      setNotificacoesNaoLidas(notificacoesMock.filter(n => !n.lida).length);

      const totalProgresso = cursosMock.reduce((acc, c) => acc + c.progresso, 0);
      const totalPago = pagamentosMock
        .filter(p => p.estado === 'concluido')
        .reduce((acc, p) => acc + p.valor, 0);

      setEstatisticas({
        cursosInscritos: cursosMock.length,
        cursosConcluidos: cursosMock.filter(c => c.progresso >= 100).length,
        cursosNovos: 1,
        certificados: certificadosMock.length,
        certificadosNovos: 0,
        totalPago,
        mediaProgresso: Math.round(totalProgresso / cursosMock.length)
      });

    } catch (error) {
      console.error('Erro ao carregar dados do aluno:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => loadData();
  const refreshNotifications = () => setNotificacoesNaoLidas(prev => Math.max(0, prev - 1));

  return {
    loading,
    cursosInscritos,
    certificados,
    pagamentos,
    notificacoes,
    notificacoesNaoLidas,
    estatisticas,
    refreshData,
    refreshNotifications
  };
};