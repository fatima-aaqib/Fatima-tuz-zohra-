export type ThemeMode = 'dark' | 'light';

export interface ProjectCodeFile {
  name: string;
  language: 'python' | 'typescript' | 'json' | 'yaml' | 'markdown' | 'sql';
  content: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Agents' | 'Data & Analytics' | 'Full-Stack';
  description: string;
  fullOverview: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  interactiveType?: 'translator' | 'stock' | 'order' | 'analytics' | 'rental';
  demoAppType?: 'translator' | 'order-tracker' | 'stock-engine' | 'car-rental' | 'business-analytics';
  codeFiles?: ProjectCodeFile[];
  architectureNotes?: string;
  quickUsageGuide?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: string;
    focus: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
  credentialId?: string;
  skillsVerified: string[];
  verificationUrl?: string;
  category: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpaOrStatus: string;
  description: string;
  keyCoursework: string[];
}
