/**
 * Base de conhecimento da Luna.
 * TODO DO CONTEÚDO IMPORTANTE DO AGENTE VIVE AQUI — nunca no componente do chat.
 * Fase 3: este arquivo será complementado por RAG/LLM mantendo o mesmo contrato.
 */
export const LUNA_GREETING =
  "Olá! Eu sou a Luna ✨, assistente virtual da Lume. Posso te ajudar a encontrar o tratamento ideal, consultar serviços, valores e horários.";

export const LUNA_SHORTCUTS = [
  { id: "booking", label: "Quero agendar um horário", icon: "calendar" },
  { id: "recommend", label: "Qual tratamento combina comigo?", icon: "sparkles" },
  { id: "services", label: "Conhecer os serviços", icon: "list" },
  { id: "prices", label: "Consultar valores", icon: "tag" },
  { id: "human", label: "Falar com a equipe", icon: "chat" },
] as const;

export const LUNA_FALLBACK =
  "Entendi! 💕 Para te ajudar melhor, posso mostrar nossos serviços, valores ou verificar um horário com a equipe. O que prefere?";

export const LUNA_HUMAN_HANDOFF =
  "Claro! Vou te conectar com nossa equipe humana 💕 — elas respondem rapidinho no WhatsApp e já vão receber o resumo da nossa conversa.";

export const LUNA_BOOKING_ACK =
  "Claro! 💕 Vou verificar os horários disponíveis para você.";

export type QuizAnswer = { label: string; value: string };
export type QuizStep = {
  id: string;
  question: string;
  answers: QuizAnswer[];
};

export const LUNA_QUIZ: QuizStep[] = [
  {
    id: "goal",
    question: "O que você mais quer cuidar hoje? 💆‍♀️",
    answers: [
      { label: "Pele do rosto", value: "rosto" },
      { label: "Corpo e relaxamento", value: "corpo" },
      { label: "Cabelos", value: "cabelos" },
      { label: "Unhas e olhar", value: "detalhes" },
    ],
  },
  {
    id: "moment",
    question: "E qual é o seu momento? ✨",
    answers: [
      { label: "Preciso relaxar urgente", value: "relaxar" },
      { label: "Tenho um evento especial", value: "evento" },
      { label: "Quero uma rotina de cuidado", value: "rotina" },
      { label: "Só quero me mimar", value: "mimo" },
    ],
  },
];

export const LUNA_RECOMMENDATIONS: Record<string, { serviceSlug: string; text: string }> = {
  "rosto:relaxar": {
    serviceSlug: "limpeza-de-pele",
    text: "Para relaxar e renovar a pele, o **Ritual Glow Lume** é perfeito: limpeza profunda + massagem facial. Você sai flutuando! ✨",
  },
  "rosto:evento": {
    serviceSlug: "tratamentos-faciais",
    text: "Para arrasar no evento, recomendo nosso **facial iluminador** — pele viçosa e luminosa em 75 minutos. 💫",
  },
  "rosto:rotina": {
    serviceSlug: "limpeza-de-pele",
    text: "Para uma rotina de cuidado, comece com a **limpeza de pele** mensal — é a base de tudo e mantém o viço o mês todo. 🌸",
  },
  "rosto:mimo": {
    serviceSlug: "tratamentos-faciais",
    text: "Mimo merecido! Que tal o **Ritual Glow Lume**? Facial + massagem + máscara iluminadora. Puro autocuidado. 💕",
  },
  "corpo:relaxar": {
    serviceSlug: "massagens",
    text: "Tensão pede **massagem relaxante com aromaterapia** — 60 minutos de puro alívio. Seu corpo vai agradecer. 🕯️",
  },
  "corpo:evento": {
    serviceSlug: "tratamentos-corporais",
    text: "Para o evento, a **drenagem linfática** desincha e modela com resultado visível já na primeira sessão! 👗",
  },
  "corpo:rotina": {
    serviceSlug: "tratamentos-corporais",
    text: "Para rotina corporal, o protocolo de **drenagem semanal** mantém leveza e bem-estar contínuos. 🌿",
  },
  "corpo:mimo": {
    serviceSlug: "massagens",
    text: "Se mime com a **massagem de pedras quentes** — calor, aroma e relaxamento profundo. ✨",
  },
  "cabelos:relaxar": {
    serviceSlug: "cabelos",
    text: "Um **ritual capilar com massagem no couro cabeludo** relaxa e devolve vida aos fios. 🧖‍♀️",
  },
  "cabelos:evento": {
    serviceSlug: "cabelos",
    text: "Para o evento: **escova + tratamento de brilho espelhado**. Cabelo de capa de revista em 90 minutos! 💇‍♀️",
  },
  "cabelos:rotina": {
    serviceSlug: "cabelos",
    text: "Para rotina, o **cronograma capilar personalizado** (hidratação + nutrição + reconstrução) transforma os fios. 📅",
  },
  "cabelos:mimo": {
    serviceSlug: "cabelos",
    text: "Mimo capilar: **hidratação profunda + finalização**. Saia do salão se sentindo maravilhosa. 💕",
  },
  "detalhes:relaxar": {
    serviceSlug: "manicure-pedicure",
    text: "Manicure + pedicure com **massagem relaxante** nas mãos e pés — cuidado e calma juntos. 💅",
  },
  "detalhes:evento": {
    serviceSlug: "sobrancelhas",
    text: "Para o evento: **design de sobrancelhas + esmaltação**. Olhar marcante e unhas impecáveis! ✨",
  },
  "detalhes:rotina": {
    serviceSlug: "manicure-pedicure",
    text: "Manutenção quinzenal de **unhas + design de sobrancelhas mensal** mantém tudo sempre impecável. 🌸",
  },
  "detalhes:mimo": {
    serviceSlug: "sobrancelhas",
    text: "Se mime com **brow lamination + spa das mãos**. Detalhes que elevam tudo! 💕",
  },
};
