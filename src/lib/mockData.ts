/**
 * mockData.ts
 * Fonte única de verdade para os dados mockados do Dashboard.
 * Importar este arquivo nos componentes que precisam dos dados:
 *   - MapBackground (pins no mapa)
 *   - ScheduleSidebar (timeline de paradas)
 */

export type StopStatus = "Completed" | "In Progress" | "Pending";

export interface Stop {
  id: number;
  title: string;
  address: string;
  time: string;
  distance: string;
  status: StopStatus;
  /** Coordenadas [longitude, latitude] para o pin no Mapbox */
  coords: [number, number];
}

export const SCHEDULE: Stop[] = [
  {
    id: 1,
    title: "Johnson Residence",
    address: "4821 Manor Rd, Austin, TX",
    time: "8:00 – 9:30 AM",
    distance: "5.1 mi",
    status: "Completed",
    coords: [-97.71, 30.28],
  },
  {
    id: 2,
    title: "Barton Hills HOA",
    address: "2200 Barton Hills Dr, Austin, TX",
    time: "10:00 – 11:45 AM",
    distance: "3.4 mi",
    status: "Completed",
    coords: [-97.75, 30.25],
  },
  {
    id: 3,
    title: "Martinez Property",
    address: "1108 Westover Rd, Austin, TX",
    time: "12:30 – 1:30 PM",
    distance: "2.8 mi",
    status: "In Progress",
    coords: [-97.74, 30.26],
  },
  {
    id: 4,
    title: "Greenfield Academy",
    address: "6201 Loyola Ln, Austin, TX",
    time: "2:15 – 4:00 PM",
    distance: "7.2 mi",
    status: "Pending",
    coords: [-97.78, 30.22],
  },
  {
    id: 5,
    title: "Reeves Ranch",
    address: "9550 Research Blvd, Austin, TX",
    time: "4:30 – 5:45 PM",
    distance: "4.9 mi",
    status: "Pending",
    coords: [-97.73, 30.27],
  },
  {
    id: 6,
    title: "Westlake Heights",
    address: "3501 Bee Cave Rd, West Lake Hills, TX",
    time: "6:00 – 7:15 PM",
    distance: "9.1 mi",
    status: "Pending",
    coords: [-97.70, 30.30],
  },
];

