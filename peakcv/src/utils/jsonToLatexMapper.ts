import {
  Education,
  Experience,
  FormattedResumeJSON,
  Intro,
  Project,
  Skills,
} from '@/interfaces/FormattedResumeJSON';

const formatDefinition = `
\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}

\\usepackage{helvet}
\\renewcommand{\\familydefault}{\\sfdefault}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\classesList}[4]{
    \\item\\small{
        {#1 #2 #3 #4 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & \\textbf{\\small #2} \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

`;

// basically this function escapes special characters
const latexSafe = (text: string) => {
  return text.replace(/%/g, '\\%').replace(/#/g, '\\#');
};

const createHeadingSection = (intro: Intro): string => {
  return `
%----------HEADING----------

\\begin{center}
    {\\Huge \\scshape ${latexSafe(intro.name)}} \\\\ \\vspace{1pt}
    ${latexSafe(intro.location)} \\\\ \\vspace{1pt}
    \\small \\raisebox{-0.1\\height}\\faPhone\\ ${latexSafe(intro.phone)} ~ \\href{mailto:${latexSafe(intro.email)}}{\\raisebox{-0.2\\height}\\faEnvelope\\  \\underline{${latexSafe(intro.email)}}} ~ 
    \\href{}{\\raisebox{-0.2\\height}\\faLinkedin\\ \\underline{LinkedIn}} ~
    \\href{}{\\raisebox{-0.2\\height}\\faGithub\\ \\underline{GitHub}} ~
    \\vspace{-5pt}
\\end{center}

`;
};

const createEducationSection = (educations: Education[]): string => {
  return `
%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    ${educations.map(
      (education) => `
    \\resumeSubheading
      {${latexSafe(education.school)}}{${education.startDate} - ${education.endDate}}
      {${latexSafe(education.degree)}. GPA: ${latexSafe(String(education.gpa))}}{${latexSafe(education.location)}}
    `,
    ).join('')}
  \\resumeSubHeadingListEnd
\\vspace{-5pt}

`;
};

const createExperienceSection = (experiences: Experience[]): string => {
  return `
%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
    ${experiences
      .map(
        (experience) => `
    \\resumeSubheading
      {${latexSafe(experience.company)}}{${experience.startDate} - ${experience.endDate || 'Present'}}
      {${latexSafe(experience.position)}}{${latexSafe(experience.location)}}
      \\resumeItemListStart
        ${experience.achievements
          .map((achievement) => `
        \\resumeItem{${latexSafe(achievement)}}
        `)
          .join('')}
      \\resumeItemListEnd
    `,
      )
      .join('')}
  \\resumeSubHeadingListEnd
\\vspace{-10pt}

`;
};

const technologyListMaker = (technologies: string[]): string => {
  let result = '';
  for (const technology of technologies) {
    result += latexSafe(technology) + ', ';
  }
  return result.slice(0, -2); // Remove the last comma and space
};

const createProjectsSection = (projects: Project[]): string => {
  return `
%-----------PROJECTS-----------
\\section{Projects}
    \\vspace{-5pt}
    \\resumeSubHeadingListStart
    ${projects
      .map(
        (project) => `
        \\resumeProjectHeading
            {\\textbf{${project.name}} $|$ 
            \\emph{${technologyListMaker(project.technologies)}} $|$
            \\href{}{\\faGithub}
            \\href{}{\\faGlobe}
            \\href{}{\\faYoutube}
            }{${project.startDate} - ${project.endDate}}
            \\resumeItemListStart
              ${project.achievements
                .map(
                  (achievement) => `
              \\resumeItem{${latexSafe(achievement)}}
                `,
                )
                .join('')}
          \\resumeItemListEnd 
          \\vspace{-13pt}
    `,
      )
      .join('')}
    \\resumeSubHeadingListEnd
  \\vspace{-5pt}
`;
};

const createSkillsSection = (skills: Skills) => {
  return `
%-----------PROGRAMMING SKILLS-----------
\\vspace{5pt}
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages:}{ ${technologyListMaker(skills.languages)} } \\\\
     \\textbf{Frameworks \\& Libraries:}{ ${technologyListMaker(skills.frameworksAndLibraries)} } \\\\
     \\textbf{Databases:}{ ${technologyListMaker(skills.databases)} } \\\\
     \\textbf{Tools \\& Services:}{ ${technologyListMaker(skills.tools)} } \\\\
    }}
    
 \\end{itemize}
 \\vspace{-10pt}

\\end{document}
`;
};

export const jsonToLatexMapper = (resume: FormattedResumeJSON): string => {
  return `
${formatDefinition}
${createHeadingSection(resume.intro)}
${createEducationSection(resume.education)}
${createExperienceSection(resume.experience)}
${createProjectsSection(resume.projects)}
${createSkillsSection(resume.skills)}    
`.trim();
};
