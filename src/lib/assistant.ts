import { profile, skillGroups, alsoFamiliar, projects, education, certifications } from '../data'

export type AssistantReply = {
  lines: string[]
  chips?: string[]
  cta?: { label: string; url: string }
}

type Intent = {
  id: string
  keywords: string[]
  reply: () => AssistantReply
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const normalize = (raw: string) =>
  raw
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const hasPhrase = (q: string, phrase: string) => {
  const p = normalize(phrase)
  if (!p) return false
  return new RegExp(`(^|[^a-z0-9])${escapeRe(p)}($|[^a-z0-9])`, 'i').test(q)
}

const score = (q: string, keywords: string[]) => {
  let s = 0
  for (const k of keywords) {
    if (hasPhrase(q, k)) {
      s += k.trim().split(/\s+/).length * 4
    }
  }
  return s
}

const flatSkills = skillGroups.flatMap((g) => g.items.map((item) => ({ item, group: g.title })))

const allTech = [...flatSkills.map((t) => t.item.toLowerCase()), ...alsoFamiliar.map((t) => t.toLowerCase())]

const GENERIC_TECH_TOKENS = new Set(['js', 'css', 'html', 'api', 'ai', 'ui', 'sql', 'ci', 'cd', 'and', 'for', 'the', 'with', 'exploring'])

const techTokenMap = new Map<string, string>()
for (const item of allTech) {
  for (const token of normalize(item).split(/\s+/)) {
    if (token.length >= 2 && !GENERIC_TECH_TOKENS.has(token)) {
      const display = item.length > 40 ? `${item.slice(0, 40)}…` : item
      if (!techTokenMap.has(token)) techTokenMap.set(token, display)
    }
  }
}

function introLines(): string[] {
  return [
    `My name is ${profile.name} — a ${profile.roles.join(', ')} based in ${profile.location}.`,
    'I ship full-stack JavaScript products (React, Next.js, Node/Express, MongoDB, Supabase) and wire AI/LLM APIs like Groq into real interfaces — including a live chatbot demo at a Google-sponsored developer event.',
    `Right now I'm going deeper on AWS, Docker, CI/CD, RAG, and agentic tool-use.`,
  ]
}

function skillText(groupTitle: string): string {
  const g = skillGroups.find((s) => s.title === groupTitle)
  if (!g) return ''
  return `${g.title}: ${g.items.map((i) => i.split('(')[0].trim()).join(' · ')}`
}

const intents: Intent[] = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'yo', 'howdy'],
    reply: () => ({
      lines: [
        "Hey! I'm the offline assistant for Efezino's portfolio — no LLM, just his real CV data.",
        'Ask me anything about his skills, projects, education, or how to reach him.',
      ],
      chips: ['What do you do?', 'Which projects have you shipped?', 'How do I contact you?'],
    }),
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'appreciate', 'cool', 'awesome', 'nice'],
    reply: () => ({
      lines: ["You're welcome. Anything else you'd like to know about Efezino?"],
      chips: ['What are his skills?', 'Tell me about PhantomDB', 'Can he be hired?'],
    }),
  },
  {
    id: 'who',
    keywords: [
      'who are you',
      'who',
      'who is efezino',
      'your name',
      'about yourself',
      'about you',
      'introduce',
      'introduction',
      'background',
      'profile',
    ],
    reply: () => ({
      lines: introLines(),
      chips: ['What are his skills?', 'What projects has he built?', 'Where does he study?'],
    }),
  },
  {
    id: 'roles',
    keywords: ['what do you do', 'what does he do', 'job', 'role', 'roles', 'profession', 'career', 'title', 'specialty'],
    reply: () => ({
      lines: [
        `He works as a ${profile.roles.join(', ')}.`,
        skillText('Languages'),
        skillText('Frontend'),
        skillText('Backend & Data'),
        skillText('AI Engineer'),
      ],
      chips: ['Tell me about his AI work', 'What security tools does he use?', 'How do I hire him?'],
    }),
  },
  {
    id: 'summary',
    keywords: ['summary', 'in short', 'one line', 'elevator', 'pitch'],
    reply: () => ({
      lines: [profile.summary],
      chips: ['What are his skills?', 'Which projects has he shipped?'],
    }),
  },
  {
    id: 'skills',
    keywords: ['skills', 'skill', 'stack', 'stacks', 'technologies', 'technology', 'proficient', 'specialties', 'tools', 'tooling'],
    reply: () => ({
      lines: [
        "Here's his skill set:",
        ...skillGroups.map((g) => `• ${g.title}: ${g.items.join(' · ')}`),
        `Also familiar with: ${alsoFamiliar.join(', ')}.`,
      ],
      chips: ['Is he an AI engineer?', 'Cloud & DevOps experience?', 'Security background?'],
    }),
  },
  {
    id: 'frontend',
    keywords: ['frontend', 'front-end', 'react', 'nextjs', 'next.js', 'tailwind', 'daisyui', 'css', 'ui', 'html', 'vite'],
    reply: () => ({
      lines: [
        `Frontend: ${skillGroups[1].items.join(' · ')}.`,
        'He has used these in production: the Scholar chatbot (Vite + React), Hive Tech Hub LMS and sundayokafor.com (Next.js), and Elviana Luxe (Next.js).',
      ],
      chips: ['Which projects are Next.js?', 'What is Scholar?', 'Tell me about Elviana Luxe'],
    }),
  },
  {
    id: 'backend',
    keywords: ['backend', 'back-end', 'node', 'node.js', 'express', 'api', 'database', 'databases', 'mongo', 'mongodb', 'supabase', 'postgres', 'redis', 'sql', 'rest'],
    reply: () => ({
      lines: [
        `Backend & databases: ${skillGroups[2].items.join(' · ')}.`,
        'Highlights: a full MERN notes app, a Supabase/RLS-powered LMS, and PhantomDB — a custom embedded database engine written from scratch in Go with B+Tree indexing and WAL crash recovery.',
      ],
      chips: ['Tell me about PhantomDB', 'Which projects use Supabase?', 'What is his experience with Redis?'],
    }),
  },
  {
    id: 'ai',
    keywords: [
      'ai engineer',
      'ai',
      'llm',
      'groq',
      'llama',
      'chatbot',
      'chat bot',
      'prompt',
      'rag',
      'agent',
      'machine learning',
      'artificial intelligence',
      'openai',
      'gemini',
      'language model',
      'model',
      'genai',
    ],
    reply: () => ({
      lines: [
        `AI engineering: ${skillGroups[3].items.join(' · ')}.`,
        'He built and live-presented "Scholar", an AI research chatbot (Vite + React + Groq API), at a Google-sponsored Build With AI event — and rescued the demo mid-presentation by hot-swapping providers when the API quota died.',
        'He is currently exploring RAG and agentic tool-use patterns.',
      ],
      chips: ['What is Scholar?', 'How did he handle API failures?', 'What is he exploring next?'],
    }),
  },
  {
    id: 'security',
    keywords: [
      'security',
      'security tools',
      'security stack',
      'security tooling',
      'hacking',
      'hacking tools',
      'hack',
      'pentest',
      'penetration',
      'nmap',
      'burp',
      'kali',
      'linux',
      'homelab',
      'home lab',
      'opnsense',
      'proxmox',
      'wireguard',
      'pihole',
      'pi-hole',
      'network',
      'subnet',
      'tcp',
      'udp',
      'firewall',
    ],
    reply: () => ({
      lines: [
        `Security & systems: ${skillGroups[5].items.join(' · ')}.`,
        'He runs a homelab (OPNsense, Proxmox, WireGuard, Pi-hole) as a security playground and is comfortable with Linux administration and networking fundamentals.',
      ],
      chips: ['Is he a security consultant?', 'What tools does he use?', 'Other skills?'],
    }),
  },
  {
    id: 'cloud',
    keywords: ['cloud', 'devops', 'aws', 'docker', 'container', 'ci', 'cd', 'github actions', 'deploy', 'deployment', 's3', 'rds', 'iam', 'render', 'ec2'],
    reply: () => ({
      lines: [
        skillText('Cloud & DevOps'),
        'Hands-on: deployed MERN apps on Render.com, worked inside an AWS EC2/GoDaddy/SFTP pipeline for XQSeat, and ships this very site via GitHub Pages.',
      ],
      chips: ['What has he deployed?', 'Tell me about XQSeat', 'Backend skills?'],
    }),
  },
  {
    id: 'projects_list',
    keywords: ['projects', 'project', 'portfolio', 'work', 'built', 'shipped', 'products', 'what has he done', 'experience', 'achievements', 'showcase'],
    reply: () => ({
      lines: [
        'Selected work:',
        ...projects.map((p) => `• ${p.title} — ${p.tag} (${p.context}).`),
        'Ask me about any of these for the details.',
      ],
      chips: projects.map((p) => `Tell me about ${p.title}`),
    }),
  },
  {
    id: 'project_scholar',
    keywords: ['scholar', 'build with ai', 'google', 'futes event', 'research chatbot', 'groq demo'],
    reply: () => {
      const p = projects[0]
      return {
        lines: [
          `${p.title} — ${p.tag} (${p.context}).`,
          ...p.bullets.map((b) => `• ${b}`),
          `Stack: ${p.stack.join(', ')}.`,
        ],
        chips: ['Tell me about his AI work', 'Which projects has he shipped?', 'How do I contact him?'],
      }
    },
  },
  {
    id: 'project_hive',
    keywords: ['hive', 'lms', 'learning management', 'next.js 14', 'role-based', 'row-level', 'institutional', 'student', 'staff', 'admin roles'],
    reply: () => {
      const p = projects.find((x) => x.code === '02')!
      return {
        lines: [
          `${p.title} — ${p.tag} (${p.context}).`,
          ...p.bullets.map((b) => `• ${b}`),
          `Stack: ${p.stack.join(', ')}.`,
        ],
        chips: ['Which projects use Supabase?', 'What else has he built?', 'Hire him?'],
      }
    },
  },
  {
    id: 'project_xqseat',
    keywords: ['xqseat', 'church', 'wordpress', 'elementor', 'mr debola', 'marketing site', 'ec2', 'godaddy', 'staging'],
    reply: () => {
      const p = projects.find((x) => x.code === '03')!
      return {
        lines: [
          `${p.title} — ${p.tag} (${p.context}).`,
          ...p.bullets.map((b) => `• ${b}`),
          `Stack: ${p.stack.join(', ')}.`,
        ],
        chips: ['Cloud & DevOps experience?', 'Other freelance work?', 'Frontend skills?'],
      }
    },
  },
  {
    id: 'project_sunday',
    keywords: ['sundayokafor', 'sunday okafor', 'press', 'media', 'civil engineer', 'okafor', 'features page'],
    reply: () => {
      const p = projects.find((x) => x.code === '04')!
      return {
        lines: [
          `${p.title} — ${p.tag} (${p.context}).`,
          ...p.bullets.map((b) => `• ${b}`),
          `Stack: ${p.stack.join(', ')}.`,
        ],
        chips: ['Which projects are Next.js?', 'What else has he built?', 'Hire him?'],
      }
    },
  },
  {
    id: 'project_elviana',
    keywords: ['elviana', 'luxe', 'luxury', 'footwear', 'ecommerce', 'e-commerce', 'shoes', 'nestjs', 'cloudinary', 'typeorm'],
    reply: () => {
      const p = projects.find((x) => x.code === '05')!
      return {
        lines: [
          `${p.title} — ${p.tag} (${p.context}).`,
          ...p.bullets.map((b) => `• ${b}`),
          `Stack: ${p.stack.join(', ')}.`,
        ],
        chips: ['What other projects exist?', 'Backend skills?', 'Frontend skills?'],
      }
    },
  },
  {
    id: 'project_phantomdb',
    keywords: ['phantomdb', 'database engine', 'b+tree', 'btree', 'embedded database', 'wal', 'write-ahead', 'go database', 'phantom', 'studio', 'transactions', 'sqlite'],
    reply: () => {
      const p = projects.find((x) => x.code === '06')!
      return {
        lines: [
          `${p.title} — ${p.tag} (${p.context}).`,
          ...p.bullets.map((b) => `• ${b}`),
          `Stack: ${p.stack.join(', ')}.`,
        ],
        chips: ['Does he know Go?', 'Other projects?', 'Backend skills?'],
      }
    },
  },
  {
    id: 'education',
    keywords: ['education', 'degree', 'university', 'study', 'school', 'futes', 'federal university', 'bsc', 'b.sc', 'ict', 'information and communication', 'student', 'coursework', 'course', 'laplace', 'cos', 'grades'],
    reply: () => ({
      lines: [
        `${education.degree} at ${education.school}.`,
        'Relevant coursework:',
        ...education.coursework.map((c) => `• ${c}`),
      ],
      chips: ['What are his certifications?', 'Where is FUTES?', 'What are his skills?'],
    }),
  },
  {
    id: 'certs',
    keywords: ['certification', 'certifications', 'certificate', 'certs', 'certified', 'freecodecamp', 'free code camp', 'responsive web design', 'qualification', 'credentials'],
    reply: () => ({
      lines: ['Certifications:', ...certifications.map((c) => `• ${c}`)],
      chips: ['Where did he study?', 'What are his skills?'],
    }),
  },
  {
    id: 'location',
    keywords: ['nigerian', 'nigeria', 'nationality', 'where are you from', 'where is he from', 'location', 'based', 'country', 'city', 'africa', 'iyin', 'ekiti'],
    reply: () => ({
      lines: [
        `Efezino is based in ${profile.location} (FUTES, Iyin-Ekiti region).`,
        'He works with clients remotely across time zones.',
      ],
      chips: ['How do I contact him?', 'Can he be hired remotely?'],
    }),
  },
  {
    id: 'hire',
    keywords: ['hire', 'hiring', 'freelance', 'available', 'availability', 'work with', 'open to work', 'commission', 'contract', 'job offer', 'collaborate', 'collaboration', 'rates', 'rate'],
    reply: () => ({
      lines: [
        'Yes — he takes on freelance and contract work (full-stack builds, AI/chatbot integration, and security/consulting).',
        'He has delivered client work for Hive Tech Hub, XQSeat, and Elviana Luxe.',
        `Reach him at ${profile.email} or ${profile.phone}.`,
      ],
      chips: ['What kind of projects?', 'How do I contact him?'],
      cta: { label: 'Email him', url: `mailto:${profile.email}` },
    }),
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'email', 'e-mail', 'mail', 'phone', 'telephone', 'number', 'call', 'whatsapp', 'message', 'get in touch', 'touch', 'address'],
    reply: () => ({
      lines: [
        `Email: ${profile.email}`,
        `Phone: ${profile.phone}`,
        `GitHub: github.com/${profile.githubHandle}`,
        `Location: ${profile.location}`,
        'He usually replies within a day.',
      ],
      chips: ['Can he be hired?', 'What has he shipped?'],
      cta: { label: 'Send an email', url: `mailto:${profile.email}` },
    }),
  },
  {
    id: 'github',
    keywords: ['github', 'git', 'repository', 'repo', 'repos', 'open source', 'code', 'profile page', 'tobigrant', 'tobi', 'grant'],
    reply: () => ({
      lines: [
        `GitHub: github.com/${profile.githubHandle} — where he keeps his personal projects (PhantomDB, chat apps, notes apps and more).`,
      ],
      chips: ['Tell me about PhantomDB', 'What projects has he shipped?'],
      cta: { label: 'Open GitHub', url: profile.github },
    }),
  },
  {
    id: 'go',
    keywords: ['golang', 'gopher'],
    reply: () => ({
      lines: [
        'Go is one of his languages. PhantomDB — a custom embedded database engine with B+Tree indexing, WAL crash recovery, and ACID transactions — was built from scratch in Go.',
      ],
      chips: ['Tell me about PhantomDB', 'What languages does he know?'],
    }),
  },
]

