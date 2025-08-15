export interface Intro {
  name: string;
  location: string;
  phone: string;
  email: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string | null;
  location: string;
  gpa: string | null;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  location: string;
  technologies: string[];
  achievements: string[];
}

export interface Project {
  name: string;
  technologies: string[];
  startDate: string;
  endDate: string | null;
  achievements: string[];
}

export interface Skills {
  languages: string[];
  frameworksAndLibraries: string[];
  tools: string[];
  databases: string[];
}

export interface FormattedResumeJSON {
    intro: Intro;
    education: Education[];
    experience: Experience[];
    projects: Project[];
    skills: Skills;
}