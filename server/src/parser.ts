import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const resumePath = path.join(__dirname, 'resume.txt');

async function main() {
  const content = fs.readFileSync(resumePath, 'utf-8');
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    config: {
      systemInstruction:
        'You are a helpful assistant that extracts structured information from resume text and returns a clean JSON object. The texts are in English, but some sentences may be missing whitespaces (e.g., "UniversityofCalifornia" instead of "University of California"). You should handle such cases gracefully.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                school: { type: Type.STRING },
                degree: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                location: { type: Type.STRING },
                gpa: { type: Type.STRING, nullable: true },
              },
            },
          },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                position: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING, nullable: true },
                location: { type: Type.STRING },
                technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING, nullable: true },
                achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
          skills: {
            type: Type.OBJECT,
            properties: {
              languages: { type: Type.ARRAY, items: { type: Type.STRING } },
              frameworksAndLibraries: { type: Type.ARRAY, items: { type: Type.STRING } },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              databases: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      },
    },
    contents: `Parse the following resume text and extract structured information in JSON format: ${content}`,
  });
  console.log(response.text);
}

main();

export const parseResume = async (content: Buffer) => {
  try {
    return content.toString('utf-8');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// https://huggingface.co/docs/transformers.js/tutorials/react
