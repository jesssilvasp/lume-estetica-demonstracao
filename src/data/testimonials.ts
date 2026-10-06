export type Testimonial = {
  name: string;
  initials: string;
  treatment: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Camila Rodrigues",
    initials: "CR",
    treatment: "Limpeza de pele",
    text: "Minha pele nunca esteve tão luminosa! O atendimento é impecável do início ao fim — a Luna já tinha me explicado tudo antes mesmo de eu chegar.",
    rating: 5,
  },
  {
    name: "Juliana Mendes",
    initials: "JM",
    treatment: "Ritual Glow Lume",
    text: "O Ritual Glow é surreal. Saí de lá me sentindo renovada, com a autoestima lá em cima. O ambiente é lindo e super acolhedor.",
    rating: 5,
  },
  {
    name: "Patrícia Almeida",
    initials: "PA",
    treatment: "Cabelos",
    text: "Finalmente encontrei um lugar que entende meu cabelo. A coloração ficou exatamente como eu imaginava. Virei cliente fiel!",
    rating: 5,
  },
  {
    name: "Fernanda Costa",
    initials: "FC",
    treatment: "Massagem relaxante",
    text: "Uma hora de massagem que valeu por uma semana de férias. Profissionais atenciosas e um cuidado com cada detalhe que eu nunca vi.",
    rating: 5,
  },
  {
    name: "Beatriz Santos",
    initials: "BS",
    treatment: "Design de sobrancelhas",
    text: "Minhas sobrancelhas transformaram meu olhar. O design respeitou meu formato natural e o resultado ficou perfeito.",
    rating: 5,
  },
  {
    name: "Mariana Oliveira",
    initials: "MO",
    treatment: "Spa Day Lume",
    text: "Me dei o Spa Day de presente e foi a melhor decisão do ano. Cada etapa pensada para relaxar. Recomendo de olhos fechados!",
    rating: 5,
  },
];