export function answer(raw: string): AssistantReply {
  const q = normalize(raw)
  if (!q) {
    return { lines: ['Type a question about Efezino and I will answer from his CV data.'], chips: ['What do you do?', 'Projects?', 'Contact?'] }
  }

  let best: { intent: Intent; s: number } | null = null
  for (const intent of intents) {
    const s = score(q, intent.keywords)
    if (s > 0 && (!best || s > best.s)) {
      best = { intent, s }
    }
  }
  if (best) {
    const reply = best.intent.reply()
    return {
      lines: reply.lines,
      chips: reply.chips,
      cta: reply.cta,
    }
  }

  const matchedTech: string[] = []
  const seen = new Set<string>()
  for (const token of q.split(/\s+/)) {
    const display = techTokenMap.get(token)
    if (display && !seen.has(display)) {
      seen.add(display)
      matchedTech.push(display)
    }
  }
  if (matchedTech.length > 0) {
    const shown = matchedTech.slice(0, 6)
    return {
      lines: [
        `Yes — ${shown.join(', ')} show up in his CV.`,
        'Want more detail on any of these, or on a specific project?',
      ],
      chips: ['What are his skills?', 'Which projects has he shipped?', 'How do I contact him?'],
    }
  }

  return {
    lines: [
      "Hmm, I could not find that in Efezino's CV data — I'm an offline bot, so I only know what is on this page.",
      `For anything else, the fastest route is emailing ${profile.email}.`,
    ],
    chips: ['What are his skills?', 'What projects has he shipped?', 'Where did he study?', 'Hire him?'],
    cta: { label: 'Ask him directly', url: `mailto:${profile.email}` },
  }
}

export const starterQuestions = [
  'What do you do?',
  'Which projects have you shipped?',
  'Is he an AI engineer?',
  'Where did he study?',
  'How do I contact you?',
]
