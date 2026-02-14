export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    category: 'geral',
    question: 'O que é a AMOFARMA?',
    answer: 'A AMOFARMA é uma Academia de Farmácia de Angola dedicada à formação e capacitação de profissionais farmacêuticos. Oferecemos cursos especializados, certificações e treinamentos para elevar o padrão da prática farmacêutica no país.'
  },
  {
    category: 'geral',
    question: 'A AMOFARMA é reconhecida pela ARMED?',
    answer: 'Sim, a AMOFARMA trabalha em conformidade com as diretrizes da ARMED (Agência Reguladora de Medicamentos) e tem parceria com a Ordem dos Farmacêuticos de Angola, garantindo que todos os nossos cursos atendam aos padrões regulatórios exigidos.'
  },
  {
    category: 'geral',
    question: 'Quem pode se inscrever nos cursos?',
    answer: 'Podem se inscrever profissionais farmacêuticos, técnicos de farmácia, estudantes de ciências farmacêuticas e outros profissionais da área da saúde interessados em aprofundar conhecimentos. Alguns cursos específicos podem ter requisitos prévios.'
  },
  {
    category: 'cursos',
    question: 'Como funcionam os cursos online?',
    answer: 'Nossos cursos online são realizados através da nossa plataforma, com acesso a materiais didáticos, videoaulas, exercícios e fóruns de discussão. As aulas podem ser assistidas no horário mais conveniente para o aluno, dentro do período do curso.'
  },
  {
    category: 'cursos',
    question: 'Os cursos têm material didático incluso?',
    answer: 'Sim, todos os cursos incluem material didático digital (apostilas, apresentações, artigos) disponível na plataforma. Alguns cursos podem oferecer material complementar como e-books e estudos de caso.'
  },
  {
    category: 'cursos',
    question: 'Qual é a carga horária dos cursos?',
    answer: 'A carga horária varia conforme o curso, podendo ser de 20h, 30h, 40h ou mais. Cada curso tem sua carga horária especificada na página de descrição do curso.'
  },
  {
    category: 'inscricoes',
    question: 'Como faço para me inscrever num curso?',
    answer: 'Para se inscrever, basta aceder à página do curso desejado, clicar em "Inscrever-me" e preencher o formulário de inscrição. Após a confirmação do pagamento, receberá um email com todos os detalhes de acesso.'
  },
  {
    category: 'inscricoes',
    question: 'Posso cancelar minha inscrição?',
    answer: 'Sim, é possível cancelar a inscrição. Até 7 dias antes do início do curso, o reembolso é integral. Entre 7 dias e o início do curso, o reembolso é de 50%. Após o início do curso, não há reembolso, mas pode transferir a vaga para outro profissional.'
  },
  {
    category: 'inscricoes',
    question: 'Posso transferir minha inscrição para outra pessoa?',
    answer: 'Sim, é possível transferir a sua inscrição para outro profissional, desde que nos informe com pelo menos 48 horas de antecedência do início do curso, enviando os dados do novo participante.'
  },
  {
    category: 'certificados',
    question: 'Como recebo meu certificado?',
    answer: 'O certificado é emitido digitalmente após a conclusão do curso com aproveitamento. Fica disponível na sua área do aluno para download em PDF e também pode ser validado através do QR Code único.'
  },
  {
    category: 'certificados',
    question: 'Os certificados têm validade legal?',
    answer: 'Sim, nossos certificados são reconhecidos pela AMOFARMA e têm validade para fins de capacitação profissional. Para validação junto à Ordem dos Farmacêuticos, recomenda-se verificar os requisitos específicos.'
  },
  {
    category: 'certificados',
    question: 'Como posso validar um certificado?',
    answer: 'Para validar um certificado, aceda à página de validação no nosso site e insira o código único presente no documento, ou utilize o leitor de QR Code disponível na mesma página. A autenticidade será verificada instantaneamente.'
  },
  {
    category: 'pagamentos',
    question: 'Quais são as formas de pagamento aceites?',
    answer: 'Aceitamos pagamentos via Multicaixa, Express, referência bancária e transferência. Para empresas, também oferecemos a opção de fatura com pagamento a 30 dias.'
  },
  {
    category: 'pagamentos',
    question: 'Posso pagar em prestações?',
    answer: 'Alguns cursos oferecem a opção de pagamento parcelado no Multicaixa. Consulte a página do curso específico para verificar a disponibilidade de parcelamento.'
  },
  {
    category: 'pagamentos',
    question: 'Como obter fatura recibo?',
    answer: 'Após a confirmação do pagamento, a fatura recibo fica disponível na sua área do aluno, na secção de pagamentos. Pode fazer o download sempre que necessário.'
  },
  {
    category: 'tecnico',
    question: 'Esqueci minha senha, o que fazer?',
    answer: 'Na página de login, clique em "Esqueceu a senha?" e siga as instruções. Receberá um email com um link para redefinir a sua senha. O link é válido por 1 hora.'
  },
  {
    category: 'tecnico',
    question: 'Não recebi o email de confirmação',
    answer: 'Verifique a pasta de spam/lixo eletrónico. Se não encontrar, pode solicitar o reenvio na página de login ou contactar o nosso suporte técnico.'
  },
  {
    category: 'tecnico',
    question: 'A plataforma não está a carregar corretamente',
    answer: 'Tente limpar a cache do navegador, usar outro navegador (recomendamos Chrome ou Firefox) ou verificar sua conexão com a internet. Se o problema persistir, contacte-nos.'
  }
];