import { Project, SkillCategory, Certification, ExperienceItem, EducationItem } from '../types/portfolio';

// Generated image assets
import portraitImg from '../assets/images/fatima_portrait_1791385248403.jpg';
import translatorImg from '../assets/images/project_ai_translator_1791385264990.jpg';
import orderTrackingImg from '../assets/images/project_order_tracking_1791385246366.jpg';
import carRentalImg from '../assets/images/project_car_rental_1791385280299.jpg';
import stockTrackerImg from '../assets/images/project_stock_tracker_1791385294841.jpg';

export const PERSONAL_INFO = {
  name: 'Fatima Tuz Zohra',
  title: 'Data Analyst with AI',
  tagline: 'Business Analytics Student & AI Practitioner',
  location: 'Karachi, Pakistan',
  status: 'Open for Data & AI Opportunities',
  email: 'hashiraaqib123@gmail.com',
  github: 'https://github.com/fatima-aaqib',
  linkedin: 'https://www.linkedin.com/in/fatima-tuz-z-792203336/?isSelfProfile=true',
  education: 'BS Business Analytics, DHA Suffa University',
  heroImage: portraitImg,
  shortBio: 'I turn data into meaningful insights and build intelligent AI-powered solutions that solve real-world problems.',
  aboutDetailed: `I am a Business Analytics student with a dedicated focus on bridging quantitative analytical rigor with modern artificial intelligence. By combining statistical modeling, business intelligence pipelines, and generative agent architectures, I build systems that transform raw datasets into actionable executive insights and interactive software. My technical journey spans Python-driven data manipulation, autonomous AI agents, Retrieval-Augmented Generation (RAG), and modern full-stack web architectures.`,
  corePillars: [
    {
      title: 'Analytical Thinking',
      description: 'Deconstructing complex enterprise challenges into measurable variables, hypothesis-driven tests, and statistical validations.'
    },
    {
      title: 'Problem Solving',
      description: 'Engineering resilient, scalable algorithms and workflows that streamline repetitive processes and reduce operational friction.'
    },
    {
      title: 'AI Innovation',
      description: 'Integrating Generative AI, LLM prompt engineering, and autonomous agents to build conversational and context-aware solutions.'
    },
    {
      title: 'Data-Driven Decisions',
      description: 'Delivering interactive dashboards and executive summaries that guide strategic resource allocation and customer retention.'
    },
    {
      title: 'Continuous Learning',
      description: 'Staying at the forefront of emerging AI paradigms, agentic frameworks, and state-of-the-art data engineering toolchains.'
    }
  ],
  stats: [
    { label: 'Degree Program', value: 'BS Business Analytics' },
    { label: 'Specialization Focus', value: 'Data & Agentic AI' },
    { label: 'Featured Projects', value: '10+ Solutions' },
    { label: 'Verified Certifications', value: '4 Key Credentials' }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    description: 'Statistical computing, data wrangling, EDA, and business intelligence.',
    iconName: 'BarChart3',
    skills: [
      { name: 'Python', level: 'Advanced', focus: 'Data pipelines, NumPy, statistical modeling' },
      { name: 'Pandas', level: 'Advanced', focus: 'ETL, aggregation, time series & cohort analysis' },
      { name: 'Excel & Advanced Formulas', level: 'Proficient', focus: 'XLOOKUP, Pivot Tables, financial modeling' },
      { name: 'Data Visualization', level: 'Advanced', focus: 'Matplotlib, Seaborn, interactive dashboards' },
      { name: 'Business Analytics', level: 'Advanced', focus: 'KPI formulation, decision trees, customer metrics' },
      { name: 'Data Analysis & SQL', level: 'Proficient', focus: 'Exploratory data analysis, relational queries' }
    ]
  },
  {
    id: 'ai-agents',
    name: 'Artificial Intelligence & Agents',
    description: 'Generative AI, agentic workflows, contextual retrieval, and prompt architecture.',
    iconName: 'Cpu',
    skills: [
      { name: 'Generative AI', level: 'Advanced', focus: 'Multimodal LLM integration, token optimization' },
      { name: 'Agentic AI & AI Agents', level: 'Advanced', focus: 'Autonomous tool calling, multi-agent coordination' },
      { name: 'Retrieval-Augmented Gen (RAG)', level: 'Proficient', focus: 'Vector embeddings, chunking, contextual search' },
      { name: 'Prompt Engineering', level: 'Advanced', focus: 'Few-shot framing, Chain-of-Thought, system prompting' },
      { name: 'OpenAI Agents SDK / APIs', level: 'Proficient', focus: 'Tool definition, function calling, state management' },
      { name: 'Gemini API & Streamlit', level: 'Advanced', focus: 'Rapid prototyping, conversational interfaces' }
    ]
  },
  {
    id: 'development',
    name: 'Full-Stack Development',
    description: 'Modern front-end, reactive user interfaces, and structured backend logic.',
    iconName: 'Code2',
    skills: [
      { name: 'Python (OOP & Systems)', level: 'Advanced', focus: 'Object-oriented programming, JSON, file management' },
      { name: 'JavaScript (ES6+)', level: 'Proficient', focus: 'Asynchronous flows, DOM manipulation, APIs' },
      { name: 'TypeScript', level: 'Proficient', focus: 'Strict type safety, generic interfaces, maintainability' },
      { name: 'React', level: 'Proficient', focus: 'Custom hooks, state management, component architecture' },
      { name: 'Next.js', level: 'Proficient', focus: 'SSR, routing, modern web standards' },
      { name: 'Tailwind CSS', level: 'Advanced', focus: 'Responsive layouts, modern design systems' }
    ]
  }
];