/** Cores visuais por status — usadas nos pins do mapa e na timeline */
export const STATUS_STYLES = {
  Completed: {
    pin: "bg-white border-slate-400 text-slate-700",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    circleRing: "ring-emerald-500/30 bg-emerald-500 text-white",
    dot: "bg-emerald-500",
  },
  "In Progress": {
    pin: "bg-lime-400 border-lime-600 text-black",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    circleRing: "ring-amber-500/30 bg-amber-500 text-white",
    dot: "bg-amber-500",
  },
  Pending: {
    pin: "bg-white border-slate-300 text-slate-400",
    badge: "bg-muted text-muted-foreground",
    circleRing: "ring-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground/40",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DADOS POLÍTICOS — Mato Grosso
// Sprint 14: Ranking de Eleitorados por Município
// ─────────────────────────────────────────────────────────────────────────────

export type MunicipioStatus = "contabilizado" | "em andamento" | "não iniciado";

export interface MunicipioMT {
  id: number;
  name: string;
  status: MunicipioStatus;
  /** Eleitorado total estimado */
  voters: string;
  /** Latitude (WGS-84) */
  lat: number;
  /** Longitude (WGS-84) */
  lng: number;
  /** Nome do responsável político local */
  responsavel: string;
  /** Número de voluntários ativos */
  voluntarios: number;
  /** Objetivo estratégico da região */
  objetivo: string;
  /** Principais pontos de atenção (temas críticos) */
  pontosAtencao: string;
  /** Local de apoio / base operacional */
  pontoApoio: string;
}

export const rankingMT: MunicipioMT[] = [
  {
    id: 1, name: "Cuiabá", status: "contabilizado", voters: "415.000",
    lat: -15.6014, lng: -56.0978,
    responsavel: "João Silva",
    voluntarios: 350,
    objetivo: "Consolidação de lideranças na região central e mapeamento de influenciadores de bairro.",
    pontosAtencao: "Trânsito, Saneamento",
    pontoApoio: "Sede Central - Av. CPA",
  },
  {
    id: 2, name: "Várzea Grande", status: "contabilizado", voters: "190.500",
    lat: -15.6539, lng: -56.1486,
    responsavel: "Ana Pereira",
    voluntarios: 182,
    objetivo: "Fortalecimento da base eleitoral nos bairros periféricos e engajamento de lideranças comunitárias.",
    pontosAtencao: "Habitação, Emprego",
    pontoApoio: "Comitê do Bairro Cristo Rei",
  },
  {
    id: 3, name: "Rondonópolis", status: "em andamento", voters: "160.200",
    lat: -16.4708, lng: -54.6356,
    responsavel: "Carlos Mendonça",
    voluntarios: 140,
    objetivo: "Expansão da rede de apoiadores no setor agroindustrial e aproximação com sindicatos locais.",
    pontosAtencao: "Saúde, Infraestrutura Rural",
    pontoApoio: "Escritório Regional - Centro",
  },
  {
    id: 4, name: "Sinop", status: "em andamento", voters: "105.400",
    lat: -11.8608, lng: -55.5036,
    responsavel: "Fernanda Lopes",
    voluntarios: 97,
    objetivo: "Articulação com o setor do agronegócio e identificação de multiplicadores políticos no norte do estado.",
    pontosAtencao: "Saúde, Educação",
    pontoApoio: "Sede Municipal - Sinop Norte",
  },
  {
    id: 5, name: "Tangará da Serra", status: "em andamento", voters: "75.300",
    lat: -14.6189, lng: -57.4812,
    responsavel: "Marcos Assis",
    voluntarios: 83,
    objetivo: "Comunicação direcionada para segurança nos bairros Alta Morada 2 e Asfaltar os principais bairros carentes.",
    pontosAtencao: "Asfaltos, Saúde, Segurança",
    pontoApoio: "Posto 874 - Centro",
  },
  {
    id: 6, name: "Cáceres", status: "não iniciado", voters: "65.100",
    lat: -16.0705, lng: -57.6789,
    responsavel: "Roberto Dias",
    voluntarios: 45,
    objetivo: "Iniciar mapeamento eleitoral e identificar lideranças ribeirinhas e do setor de pesca.",
    pontosAtencao: "Pesca, Turismo, Infraestrutura",
    pontoApoio: "Associação dos Pescadores - Porto",
  },
  {
    id: 7, name: "Sorriso", status: "não iniciado", voters: "62.800",
    lat: -12.5444, lng: -55.7139,
    responsavel: "Patrícia Nunes",
    voluntarios: 38,
    objetivo: "Aproximação com produtores rurais e cooperativas de soja. Levantamento de demandas do setor.",
    pontosAtencao: "Logística, Armazenagem",
    pontoApoio: "Sindicato Rural - Av. das Árvores",
  },
  {
    id: 8, name: "Lucas do Rio Verde", status: "não iniciado", voters: "55.900",
    lat: -13.0647, lng: -55.9097,
    responsavel: "Thiago Ramos",
    voluntarios: 32,
    objetivo: "Construção da rede de lideranças jovens e mobilização em universidades e escolas técnicas.",
    pontosAtencao: "Educação, Oportunidades de Emprego",
    pontoApoio: "Centro Comunitário - Setor C",
  },
  {
    id: 9, name: "Primavera do Leste", status: "não iniciado", voters: "48.200",
    lat: -15.5597, lng: -54.2956,
    responsavel: "Silvia Cardoso",
    voluntarios: 28,
    objetivo: "Levantamento de lideranças no setor agrícola e mapeamento dos distritos rurais.",
    pontosAtencao: "Saúde Rural, Estradas Vicinais",
    pontoApoio: "Escritório de Campo - BR-070",
  },
  {
    id: 10, name: "Barra do Garças", status: "não iniciado", voters: "45.600",
    lat: -15.8906, lng: -52.2630,
    responsavel: "Eduardo Borges",
    voluntarios: 25,
    objetivo: "Engajamento de lideranças do turismo e comércio local. Identificação de apoiadores na região do Araguaia.",
    pontosAtencao: "Turismo, Economia Local",
    pontoApoio: "Câmara de Comércio - Centro",
  },
  {
    id: 11, name: "Alta Floresta", status: "não iniciado", voters: "40.500",
    lat: -9.8761, lng: -56.0851,
    responsavel: "Mariana Souza",
    voluntarios: 22,
    objetivo: "Mapeamento de comunidades rurais e indígenas. Articulação com associações de bairro da periferia.",
    pontosAtencao: "Meio Ambiente, Saúde",
    pontoApoio: "Associação Comunitária - Zona Sul",
  },
  {
    id: 12, name: "Pontes e Lacerda", status: "não iniciado", voters: "38.200",
    lat: -15.2261, lng: -59.3323,
    responsavel: "Leandro Alves",
    voluntarios: 20,
    objetivo: "Construção de base na fronteira com Bolívia. Mobilização de comerciantes e pequenos produtores.",
    pontosAtencao: "Segurança de Fronteira, Comércio",
    pontoApoio: "Posto de Apoio - Entrada da Cidade",
  },
  {
    id: 13, name: "Nova Mutum", status: "não iniciado", voters: "36.400",
    lat: -13.8291, lng: -56.0852,
    responsavel: "Andréa Fonseca",
    voluntarios: 18,
    objetivo: "Identificação de lideranças no agronegócio e articulação com produtores de algodão e soja.",
    pontosAtencao: "Infraestrutura, Logística",
    pontoApoio: "Associação dos Produtores - Av. Principal",
  },
  {
    id: 14, name: "Campo Novo do Parecis", status: "não iniciado", voters: "32.100",
    lat: -13.6756, lng: -57.8883,
    responsavel: "Ricardo Tavares",
    voluntarios: 15,
    objetivo: "Mapeamento eleitoral inicial e formação de rede de lideranças no setor cerealista.",
    pontosAtencao: "Irrigação, Energia Elétrica",
    pontoApoio: "Sindicato Rural - Parecis",
  },
  {
    id: 15, name: "Juína", status: "não iniciado", voters: "30.500",
    lat: -11.3785, lng: -58.7423,
    responsavel: "Bruna Monteiro",
    voluntarios: 14,
    objetivo: "Engajamento de comunidades garimpeiras e articulação com lideranças do noroeste do estado.",
    pontosAtencao: "Mineração, Saúde",
    pontoApoio: "Centro Comunitário - Vila Juína",
  },
  {
    id: 16, name: "Peixoto de Azevedo", status: "não iniciado", voters: "26.800",
    lat: -10.2238, lng: -54.9782,
    responsavel: "Fábio Correia",
    voluntarios: 12,
    objetivo: "Mapeamento de lideranças na região de garimpo e comunidades ribeirinhas do Peixoto.",
    pontosAtencao: "Saúde, Regularização Fundiária",
    pontoApoio: "Associação dos Garimpeiros - Centro",
  },
  {
    id: 17, name: "Guarantã do Norte", status: "não iniciado", voters: "25.900",
    lat: -9.7891, lng: -54.9123,
    responsavel: "Nilton Bastos",
    voluntarios: 11,
    objetivo: "Articulação com lideranças do norte do estado e identificação de apoiadores no setor madeireiro.",
    pontosAtencao: "Desmatamento, Segurança",
    pontoApoio: "Escritório Político - Av. Teles Pires",
  },
  {
    id: 18, name: "Colíder", status: "não iniciado", voters: "24.100",
    lat: -10.8062, lng: -55.4526,
    responsavel: "Célia Rocha",
    voluntarios: 10,
    objetivo: "Construção da rede de apoio em municípios menores do norte e aproximação com associações rurais.",
    pontosAtencao: "Saúde, Estradas",
    pontoApoio: "Posto de Saúde - Referência",
  },
  {
    id: 19, name: "Confresa", status: "não iniciado", voters: "22.700",
    lat: -10.6436, lng: -51.5678,
    responsavel: "Wagner Lima",
    voluntarios: 9,
    objetivo: "Engajamento de populações ribeirinhas e assentamentos. Identificação de lideranças no leste do estado.",
    pontosAtencao: "Educação, Saneamento",
    pontoApoio: "Associação dos Assentados - PA Vale do Araguaia",
  },
  {
    id: 20, name: "Jaciara", status: "não iniciado", voters: "21.000",
    lat: -15.9525, lng: -54.9686,
    responsavel: "Denise Melo",
    voluntarios: 8,
    objetivo: "Levantamento inicial de demandas locais e formação do primeiro núcleo de voluntários no município.",
    pontosAtencao: "Emprego, Saúde",
    pontoApoio: "Comitê Local - Praça Central",
  },
];

/** Estilos visuais por status político — pins no mapa e badges no ranking */
export const STATUS_MT_STYLES: Record<MunicipioStatus, {
  pin:   string;
  badge: string;
  dot:   string;
  label: string;
}> = {
  "contabilizado": {
    pin:   "bg-emerald-500 border-emerald-600 text-white",
    badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    dot:   "bg-emerald-500",
    label: "Contabilizado",
  },
  "em andamento": {
    pin:   "bg-amber-400 border-amber-600 text-black",
    badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    dot:   "bg-amber-400",
    label: "Em andamento",
  },
  "não iniciado": {
    pin:   "bg-slate-600 border-slate-500 text-slate-300",
    badge: "bg-slate-700/50 text-slate-400 border border-slate-600/30",
    dot:   "bg-slate-500",
    label: "Não iniciado",
  },
};
