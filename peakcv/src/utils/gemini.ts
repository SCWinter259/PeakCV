import { GoogleGenAI } from '@google/genai';

const resumeSchema = JSON.stringify({
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
      tools: { type: 'array', items: { type: 'array' } },
      databases: { type: 'array', items: { type: 'string' } },
    },
  },
});

const resumeChangeSchema = JSON.stringify({
  changes: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        old: { type: 'string' },
        new: { type: 'string' },
        reason: { type: 'string', nullable: true },
      },
    },
  },
});

export const createResumeParsePromt = (resumeText: string): string => {
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

If no job description is provided, just simply improve the resume without any specific job context. The expected result is a JSON object with the following schema:

${resumeChangeSchema}

in which "old" is the piece of text that needs to be improved in the original resume content, and "new" is the improved text. The "reason" field is optional and can be used to explain why the change was made. If no reason is provided, it should be null. Do not include any other text in the response.
`;
};

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export const getGeminiResponse = async (promt: string) => {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: promt,
    });
    return res.text;
  } catch (error) {
    console.log(error);
  }
};