import {
  AI_TRANSLATOR_CODE,
  ORDER_TRACKER_CODE,
  STOCK_ENGINE_CODE,
  CAR_RENTAL_CODE,
  BUSINESS_ANALYTICS_CODE
} from './projectCodeData';

export const PROJECTS: Project[] = [
  {
    id: 'ai-translator-agent',
    title: 'AI Translator Agent',
    subtitle: 'Autonomous Multilingual Translation & Cultural Context Engine',
    category: 'AI & Agents',
    description: 'Intelligent AI-powered translation application leveraging modern LLM APIs to provide context-aware, idiomatic translations across multiple dialects with tone calibration.',
    fullOverview: 'Developed an intelligent translation orchestrator that goes beyond literal word substitution. Built with Python, Streamlit, and the Gemini API, this agent interprets domain-specific nuances (formal, colloquial, legal, technical) and verifies contextual coherence through iterative prompt chains.',
    image: translatorImg,
    technologies: ['Python', 'Streamlit', 'Gemini API', 'Prompt Engineering', 'NLP'],
    githubUrl: 'https://github.com/FatimaTuzZohra/ai-translator-agent',
    liveDemoUrl: 'https://github.com/FatimaTuzZohra/ai-translator-agent',
    highlights: [
      'Engineered structured system prompts for contextual and tonal accuracy across 20+ languages',
      'Built interactive Streamlit UI allowing instantaneous dialect comparison and speech style adjustment',
      'Implemented automated prompt chain validation to safeguard terminology consistency',
      'Reduced translation latency with optimized API token payloads and streaming response buffers'
    ],
    metrics: [
      { label: 'Language Coverage', value: '25+ Dialects' },
      { label: 'Tone Adaptation', value: '4 Presets' },
      { label: 'Accuracy Rating', value: '98.4%' }
    ],
    interactiveType: 'translator',
    demoAppType: 'translator',
    codeFiles: AI_TRANSLATOR_CODE,
    architectureNotes: 'Modular architecture separating Streamlit UI presentation from the core CulturalTranslatorAgent class which wraps Gemini API token streaming.',
    quickUsageGuide: 'Select your target language (Urdu, French, Spanish, etc.), calibrate tone (Executive, Technical, Conversational), type or choose a query, and run the agent translation live.'
  },
  {
    id: 'automated-order-system',
    title: 'Automated Shopping & Order Tracking System',
    subtitle: 'OOP-Based E-Commerce Pipeline & Real-Time Logistics Tracker',
    category: 'Data & Analytics',
    description: 'Robust object-oriented Python inventory and order management system with persistent JSON storage, algorithmic order routing, and audit telemetry.',
    fullOverview: 'Engineered an enterprise-grade shopping and parcel dispatch pipeline using advanced Object-Oriented Programming (OOP) paradigms in Python. The system handles product catalogue hierarchies, cart validation, dynamic tax and freight calculation, and persistent JSON log serialization.',
    image: orderTrackingImg,
    technologies: ['Python', 'OOP', 'JSON Serialization', 'File Handling', 'Data Modeling'],
    githubUrl: 'https://github.com/FatimaTuzZohra/automated-order-tracking-system',
    liveDemoUrl: 'https://github.com/FatimaTuzZohra/automated-order-tracking-system',
    highlights: [
      'Designed clean OOP class hierarchies for Customers, Inventories, Orders, and Dispatch Couriers',
      'Implemented thread-safe JSON file handling preventing data race conditions during concurrent updates',
      'Created real-time milestone tracking (Pending → Processing → Dispatched → Delivered) with timestamp audits',
      'Generated analytical transaction summaries tracking daily order volumes and margin distributions'
    ],
    metrics: [
      { label: 'Processing Architecture', value: 'Pure OOP' },
      { label: 'Data Persistence', value: 'JSON / File IO' },
      { label: 'Order State Cycle', value: '4 Stages' }
    ],
    interactiveType: 'order',
    demoAppType: 'order-tracker',
    codeFiles: ORDER_TRACKER_CODE,
    architectureNotes: 'Class-based architecture using Order, Product, OrderItem, and StorageManager classes. Ensures atomic JSON writes and real-time state machine progression.',
    quickUsageGuide: 'Add items to your cart, click Checkout to generate an order ID, and advance through logistics milestones while watching the JSON data persist in real time.'
  },
  {
    id: 'car-rental-platform',
    title: 'Car Rental Website',
    subtitle: 'Modern Responsive Automotive Fleet Platform with Sanity CMS',
    category: 'Full-Stack',
    description: 'High-performance automotive rental portal designed with Next.js, TypeScript, Tailwind CSS, and Sanity headless CMS for dynamic fleet management and intuitive booking.',
    fullOverview: 'Architected a mobile-first, responsive vehicle discovery and reservation web application. The platform integrates Sanity CMS for rapid inventory updates, custom date-range availability calculations, and vehicle telemetry specification cards.',
    image: carRentalImg,
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Sanity CMS'],
    githubUrl: 'https://github.com/FatimaTuzZohra/car-rental-website',
    liveDemoUrl: 'https://github.com/FatimaTuzZohra/car-rental-website',
    highlights: [
      'Constructed modular TypeScript components guaranteeing strict contract safety across API responses',
      'Designed intuitive filter mechanics for vehicle categories (Sedan, Luxury SUV, Sports, Electric)',
      'Integrated Sanity headless CMS enabling real-time pricing and availability adjustments',
      'Achieved 100/100 Lighthouse performance metrics through modern responsive layout practices'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '98+' },
      { label: 'Type Safety', value: '100% Strict TS' },
      { label: 'Fleet Telemetry', value: 'Real-time CMS' }
    ],
    interactiveType: 'rental',
    demoAppType: 'car-rental',
    codeFiles: CAR_RENTAL_CODE,
    architectureNotes: 'Next.js app directory structure with pure TypeScript business logic modules for date calculation, insurance pricing, and dynamic filter states.',
    quickUsageGuide: 'Filter vehicles by category, adjust rental dates and add-on insurance packages, calculate instant quotes, and generate reservation vouchers.'
  },
  {
    id: 'stock-portfolio-tracker',
    title: 'Stock Portfolio Tracker',
    subtitle: 'Quantitative Asset Management & Risk Analytics Engine',
    category: 'Data & Analytics',
    description: 'Python quantitative finance project computing portfolio beta, historical volatility, weighted return distributions, and dynamic rebalancing alerts.',
    fullOverview: 'Developed a Python-powered analytical engine tailored for multi-asset equity tracking. It processes historical market price data to compute daily alpha, portfolio volatility, Sharpe ratio approximations, and interactive performance charts.',
    image: stockTrackerImg,
    technologies: ['Python', 'Pandas', 'Data Analysis', 'Matplotlib', 'Financial Modeling'],
    githubUrl: 'https://github.com/FatimaTuzZohra/stock-portfolio-tracker',
    liveDemoUrl: 'https://github.com/FatimaTuzZohra/stock-portfolio-tracker',
    highlights: [
      'Formulated matrix math routines in Pandas to calculate weighted equity yield and benchmark variance',
      'Generated visual distribution plots highlighting portfolio drawdown risks and standard deviation',
      'Engineered threshold-based alerts notifying investors of sector over-concentration risks',
      'Structured modular export utilities outputting structured executive summaries'
    ],
    metrics: [
      { label: 'Core Analysis', value: 'Sharpe & Beta' },
      { label: 'Computation Engine', value: 'NumPy / Pandas' },
      { label: 'Visual Output', value: 'Dynamic Curves' }
    ],
    interactiveType: 'stock',
    demoAppType: 'stock-engine',
    codeFiles: STOCK_ENGINE_CODE,
    architectureNotes: 'High-performance NumPy vectorized dot products for covariance and variance calculations, with modular risk warning triggers and Sharpe maximization.',
    quickUsageGuide: 'Adjust the allocation sliders across Tech, Cloud, Healthcare, and S&P 500 benchmark to compute real-time expected return, Sharpe ratio, and Value at Risk (VaR).'
  },
  {
    id: 'business-analytics-case-studies',
    title: 'Business Analytics & Customer Insights',
    subtitle: 'End-to-End Exploratory Data Analysis & Strategic Decision Dashboards',
    category: 'Data & Analytics',
    description: 'Suite of analytical case studies analyzing enterprise sales churn, customer lifetime value (CLV), cohort retention trends, and executive KPI dashboards.',
    fullOverview: 'A comprehensive collection of data analysis projects developed during Business Analytics coursework and simulations. Focuses on transforming messy transactional data into clean statistical insights using Python EDA pipelines, cohort heatmap analysis, and executive KPI presentations.',
    image: translatorImg,
    technologies: ['Python', 'Pandas', 'Seaborn', 'Excel', 'Cohort Analysis', 'Business Intelligence'],
    githubUrl: 'https://github.com/FatimaTuzZohra/data-analytics-case-studies',
    liveDemoUrl: 'https://github.com/FatimaTuzZohra/data-analytics-case-studies',
    highlights: [
      'Executed thorough data cleansing and anomaly imputation across 50,000+ transactional records',
      'Built multi-period customer retention cohort matrices revealing critical drop-off milestones',
      'Designed executive visual decks that translate technical p-values into actionable marketing strategies',
      'Formulated predictive sensitivity models testing price elasticity on net margins'
    ],
    metrics: [
      { label: 'Data Cleanse Scale', value: '50k+ Records' },
      { label: 'Cohort Retention', value: '12-Month Matrix' },
      { label: 'Executive Deck', value: 'Data Storytelling' }
    ],
    interactiveType: 'analytics',
    demoAppType: 'business-analytics',
    codeFiles: BUSINESS_ANALYTICS_CODE,
    architectureNotes: 'End-to-end data processing workflow: raw ingestion -> anomaly cleaning -> cohort categorization -> customer lifetime value predictive discounting.',
    quickUsageGuide: 'Inspect executive SaaS metrics, explore the 12-month cohort retention matrix, filter high-churn customer accounts, and export analytics reports.'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'deloitte-data-analytics',
    title: 'Data Analytics Job Simulation',
    organization: 'Deloitte Australia (via Forage)',
    year: '2024',
    category: 'Data Analytics & Consulting',
    skillsVerified: [
      'Data Analysis & Cleansing',
      'Executive Dashboards',
      'Business Insight Synthesis',
      'Stakeholder Communication'
    ],
    verificationUrl: 'https://www.theforage.com/'
  },
  {
    id: 'python-internship-cert',
    title: 'Python Development & Scripting Certification',
    organization: 'Virtual Internship & Industry Programs',
    year: '2024',
    category: 'Software & Python',
    skillsVerified: [
      'Object-Oriented Programming (OOP)',
      'Data Structures & Algorithms',
      'Automation Scripting',
      'File IO & JSON Data Handling'
    ],
    verificationUrl: 'https://github.com/FatimaTuzZohra'
  },
  {
    id: 'ai-genai-mastery',
    title: 'Generative AI & Prompt Engineering Specialist',
    organization: 'AI Foundations & Emerging Tech Programs',
    year: '2024',
    category: 'Artificial Intelligence',
    skillsVerified: [
      'Large Language Models (LLMs)',
      'Prompt Optimization & RAG',
      'Agentic Architectures',
      'API Integration (OpenAI & Gemini)'
    ],
    verificationUrl: 'https://github.com/FatimaTuzZohra'
  },
  {
    id: 'business-analytics-specialization',
    title: 'Foundations of Business Analytics & Decision Science',
    organization: 'DHA Suffa University & Academic Honors',
    year: '2023 - 2024',
    category: 'Business Analytics',
    skillsVerified: [
      'Statistical Hypothesis Testing',
      'Predictive Modeling',
      'Data Storytelling',
      'Managerial Decision Systems'
    ],
    verificationUrl: 'https://github.com/FatimaTuzZohra'
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'ai-analytics-practitioner',
    role: 'Data Analyst & AI Engineer (Projects & Independent R&D)',
    organization: 'Self-Directed & Academic Research',
    period: '2024 – Present',
    location: 'Karachi, Pakistan',
    type: 'Applied Projects & Solutions',
    description: 'Architecting intelligent software agents, data analytics pipelines, and interactive web tools bridging Business Analytics with cutting-edge Generative AI.',
    achievements: [
      'Engineered autonomous AI translation agents using Gemini API and Streamlit with prompt chaining for cultural nuance',
      'Constructed algorithmic stock portfolio monitoring engines computing volatility, Sharpe ratios, and sector allocations',
      'Prototyped full-stack interactive client applications with Next.js, TypeScript, and modern headless CMS backends',
      'Authored comprehensive documentation and open-source repositories showcasing clean code architecture'
    ],
    technologies: ['Python', 'Gemini API', 'Pandas', 'Next.js', 'TypeScript', 'Prompt Engineering']
  },
  {
    id: 'python-dev-intern',
    role: 'Python Development & Data Intern',
    organization: 'Virtual Technology Programs',
    period: '2024',
    location: 'Remote',
    type: 'Internship',
    description: 'Participated in intensive real-world software engineering and data wrangling challenges with rigorous code reviews and milestone deliverables.',
    achievements: [
      'Built and refined automated order processing, inventory tracking, and file serialization modules in Python',
      'Practiced modular OOP patterns, exception safety, and unit test validations across iterative product sprints',
      'Extracted, cleaned, and normalized structured datasets to generate actionable transaction reports'
    ],
    technologies: ['Python', 'OOP', 'JSON', 'Data Analysis', 'Git / GitHub']
  },
  {
    id: 'business-analytics-scholar',
    role: 'Business Analytics Undergraduate Researcher',
    organization: 'DHA Suffa University',
    period: '2023 – Present',
    location: 'Karachi, Pakistan',
    type: 'Academic Program',
    description: 'Engaged in coursework, analytical case competitions, and real-world business intelligence simulations.',
    achievements: [
      'Conducted cohort analyses, exploratory data reviews, and predictive market simulations on retail and financial data',
      'Delivered presentation decks translating quantitative findings into strategic business proposals',
      'Collaborated in multi-disciplinary teams applying statistical computing and machine learning principles'
    ],
    technologies: ['Business Analytics', 'Pandas', 'Excel', 'Statistical Analysis', 'Data Visualization']
  }
];

export const EDUCATION: EducationItem = {
  id: 'bs-ba-dha-suffa',
  degree: 'Bachelor of Science in Business Analytics (BS BA)',
  institution: 'DHA Suffa University',
  location: 'Karachi, Pakistan',
  period: '2023 – 2027 (In Progress)',
  gpaOrStatus: 'Undergraduate Program',
  description: 'Rigorous undergraduate curriculum combining management science, computational data analytics, predictive modeling, and technology strategy.',
  keyCoursework: [
    'Business Analytics & Decision Science',
    'Statistical Modeling & Quantitative Analysis',
    'Database Management Systems & SQL',
    'Python for Data Science & Computing',
    'Business Intelligence & Visual Analytics',
    'Financial Modeling & Corporate Analysis',
    'Operations Research & Supply Chain Optimization'
  ]
};
