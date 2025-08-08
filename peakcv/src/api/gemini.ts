import { GoogleGenAI } from '@google/genai';

const resumeSchema = JSON.stringify({
  intro: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      location: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string' },
    },
  },
  education: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        school: { type: 'string' },
        degree: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
        location: { type: 'string' },
        gpa: { type: 'string', nullable: true },
      },
    },
  },
  experience: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        company: { type: 'string' },
        position: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string', nullable: true },
        location: { type: 'string' },
        technologies: { type: 'array', items: { type: 'string' } },
        achievements: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  projects: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        technologies: { type: 'array', items: { type: 'string' } },
        startDate: { type: 'string' },
        endDate: { type: 'string', nullable: true },
        achievements: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  skills: {
    type: 'object',
    properties: {
      languages: { type: 'array', items: { type: 'string' } },
      frameworksAndLibraries: { type: 'array', items: { type: 'string' } },
      tools: { type: 'array', items: { type: 'string' } },
      databases: { type: 'array', items: { type: 'string' } },
    },
  },
});

const resumeChangeSchema = JSON.stringify({
  "old": { type: 'string' },
  "new": { type: 'string' },
  "reason": { type: 'string', nullable: true }
});

export const createResumeParsePrompt = (resumeText: string): string => {
  return `
You are a helpful assistant that extracts structured information from resume text and returns a clean JSON object. The texts are in English, but some sentences may be missing whitespaces (e.g., "UniversityofCalifornia" instead of "University of California"), or having excessive spaces (e.g., "transferring   240 million" instead of "transferring 240 million"). You should handle such cases gracefully. Below is the JSON format:

${resumeSchema}

Below is the resume content:

${resumeText}

Please parse the resume text and extract the structured information in JSON format given above. Only the parsed comment should be returned. Do not repeat the given schema in your response.
`;
};

export const createImproveResumePrompt = (resumeJson: string, jobDescription: string): string => {
  return `
You are a helpful assistant that improves resumes based on job descriptions. Below is the resume content in JSON format:

${resumeJson}

and below is the job description:

${jobDescription}

If no job description is provided, just simply improve the resume without any specific job context. The expected result is the same JSON format as the resume content above, but any string that needs improvements should be replaced with an object of this schema:

${resumeChangeSchema}

In which, the value for "old" is the text from the original resume content that needs improvements, the value for "new" is the suggested change, and "reason" is an explanation of why the change is needed.

If no change is needed, no need to change the original resume content. If no reason is provided, it should be null. Do not include any other text in the response.
`;
};

const getGeminiAI = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set in environment variables');
  }
  return new GoogleGenAI({ apiKey });
};

export const getGeminiResponse = async (prompt: string) => {
  try {
    const ai = getGeminiAI();
    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return res.text;
  } catch (error) {
    console.log(error);
  }
};
