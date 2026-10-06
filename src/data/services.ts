export type Service = {
  slug: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  priceFrom: number; // em centavos
  durationMin: number;
  image: string;
  featured?: boolean;
};

export const WHATSAPP_NUMBER = "5511999999999";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Quero agendar um horário na Lume Estética ✨"
)}`;

export const services: Service[] = [
  {
    slug: "limpeza-de-pele",
    category: "Facial",
    name: "Limpeza de pele",
    tagline: "Pele saudável e radiante",
    description:
      "Protocolo completo com extração suave, hidratação profunda e máscara calmante para uma pele luminosa desde a primeira sessão.",
    priceFrom: 14900,
    durationMin: 60,
    image:
      "https://images.pexels.com/photos/5659018/pexels-photo-5659018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    featured: true,
  },
  {
    slug: "tratamentos-faciais",
    category: "Facial",
    name: "Tratamentos faciais",
    tagline: "Rejuvenescimento e luminosidade",
    description:
      "Peelings, revitalização e protocolos anti-idade com ativos de alta performance para cada tipo de pele.",
    priceFrom: 18900,
    durationMin: 75,
    image:
      "https://images.pexels.com/photos/32078961/pexels-photo-32078961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    slug: "depilacao",
    category: "Corporal",
    name: "Depilação",
    tagline: "Conforto e praticidade",
    description:
      "Depilação com cera premium e técnicas suaves que minimizam o desconforto e cuidam da pele.",
    priceFrom: 5900,
    durationMin: 30,
    image:
      "https://images.pexels.com/photos/16032305/pexels-photo-16032305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    slug: "cabelos",
    category: "Cabelos",
    name: "Cabelos",
    tagline: "Corte, coloração e tratamentos",
    description:
      "Corte personalizado, coloração, mechas e cronogramas de reconstrução para fios saudáveis e cheios de movimento.",
    priceFrom: 8900,
    durationMin: 90,
    image:
      "https://images.pexels.com/photos/38651017/pexels-photo-38651017.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    featured: true,
  },
  {
    slug: "manicure-pedicure",
    category: "Unhas",
    name: "Manicure e pedicure",
    tagline: "Beleza em cada detalhe",
    description:
      "Cutilagem delicada, esmaltação impecável, blindagem e nail art com acabamento de alto padrão.",
    priceFrom: 6500,
    durationMin: 60,
    image:
      "https://images.pexels.com/photos/4677846/pexels-photo-4677846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    slug: "sobrancelhas",
    category: "Olhar",
    name: "Sobrancelhas",
    tagline: "Design e definição do olhar",
    description:
      "Design personalizado, brow lamination e tintura para sobrancelhas que emolduram o seu olhar.",
    priceFrom: 5500,
    durationMin: 45,
    image:
      "https://images.pexels.com/photos/6135615/pexels-photo-6135615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    slug: "tratamentos-corporais",
    category: "Corporal",
    name: "Tratamentos corporais",
    tagline: "Mais bem-estar para o seu dia a dia",
    description:
      "Drenagem linfática, modeladora e protocolos de gordura localizada com tecnologia de ponta.",
    priceFrom: 17900,
    durationMin: 60,
    image:
      "https://images.pexels.com/photos/6628701/pexels-photo-6628701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    featured: true,
  },
  {
    slug: "massagens",
    category: "Bem-estar",
    name: "Massagens",
    tagline: "Relaxamento profundo",
    description:
      "Massagem relaxante, pedras quentes e aromaterapia para aliviar tensões e recarregar as energias.",
    priceFrom: 15900,
    durationMin: 60,
    image:
      "https://images.pexels.com/photos/37719647/pexels-photo-37719647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export type Spotlight = {
  slug: string;
  name: string;
  description: string;
  price: number;
  durationMin: number;
  tag?: string;
  image: string;
};

export const spotlights: Spotlight[] = [
  {
    slug: "ritual-glow-lume",
    name: "Ritual Glow Lume",
    description: "Limpeza de pele profunda + massagem facial relaxante + máscara iluminadora.",
    price: 29900,
    durationMin: 90,
    tag: "Best-seller",
    image:
      "https://images.pexels.com/photos/3985312/pexels-photo-3985312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    slug: "silk-nutrition",
    name: "Alisamento & Nutrição Silk",
    description: "Alinhamento dos fios com reposição de massa e brilho espelhado.",
    price: 24900,
    durationMin: 120,
    image:
      "https://images.pexels.com/photos/7440131/pexels-photo-7440131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    slug: "spa-day-lume",
    name: "Spa Day Lume Completo",
    description: "Facial + corporal + massagem + manicure. Um dia inteiro só seu.",
    price: 49900,
    durationMin: 240,
    tag: "Experiência",
    image:
      "https://images.pexels.com/photos/9775324/pexels-photo-9775324.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  },
  {
    slug: "brow-design",
    name: "Design + Brow Lamination",
    description: "Sobrancelhas alinhadas, volumosas e com efeito penteado duradouro.",
    price: 11900,
    durationMin: 45,
    image:
      "https://images.pexels.com/photos/8558244/pexels-photo-8558244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export const galleryImages = [
  {
    src: "https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Interior sofisticado do salão Lume",
  },
  {
    src: "https://images.pexels.com/photos/5659049/pexels-photo-5659049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Tratamento facial em ambiente sereno",
  },
  {
    src: "https://images.pexels.com/photos/35844834/pexels-photo-35844834.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Salão Lume à noite com iluminação acolhedora",
  },
  {
    src: "https://images.pexels.com/photos/34997574/pexels-photo-34997574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Detalhe de manicure francesa elegante",
  },
  {
    src: "https://images.pexels.com/photos/6706851/pexels-photo-6706851.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Cliente radiante após ritual de skincare",
  },
  {
    src: "https://images.pexels.com/photos/13068380/pexels-photo-13068380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Espaço de atendimento moderno e confortável",
  },
];
