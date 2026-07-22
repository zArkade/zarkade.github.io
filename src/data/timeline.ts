export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  description: string;
}

export const professionalTimeline: Record<string, TimelineEntry[]> = {
  "pt-BR": [
    {
      period: "03/2023 — atual",
      title: "Analista de TI",
      org: "GPCabling and Security Solutions LTDA",
      description: "• Responsavel em suporte técnico, analista de dados e análista de sistemas. Manutenção e desenvolvimento de sistemas e apoio aos colaboradores e funcionamento do escritorio.",
    },
    {
      period: "01/2022 — 03/2023",
      title: "Estagiario de TI",
      org: "Fundação Rotarianos de São Paulo",
      description: "• Suporte a usuários e colaboradores com infraestrutura e rotinas de TI.",
    },
    {
      period: "11/2020 — 09/2021",
      title: "Suporte TI",
      org: "Novax Comercios de produtos Texteis LTDA",
      description: "• Auxilio a colaboradores, manutenção de hardware e suporte em sistemas internos.",
    },
    {
      period: "07/2019 — 11/2020",
      title: "Jovem aprendiz de TI",
      org: "Lucin Comercios de produtos Texteis LTDA",
      description: "• Apoio em rotinas administrativas e atividades relacionadas a TI.",
    },
  ],
  "en-US": [
    {
      period: "03/2023 — present",
      title: "IT Analyst",
      org: "GPCabling and Security Solutions LTDA",
      description: "• Responsible for technical support, data analysis, and systems analysis. Maintenance and development of systems, supporting staff and office operations.",
    },
    {
      period: "01/2022 — 03/2023",
      title: "IT Intern",
      org: "Fundação Rotarianos de São Paulo",
      description: "• Supported users and staff with IT infrastructure and routine tasks.",
    },
    {
      period: "11/2020 — 09/2021",
      title: "IT Support",
      org: "Novax Comercios de produtos Texteis LTDA",
      description: "• Assisted staff, performed hardware maintenance, and supported internal systems.",
    },
    {
      period: "07/2019 — 11/2020",
      title: "IT Apprentice",
      org: "Lucin Comercios de produtos Texteis LTDA",
      description: "• Supported administrative routines and IT-related activities.",
    },
  ],
};

export const educationTimeline: Record<string, TimelineEntry[]> = {
  "pt-BR": [
    {
      period: "07/2019 — 06/2024",
      title: "Engenharia da Computação",
      org: "Universidade São Judas Tadeu - SP",
      description: "Obtive conhecimentos multidisciplinares, combinando hardware e software, visando o desenvolvimento de sistemas computacionais inovadores e eficientes.",
    },
  ],
  "en-US": [
    {
      period: "07/2019 — 06/2024",
      title: "Computer Engineering",
      org: "Universidade São Judas Tadeu - SP",
      description: "Gained multidisciplinary knowledge combining hardware and software, aimed at developing innovative and efficient computer systems.",
    },
  ],
};