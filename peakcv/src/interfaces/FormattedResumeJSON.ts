interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa: string | null;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  location: string;
  technologies: string[];
  achievements: string[];
}

interface Project {
  name: string;
  technologies: string[];
  startDate: string;
  endDate: string | null;
  achievements: string[];
}

interface Skills {
  languages: string[];
  frameworksAndLibraries: string[];
  tools: string[];
  databases: string[];
}

export interface FormattedResumeJSON {
    education: Education[];
    experience: Experience[];
    projects: Project[];
    skills: Skills;
}