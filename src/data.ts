export const profile = {
  name: 'Efezino Alvin Melchizedek',
  shortName: 'Efezino',
  roles: ['Full-Stack Developer', 'AI Engineer', 'Security Consultant'],
  email: 'melchitobi@gmail.com',
  phone: '0911 817 5497',
  github: 'https://github.com/TobiGrant-byte',
  githubHandle: 'TobiGrant-byte',
  location: 'Nigeria',
  portrait: '/images/portrait.jpg',
  summary:
    'Full-stack JavaScript developer (MERN, Next.js/TypeScript) with hands-on experience integrating AI/LLM APIs into shipped products. Built and presented a live AI chatbot at a Google-sponsored developer event, alongside freelance and academic full-stack projects covering auth, databases, and deployment. Currently expanding into cloud/DevOps (AWS, Docker, CI/CD) and deeper AI-product patterns (RAG, tool use).',
}

export const skillGroups = [
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Go', 'Python', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js (App Router)', 'Tailwind CSS', 'daisyUI', 'CSS Modules', 'Flexbox & Grid', 'CSS Animations'],
  },
  {
    title: 'Backend & Data',
    items: ['Node.js', 'Express', 'MongoDB', 'Supabase', 'Postgres', 'Redis', 'Prisma', 'TypeORM'],
  },
  {
    title: 'AI Engineer',
    items: ['Groq API', 'LLM chat UIs', 'Prompt design', 'Provider fallback', 'RAG (exploring)', 'Tool use (exploring)'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS (S3, RDS, IAM)', 'Docker', 'GitHub Actions CI/CD', 'Vite', 'Render'],
  },
  {
    title: 'Security & Systems',
    items: ['Linux admin', 'TCP/UDP & subnetting', 'Nmap', 'Burp Suite', 'Kali Linux', 'OPNsense', 'Proxmox', 'WireGuard', 'Pi-hole'],
  },
]

export const alsoFamiliar = [
  'NestJS',
  'Socket.io',
  'Zustand',
  'React Native (Expo)',
  'Turborepo',
  'Bun',
  'PowerShell',
  'C/C++',
  'Rust',
  'WordPress',
  'Elementor Pro',
  'Flutter',
  'Canva',
  'Photoshop',
]

export const projects = [
  {
    code: '01',
    title: 'Scholar',
    tag: 'AI Research Chatbot',
    year: '2026',
    context: 'Google-sponsored “Build With AI” Event, FUTES',
    bullets: [
      'Built and live-presented an AI research chatbot using Vite, React 18, and Tailwind CSS v3, integrated with the Groq API for LLM responses.',
      'Diagnosed and resolved an API quota failure mid-event by switching providers on the fly (from Gemini to Groq), keeping the demo running live.',
    ],
    stack: ['Vite', 'React 18', 'Tailwind v3', 'Groq API'],
    image: '/images/scholar.png',
  },
  {
    code: '02',
    title: 'Hive Tech Hub LMS',
    tag: 'Full-Stack LMS',
    year: '2026',
    context: 'Freelance / Institutional Project',
    bullets: [
      'Built a full-stack Learning Management System using Next.js 14 (App Router), Supabase, and TypeScript, serving student, staff, and admin roles with role-based routing.',
      'Resolved N+1 query performance issues, stale authentication context, Supabase RLS policy violations, and storage bucket configuration bugs.',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'RLS'],
    image: '/images/hive-tech-hub.webp',
  },
  {
    code: '03',
    title: 'XQSeat',
    tag: 'Website Rebuild',
    year: '2026',
    context: 'Freelance — Client: Mr. Debola',
    bullets: [
      'Rebuilt a church management system marketing site (xqseat.com) in WordPress/Elementor Pro after pivoting from an initial static HTML/CSS/JS build.',
      'Worked within an existing AWS EC2 / GoDaddy / SFTP pipeline with a staging-live (xqseat.work / xqseat.com) environment split.',
    ],
    stack: ['WordPress', 'Elementor Pro', 'AWS EC2', 'SFTP'],
    image: '/images/xqseat.webp',
  },
  {
    code: '04',
    title: 'sundayokafor.com',
    tag: 'Press & Media Page',
    year: '2026',
    context: 'Freelance',
    bullets: [
      'Built a press/media features page (Next.js, TypeScript, Tailwind CSS) for a civil engineer’s professional portfolio site.',
      'Handled image domain configuration and a full color-theme correction.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/images/sundayokafor.webp',
  },
  {
    code: '05',
    title: 'Elviana Luxe',
    tag: 'E-Commerce Rebuild',
    year: '2026',
    context: 'Freelance Client Project',
    bullets: [
      'Rebuilt a luxury footwear e-commerce site with a Next.js frontend and a NestJS/TypeORM/PostgreSQL (Supabase) backend, using Cloudinary and Zustand.',
      'Resolved Supabase SSL issues and Cloudinary upload errors, and stabilized the build by moving from Next.js 16 to 15.3.3.',
    ],
    stack: ['Next.js 15', 'NestJS', 'TypeORM', 'PostgreSQL', 'Cloudinary'],
    image: '/images/elviana-luxe.webp',
  },
  {
    code: '06',
    title: 'PhantomDB',
    tag: 'Embedded Database Engine',
    year: '2026',
    context: 'Personal Project',
    bullets: [
      'Designed and built a general-purpose embedded database engine from scratch in Go — page storage, B+Tree indexing, write-ahead log crash recovery.',
      'Implemented RWMutex concurrency (race-detector verified), ACID-style transactions, a networked HTTP/JSON server, and PhantomDB Studio admin UI.',
    ],
    stack: ['Go', 'B+Tree', 'WAL', 'HTTP/JSON'],
    image: '/images/phantomdb.webp',
  },
]

export const education = {
  degree: 'B.Sc. Information & Communication Technology (ICT)',
  school: 'Federal University of Technology and Environmental Sciences (FUTES), Iyin-Ekiti',
  coursework: [
    'Linux & LaTeX (COS 126)',
    'Software Development Life Cycle & Python (CSC 124)',
    'CS theory — interpreters vs. compilers, operating systems, algorithms',
    'Networking protocols (TCP/UDP)',
    'Programming Fundamentals — flowcharts, pseudocode, recursion (COS 102)',
    'Data Structures — sorting, file organization (COS 122)',
  ],
}

export const certifications = ['freeCodeCamp — Responsive Web Design Certification']
