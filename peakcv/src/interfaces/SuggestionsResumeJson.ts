export interface Suggestion {
    old: string;
    new: string;
    reason: string | null;
}

export interface SuggestedIntro {
    name: string | Suggestion;
    location: string | Suggestion;
    phone: string | Suggestion;
    email: string | Suggestion;
}

export interface SuggestedEducation {
    school: string | Suggestion;
    degree: string | Suggestion;
    startDate: string | Suggestion;
    endDate: string | Suggestion;
    location: string | Suggestion;
    gpa: string | Suggestion | null;
}

export interface SuggestedExperience {
    company: string | Suggestion;
    position: string | Suggestion;
    startDate: string | Suggestion;
    endDate: string | Suggestion | null;
    location: string | Suggestion;
    technologies: (string | Suggestion)[];
    achievements: (string | Suggestion)[];
}

export interface SuggestedProject {
    name: string | Suggestion;
    technologies: (string | Suggestion)[];
    startDate: string | Suggestion;
    endDate: string | Suggestion | null;
    achievements: (string | Suggestion)[];
}

export interface SuggestedSkills {
    languages: (string | Suggestion)[];
    frameworksAndLibraries: (string | Suggestion)[];
    tools: (string | Suggestion)[];
    databases: (string | Suggestion)[];
}

export interface SuggestionsResumeJson {
    intro: SuggestedIntro;
    education: SuggestedEducation[];
    experience: SuggestedExperience[];
    projects: SuggestedProject[];
    skills: SuggestedSkills;
}